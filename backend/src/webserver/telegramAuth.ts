import { Request, Response, NextFunction } from "express"
import { CustomExpressRequest } from "./types";
import config from "../config";
import { createHmac } from "crypto";

const TelegramAuth = (req: Request, res: Response, next: NextFunction) => {
try {
  const customRequest = req as CustomExpressRequest;
  const authorization = customRequest.headers?.authorization ?? '';
  // helper to decode the parameters easily
  const urlWithAuth = new URL(`http://telegram.com/?${authorization}`)
  const hash = urlWithAuth.searchParams.get('hash');
  urlWithAuth.searchParams.delete('hash')
  const parsedUserData = JSON.parse(urlWithAuth?.searchParams?.get('user') ?? '{}');
  customRequest.customData = {
    telegramId: parsedUserData.id,
    userData: parsedUserData,
    authDate: new Date(urlWithAuth.searchParams.get('auth_date') ?? '0'),
    queryId: urlWithAuth.searchParams.get('query_id') ?? ''
  };
  const authKeys = Array.from(urlWithAuth.searchParams.keys())
  const alphabeticallySortedKeys = authKeys.sort()
  let reconstructedAuthData = ''
  for (const [i, key] of alphabeticallySortedKeys.entries()) {
      reconstructedAuthData += key + '=' + urlWithAuth.searchParams.get(key)
      if (i !== alphabeticallySortedKeys.length - 1 ) {
        reconstructedAuthData  += '\n'
      }
  }

  const secret_key = generateHMAC(config.botToken, "WebAppData")
  const calculatedHash = generateHMAC(reconstructedAuthData, secret_key, true)
  
  if ( calculatedHash !== hash) {
    throw new Error("Auth not valid");
  }

  next()
} catch (error) {
  return res.status(403).send('Auth not valid!');
}
}

function generateHMAC(data: string, key: string | Buffer, getAsHex: boolean = false) {
  const hmac = createHmac('sha256', key);
  hmac.update(data);
  if (getAsHex) {
    return hmac.digest('hex');
  }
  return hmac.digest();
}

export default TelegramAuth;