import { injectable } from "inversify";
import { Response } from "express"
import { CustomError, CustomExpressRequest } from "../../../types";
import User from "../../../../models/User";
import { GameType, PostGameBody, PostGameResult } from "./types";
import Decimal from "decimal.js";
import { getCoinflipResult, getDiceResult } from "./helpers";
import config from "../../../../config";

@injectable()
export default class GameEndpoints {

  constructor() {
  }

  public async postGame(req: CustomExpressRequest<unknown, unknown, PostGameBody>, res: Response<PostGameResult>) {
    try {
      const user = await User.findOne({
        telegramId: req.customData.telegramId
      });

      if (user === null || new Decimal(user?.walletAmount ?? 0).lessThan(1)) {
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

      await this.executeWalletIncrement(req.customData.telegramId, -1)

      if (req.body.choice === result) {
        // the user choice is correct
        if (req.body.type === GameType.DICE) {
          await this.executeWalletIncrement(req.customData.telegramId, new Decimal(6).mul(new Decimal(1).sub(config.houseEdge)).toNumber())
        } else if (req.body.type === GameType.COINFLIP) {
          await this.executeWalletIncrement(req.customData.telegramId, new Decimal(2).mul(new Decimal(1).sub(config.houseEdge)).toNumber())
        }
      }

      res.send({
        result
      })
    } catch (error) {
      res.send({
        error: 'Game could not run'
      })
    }
  }

  private executeWalletIncrement(telegramId: string, amount: number): Promise<unknown> {
    return User.findOneAndUpdate({
      telegramId: telegramId
    }, {
      $inc: {
        walletAmount: amount
      }
    }, {
      new: true
    }).exec();}
  
}
