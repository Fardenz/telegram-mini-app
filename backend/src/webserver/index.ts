import express, { Express } from "express"
import cors from "cors"
import userRoutes from "./endpoints/user"
import config from "../config";
import { Server } from "http";
import { injectable } from "inversify";

@injectable()
export default class WebAppServer {
  public readonly server: Server;
  constructor(){
    const app: Express = express()
    const port = config.webServerPort;

    app.use(cors())
    app.use(express.json())
    app.use(userRoutes)

    this.server = app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
    })


    process.once('SIGINT', () => this.server.close())
    process.once('SIGTERM', () => this.server.close())
  }
}
