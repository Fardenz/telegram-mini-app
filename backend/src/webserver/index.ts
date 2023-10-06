import express, { Express, Request, Response } from "express"
import cors from "cors"
import userRoutes from "./endpoints/user"
import config from "../config";
import { Server } from "http";
import { injectable } from "inversify";
import WalletEndpoints from './api/paths/wallet/walletHandlers'
import { initialize } from "express-openapi";
import TelegramAuth from "./telegramAuth";
import GameEndpoints from "./api/paths/game/gameHandlers";
import * as OpenApiValidator from 'express-openapi-validator';
import * as SwaggerUi from 'swagger-ui-express';

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

    const apiDocPath = './api-doc';

    // OpenAPI routes
    initialize({
      app,
      apiDoc: require(apiDocPath),
      exposeApiDocs: true,
      docsPath: '/api-documentation',
      operations: {
        getWallet: this.walletEndpoints.getWallet,
        postWithdrawMoney: this.walletEndpoints.postWithdrawMoney,
        postGame: this.gameEndpoints.postGame,
        getPaymentLink: this.walletEndpoints.getPaymentLink
      }
    });
    app.use(
      OpenApiValidator.middleware({
        apiSpec: require(apiDocPath),
        validateRequests: true,
        validateResponses: true,
        ignoreUndocumented: true,
      })
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    app.use((err: any, req: Request, res: Response, _next: unknown) => {
      // format errors
      // console.log(err);

      res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors,
      });
    });

    // OpenAPI UI
    app.use(
      "/api-documentation-ui",
      SwaggerUi.serve,
      SwaggerUi.setup(require(apiDocPath), {})
    );

    this.server = app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
      console.log(`⚡️[server]: Documentation available at http://localhost:${port}/api-documentation-ui`)
    })

    process.once('SIGINT', () => this.server.close())
    process.once('SIGTERM', () => this.server.close())
  }
}
