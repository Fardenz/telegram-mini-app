import { createHmac } from "node:crypto";

interface HmacParameters {
  getAsHex: boolean,
  algorithm: string
}

export function generateHMAC(data: string, key: string | Buffer, {
  getAsHex,
  algorithm,
}: HmacParameters = {
    getAsHex: false,
    algorithm: 'sha256'
  }) {
  const hmac = createHmac(algorithm, key);
  hmac.update(data);
  if (getAsHex) {
    return hmac.digest('hex');
  }
  return hmac.digest();
}