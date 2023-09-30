import express, { Express } from "express"
import cors from "cors"
import userRoutes from "./endpoints/user"
import config from "../config";
import { Server } from "http";
import { injectable } from "inversify";

import WalletEndpoints from './api/paths/wallet/walletHandlers'
import { initialize } from "express-openapi";
import TelegramAuth from "./telegramAuth";
import GameEndpoints from "./api/paths/game/gameHandlers";
@injectable()
export default class WebAppServer {
  public readonly server: Server;
  constructor(private readonly walletEndpoints: WalletEndpoints, private readonly gameEndpoints: GameEndpoints) {
    const app: Express = express()
    const port = config.webServerPort;

    app.use(cors())
    app.use(express.json())
    app.use(userRoutes)
    app.use(TelegramAuth)


    // OpenAPI routes
    initialize({
      app,
      apiDoc: require("./api/api-doc"),
      exposeApiDocs: true,
      docsPath: '/api-documentation',
      operations: {
        getWallet: this.walletEndpoints.getWallet,
        postGame: this.gameEndpoints.postGame
      }
    });

    // // OpenAPI UI
    // app.use(
    //   "/api-documentation",
    //   SwaggerUi.serve,
    //   SwaggerUi.setup(undefined, {
    //     swaggerOptions: {
    //       url: `http://localhost:${port}/api-documentation`,
    //     },
    //   })
    // );

    this.server = app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
      console.log(`⚡️[server]: Documentation available at http://localhost:${port}/api-documentation`)
    })

    process.once('SIGINT', () => this.server.close())
    process.once('SIGTERM', () => this.server.close())
  }
}
