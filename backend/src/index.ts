import dotenv from "dotenv"
dotenv.config()
import 'reflect-metadata';
import { setupContainer } from './inversify.config';
import WebAppServer from "./webserver";
import TelegramBot from "./telegramBot";


async function main() {
  try {
    const container = await setupContainer();
    const bot = container.get(TelegramBot)
    const webAppServer = container.get(WebAppServer)
  } catch (error) {
    console.error("Error during initialization:", error);
  }
}

main()