import { inject, injectable } from "inversify";
import { Response } from "express"
import { CustomError, CustomExpressRequest, ErrorResponse } from "../../../types";
import User from "../../../../models/User";
import { GetWalletResponsee as GetWalletResponse, PaymentLinkResponseBody, PostWithdrawMoneyRequestBody, PostWithdrawMoneyResponse, SUPPORTED_CURRENCIES, WithdrawalRequest } from "./types";
import Decimal from "decimal.js";
import { Telegraf } from "telegraf";
import config from "../../../../config";

const DEFAULT_CURRENCY = SUPPORTED_CURRENCIES.EURO;

@injectable()
export default class WalletEndpoints {
  private readonly _bot: Telegraf

  constructor(@inject(Telegraf) bot: Telegraf) {
    this._bot = bot;
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

  public async postWithdrawMoney(req: CustomExpressRequest<unknown, unknown, PostWithdrawMoneyRequestBody>, res: Response<PostWithdrawMoneyResponse | ErrorResponse>) {
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
      res.status(500).send({
        error: error as string
      })
    }
  }

  public async getPaymentLink(req: CustomExpressRequest<{ amount: number }, unknown, unknown>, res: Response<PaymentLinkResponseBody | ErrorResponse>) {
    if (!req.query.amount) {
      res.status(400).send({ error: "Query param 'amount' required!" });
      return;
    }
    try {
      const url = await this._bot.telegram.createInvoiceLink({
        currency: DEFAULT_CURRENCY,
        description: 'Adding money to account',
        payload: req.customData.telegramId,
        prices: [{
          amount: parseFloat(req.query.amount as string) * 100,
          label: 'Value'
        }],
        provider_token: config.stripeToken,
        title: 'Payment'
      })

      res.send({
        telegramId: req.customData.telegramId,
        url
      })
    } catch (error) {
      console.log("[WalletEndpoints][getPaymentLink] Error: ", error)
      res.status(500).send({
        error: error as string
      })
    }
  }

}