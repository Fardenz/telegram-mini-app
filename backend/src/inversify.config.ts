import "reflect-metadata"
import { Container, decorate, injectable } from "inversify"
import config from "./config"
import { Telegraf } from "telegraf"
import WebAppServer from "./webserver"
import TelegramBot from "./telegramBot"
import mongoose, { Mongoose } from "mongoose"
import WalletEndpoints from "./webserver/api/paths/wallet/walletHandlers"
import GameEndpoints from "./webserver/api/paths/game/gameHandlers"

export const setupContainer = async () => {
  const container = new Container()
  decorate(injectable, Telegraf)

  const dbConnection = await mongoose.connect(config.dbConnectionString)
  container.bind(Mongoose).toConstantValue(dbConnection)

  container.bind(Telegraf).toConstantValue(new Telegraf(config.botToken))

  container.bind(TelegramBot).toSelf()

  container.bind(WebAppServer).toSelf()

  /** Controllers */
  container.bind(WalletEndpoints).toSelf()
  container.bind(GameEndpoints).toSelf()

  return container
}
