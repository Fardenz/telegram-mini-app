import { randomInt } from "crypto";

export function getDiceResult(): Promise<number> {
  return randomIntPromisified(1, 7)
}

export function getCoinflipResult(): Promise<number> {
  return randomIntPromisified(1, 3)
}

export const randomIntPromisified = function (min: number, max: number): Promise<number> {
  return new Promise((resolve, reject) => {
    randomInt(min, max, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};