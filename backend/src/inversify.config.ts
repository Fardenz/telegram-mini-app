import 'reflect-metadata';
import { Container, decorate, injectable } from "inversify";
import config from "./config";
import { Telegraf } from "telegraf";
import WebAppServer from './webserver';
import TelegramBot from './telegramBot';
import mongoose, { Mongoose } from 'mongoose';

export const setupContainer = async () => {
  const container = new Container()
  decorate(injectable, Telegraf);

  const dbConnection = await mongoose.connect(config.dbConnectionString);
  container
    .bind(Mongoose).toConstantValue(dbConnection);

  container
    .bind(Telegraf)
    .toConstantValue(new Telegraf(config.botToken))

  container
    .bind(TelegramBot).toSelf();

  container
    .bind(WebAppServer).toSelf();

  return container
};

