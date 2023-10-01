import { generateHMAC } from "../../../../helpers";

interface DiceRoll { serverSeed: string, clientSeed: string, nonce: number }

export function rollDice({ serverSeed, clientSeed, nonce }: DiceRoll): number {
  const nonceClientSeed = `${clientSeed}-${nonce}`;

  const hex = generateHMAC(nonceClientSeed, serverSeed);

  let index = 0;

  let lucky = parseInt(hex.substring(index * 5, index * 5 + 5), 16);

  while (lucky >= 1e6) {
    index += 1;
    lucky = parseInt(hex.substring(index * 5, index * 5 + 5), 16);

    // we have reached the end of the hash and they all must have been ffffff
    if (index * 5 + 5 > 129) {
      lucky = 9999;
      break;
    }
  }

  return [lucky % 1e4] * 1e-2;
}