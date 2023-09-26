import 'reflect-metadata';
import { Container, decorate, injectable } from "inversify";
import config from "./config";
import { Telegraf } from "telegraf";
import WebAppServer from './webserver';
import TelegramBot from './telegramBot';

export const setupContainer = () => {
  const container = new Container()
  decorate(injectable, Telegraf);

  container
    .bind(Telegraf)
    .toDynamicValue(
      (container) => new Telegraf(config.botToken)
    )
    .inSingletonScope();

  container
    .bind(TelegramBot).toSelf();

  container
    .bind(WebAppServer).toSelf();

  return container
};

