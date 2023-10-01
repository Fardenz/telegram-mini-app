import { Context, NarrowedContext, Telegraf } from "telegraf"
import config from "../config"
import { Update } from "telegraf/typings/core/types/typegram";



const setUpPaymentHandles = async (bot: Telegraf) => {

    bot.on('pre_checkout_query', async (ctx) => {

        console.log("Accepting payment", ctx.update.pre_checkout_query)
        await ctx.answerPreCheckoutQuery(true)
    });


    bot.on('successful_payment', async (ctx) => {

        /**
         * Add credits to user in the db
         */
        
        console.log("successful_payment", ctx.update.message.successful_payment)
        console.log(`giving ${ctx.update.message.successful_payment.total_amount / 100}€ to the user`)
    });
}


const createPaymentLink = async (bot: Telegraf) => {
    return await bot.telegram.createInvoiceLink({
        currency: 'EUR',
        description: 'test',
        payload: '', // User Name
        prices: [{
            amount: 1 * 100,
            label: 'Credits'
        }],
        provider_token: config.stripeToken,
        title: 'Payment'
    })
}

export { setUpPaymentHandles, createPaymentLink }