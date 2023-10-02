import { Context, NarrowedContext, Telegraf } from "telegraf"
import config from "../config"
import { Update } from "telegraf/typings/core/types/typegram";
import User from "../models/User";
import { SUPPORTED_CURRENCIES } from "../webserver/api/paths/wallet/types";



const setUpPaymentHandles = async (bot: Telegraf) => {
    bot.on('pre_checkout_query', async (ctx) => {
        try {
            const preCheckoutQuery = ctx.update.pre_checkout_query;
            const currency = preCheckoutQuery.currency;

            if (!Object.keys(SUPPORTED_CURRENCIES).find(cur => cur === currency)) return;

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

            const user = await User.create({
                telegramId: user_id,
                walletAmountInCents: amount
            })

            await user.save();
            await ctx.reply('Payment successful!');
        } catch (error) {
            console.error('Error handling successful payment', error);
            await ctx.reply('An error occurred while processing your payment.');
        }
    });


}

export { setUpPaymentHandles }