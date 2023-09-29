import express, { Express } from "express"
import cors from "cors"
import userRoutes from "./endpoints/user"
import config from "../config";
import { Server } from "http";
import { injectable } from "inversify";

import WalletEndpoints from './endpoints/walletEndpoints'

@injectable()
export default class WebAppServer {
  public readonly server: Server;
  constructor(private readonly WalletEndpoints: WalletEndpoints){
    const app: Express = express()
    const port = config.webServerPort;

    app.use(cors())
    app.use(express.json())
    app.use(userRoutes)

    this.server = app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
    })

    app.get('/wallet', WalletEndpoints.getHandler)
    app.post('/wallet', WalletEndpoints.handler)

    process.once('SIGINT', () => this.server.close())
    process.once('SIGTERM', () => this.server.close())
  }
}
