import dotenv from "dotenv"
dotenv.config()
import { serverStartup } from './webserver'
import { setupTelegramBot } from "./telegramBot";

serverStartup();
setupTelegramBot();