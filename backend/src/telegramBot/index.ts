import { message } from 'telegraf/filters'
import config from "../config"
import { injectable } from "inversify";
import { Telegraf } from 'telegraf';

@injectable()
export default class TelegramBot {
  constructor(readonly bot: Telegraf) {
    // Create a bot that uses 'polling' to fetch new updates
    bot.on(message('text'), async (ctx) => {
      ctx.reply('👍')


      await ctx.setChatMenuButton({
        type: 'web_app',
        text: 'Open',
        web_app: { url: config.frontendEndpoint }
      });
    });

    bot.launch();

    // Enable graceful stop
    process.once('SIGINT', () => bot.stop('SIGINT'))
    process.once('SIGTERM', () => bot.stop('SIGTERM'))
  }
}