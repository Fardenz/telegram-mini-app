import { message } from 'telegraf/filters'
import config from "../config"
import { injectable } from "inversify";
import { Telegraf } from 'telegraf';
import { handleSuccessfulPayment } from './paymentHandle';
import { SUPPORTED_CURRENCIES } from "../webserver/api/paths/wallet/types";
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

    bot.on('pre_checkout_query', async (ctx) => {
      try {
        const preCheckoutQuery = ctx.update.pre_checkout_query;
        const currency = preCheckoutQuery.currency;

        if (!Object.values(SUPPORTED_CURRENCIES).find(cur => cur === currency)) {
          await ctx.answerPreCheckoutQuery(false, 'Invalid Currency');
          return;
        };

        await ctx.answerPreCheckoutQuery(true);

      } catch (error) {
        console.error('Error handling pre_checkout_query', error);
        await ctx.answerPreCheckoutQuery(false, 'An error occurred');
      }
    });

    bot.on('successful_payment', async (ctx) => {
      try {
        const user_id = ctx.from.id;
        const amount = ctx.message.successful_payment.total_amount;

        await handleSuccessfulPayment({ amount, user_id });

        await ctx.reply('Payment successful!');
      } catch (error) {
        console.error('Error handling successful payment', error);
        await ctx.reply('An error occurred while processing your payment.');
      }
    });

    bot.launch();

    // Enable graceful stop
    process.once('SIGINT', () => bot.stop('SIGINT'))
    process.once('SIGTERM', () => bot.stop('SIGTERM'))
  }
}