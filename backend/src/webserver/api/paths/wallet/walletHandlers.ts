import { injectable } from "inversify";
import { Response } from "express"
import { CustomError, CustomExpressRequest, ErrorResponse } from "../../../types";
import User from "../../../../models/User";
import { GetWalletResponsee as GetWalletResponse, PostWithdrawMoneyRequestBody, WithdrawalRequest } from "./types";
import Decimal from "decimal.js";

@injectable()
export default class WalletEndpoints {

  constructor() {
  }

  public async getWallet(req: CustomExpressRequest, res: Response<GetWalletResponse | ErrorResponse>) {
    try {
      const wallet = await User.findOne({
        telegramId: req.customData.telegramId.toString()
      });

      res.send({
        telegramId: req.customData.telegramId,
        amountInCents: wallet?.walletAmountInCents?.toString() ?? '0'
      })
    } catch (error) {
      res.status(500).send({
        error: error as string
      })
    }
  }

  public async postWithdrawMoney(req: CustomExpressRequest<unknown, unknown, PostWithdrawMoneyRequestBody>, res: Response<unknown>) {
    try {
      const user = await User.findOne({
        telegramId: req.customData.telegramId.toString()
      });

      if (user === null || new Decimal(user?.walletAmountInCents ?? 0).lessThan(req.body.amountInCents)) {
        throw new CustomError("Not enough balance");
      }

      user.walletAmountInCents = new Decimal(user?.walletAmountInCents ?? 0).sub(req.body.amountInCents).toNumber();
      user.withdrawalRequests = [...(user?.withdrawalRequests ?? []), {
        amountInCents: req.body.amountInCents,
        iban: req.body.iban,
        isCompleted: false
      }] as WithdrawalRequest[];

      await user.save();

      res.send({
        telegramId: req.customData.telegramId,
        amountInCents: user?.walletAmountInCents?.toString() ?? '0'
      })
    } catch (error) {
      return res.status(500).send(error);
    }
  }
}