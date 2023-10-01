import { injectable } from "inversify";
import { Response } from "express"
import { CustomError, CustomExpressRequest } from "../../../types";
import User from "../../../../models/User";
import { GameType, PostGameBody, PostGameResult } from "./types";
import Decimal from "decimal.js";
import { getCoinflipResult, getDiceResult } from "./helpers";
import config from "../../../../config";
import { executeWalletIncrement } from "../../../../helpers";

const GAME_AMOUNT = 100

@injectable()
export default class GameEndpoints {

  constructor() {
  }

  public async postGame(req: CustomExpressRequest<unknown, unknown, PostGameBody>, res: Response<PostGameResult>) {
    try {
      const user = await User.findOne({
        telegramId: req.customData.telegramId
      });

      if (user === null || new Decimal(user?.walletAmountInCents ?? 0).lessThan(GAME_AMOUNT)) {
        throw new CustomError("Not enough balance");
      }

      let result;
      if (req.body.type === GameType.DICE) {
        result = await getDiceResult()
      } else if (req.body.type === GameType.COINFLIP) {
        result = await getCoinflipResult()
      } else {
        throw new Error("Unrecognized game type");
      }

      await executeWalletIncrement(req.customData.telegramId, GAME_AMOUNT * -1)

      if (req.body.choice === result) {
        // the user choice is correct
        if (req.body.type === GameType.DICE) {
          await executeWalletIncrement(req.customData.telegramId, new Decimal(GAME_AMOUNT * 6).mul(new Decimal(1).sub(config.houseEdge)).toNumber())
        } else if (req.body.type === GameType.COINFLIP) {
          await executeWalletIncrement(req.customData.telegramId, new Decimal(GAME_AMOUNT * 2).mul(new Decimal(1).sub(config.houseEdge)).toNumber())
        }
      }

      res.send({
        result
      })
    } catch (error) {
      console.error(error);

      res.status(500).send({
        error: error as string
      })
    }
  }


}
