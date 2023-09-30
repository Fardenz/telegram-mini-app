import { injectable } from "inversify";
import { Response } from "express"
import { CustomExpressRequest } from "../../../types";
import User from "../../../../models/User";
import { GetWalletResponsee as GetWalletResponse } from "./types";

@injectable()
export default class WalletEndpoints {

  constructor() {
  }

  public async getWallet(req: CustomExpressRequest, res: Response<GetWalletResponse>) {
   try {
    const wallet = await User.findOne({
      telegramId: req.customData.telegramId
    });
    res.send({
      telegramId: req.customData.telegramId,
      amount: wallet?.walletAmount ?? '0'
    })
   } catch (error) {
    res.send({
      telegramId: req.customData.telegramId,
      amount: '0'
    })
   }
  }
}