import express, { Express } from "express"
import cors from "cors"
import userRoutes from "./endpoints/user"
import config from "../config";


export const serverStartup = () => {
  const app: Express = express()
  const port = config.webServerPort;

  app.use(cors())
  app.use(express.json())
  app.use(userRoutes)

  const server = app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
  })

  process.once('SIGINT', () => server.close())
  process.once('SIGTERM', () => server.close())

  return server
}

