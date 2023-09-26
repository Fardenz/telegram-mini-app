import dotenv from "dotenv"
dotenv.config()

import express, { Express } from "express"
import cors from "cors"
import userRoutes from "./endpoints/user"
import { Telegraf } from "telegraf"
import { message } from 'telegraf/filters'
import config from "./config"


// Create a bot that uses 'polling' to fetch new updates
const bot = new Telegraf(config.botToken)
bot.on(message('text'), async (ctx) => {
  ctx.reply('👍')

  await ctx.setChatMenuButton({
    type: 'web_app',
    text: 'Play!',
    web_app: { url: config.frontendEndpoint }
  });
});
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

const app: Express = express()
const port = config.webServerPort;

app.use(cors())
app.use(express.json())
app.use(userRoutes)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
