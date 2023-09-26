import { Telegraf } from "telegraf"
import { message } from 'telegraf/filters'
import config from "../config"

export const setupTelegramBot = () => {
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
}