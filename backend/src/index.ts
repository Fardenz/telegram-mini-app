import dotenv from "dotenv"
dotenv.config()
import 'reflect-metadata';
import { setupContainer } from './inversify.config';
import WebAppServer from "./webserver";
import TelegramBot from "./telegramBot";

const container = setupContainer();

const bot = container.get(TelegramBot)
const webAppServer = container.get(WebAppServer)
