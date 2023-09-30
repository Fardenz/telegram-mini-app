import { injectable } from "inversify";
import { Response } from "express"
import { CustomError, CustomExpressRequest } from "../../../types";
import User from "../../../../models/User";
import { PostGameResult } from "./types";
import Decimal from "decimal.js";

@injectable()
export default class GameEndpoints {

  constructor() {
  }

  public async postGame(req: CustomExpressRequest, res: Response<PostGameResult>) {
   try {
    const user = await User.findOne({
      telegramId: req.customData.telegramId
    });

    if (user === null || new Decimal(user?.walletAmount ?? 0).lessThan(1)) {
      throw new CustomError("Not enough balance");
    }

    const updatedUser = await User.findOneAndUpdate({
      telegramId: req.customData.telegramId
    }, {
      $inc: {
        walletAmount: - 1
      }
    }, {
      new: true
    }).exec();



    res.send({
      result: 1
    })
   } catch (error) {
    res.send({
      error: 'Game could not run'
    })
   }
  }
}