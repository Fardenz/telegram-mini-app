import { injectable } from "inversify"
import { Response } from "express"
import { CustomError, CustomExpressRequest } from "../../../types"
import User from "../../../../models/User"
import { GameType, PostGameBody, PostGameResult } from "./types"
import Decimal from "decimal.js"
import { getCoinflipResult, getDiceResult } from "./helpers"
import config from "../../../../config"
import { executeWalletIncrementAndReturnUpdatedUser } from "../../../../helpers"

const GAME_AMOUNT = 100

@injectable()
export default class GameEndpoints {
  constructor() { }

  public async postGame(
    req: CustomExpressRequest<unknown, unknown, PostGameBody>,
    res: Response<PostGameResult>
  ) {
    try {
      let user = await User.findOne({
        telegramId: req.customData.telegramId,
      })
      const gameCost = new Decimal(GAME_AMOUNT).mul(req.body.choice.length)
      const walletAvailable = new Decimal(user?.walletAmountInCents ?? 0)
      if (user === null || walletAvailable.lessThan(gameCost)) {
        throw new CustomError("Not enough balance")
      }

      // charge game amount
      user = await executeWalletIncrementAndReturnUpdatedUser(req.customData.telegramId, gameCost.mul(-1).toNumber())

      if (new Decimal(user?.walletAmountInCents ?? 0).lessThan(0)) {
        await executeWalletIncrementAndReturnUpdatedUser(req.customData.telegramId, gameCost.toNumber())
        throw new CustomError("Not enough balance")
      }

      let result
      if (req.body.type === GameType.DICE) {
        result = await getDiceResult()
      } else if (req.body.type === GameType.COINFLIP) {
        if (req.body.choice.some((choice) => choice !== 1 && choice !== 2)) {
          throw new CustomError("Invalid choice, only '1' or '2' are allowed")
        }
        result = await getCoinflipResult()
      } else {
        throw new CustomError("Unrecognized game type")
      }

      if (req.body.choice.includes(result)) {
        // the user choice is correct
        if (req.body.type === GameType.DICE) {
          await executeWalletIncrementAndReturnUpdatedUser(
            req.customData.telegramId,
            new Decimal(GAME_AMOUNT * 6).mul(new Decimal(1).sub(config.houseEdge)).toNumber()
          )
        } else if (req.body.type === GameType.COINFLIP) {
          await executeWalletIncrementAndReturnUpdatedUser(
            req.customData.telegramId,
            new Decimal(GAME_AMOUNT * 2).mul(new Decimal(1).sub(config.houseEdge)).toNumber()
          )
        }
      }

      res.send({
        result,
      })
    } catch (error) {
      console.error(error)

      try {
        res.status(500).send({
          error: JSON.stringify(error),
        })
      } catch (error) {
        res.status(500).send({
          error: error as string,
        })
      }
    }
  }
}
