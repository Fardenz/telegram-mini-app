import express, { Express } from "express"
import dotenv from "dotenv"
import cors from "cors"
import userRoutes from "./endpoints/user"
import TelegramBot from 'node-telegram-bot-api'

// replace the value below with the Telegram token you receive from @BotFather
const token = 'TOKEN'

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true })

bot.on('message', async (msg) => {
  await bot.sendMessage(msg.chat.id, "ale", {
    reply_markup: {
      keyboard: [[]]
    } 
  })
  await bot.setChatMenuButton({
    chat_id: msg.chat.id,
    menu_button: {
      type: 'web_app',
      text: 'Play!',
      web_app: { url: "https://fardenz.github.io/telegram-bot/" }
    }
  })
});


dotenv.config()

const app: Express = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(userRoutes)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
