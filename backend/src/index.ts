import dotenv from "dotenv"
dotenv.config()
import 'reflect-metadata';
import { setupContainer } from './inversify.config';
import WebAppServer from "./webserver";
import TelegramBot from "./telegramBot";


async function main() {
  const container = await setupContainer();
  
  const bot = container.get(TelegramBot)
  const webAppServer = container.get(WebAppServer)
}

main()