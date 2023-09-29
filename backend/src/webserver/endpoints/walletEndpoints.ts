import { injectable } from "inversify";
import { Telegraf } from "telegraf";

@injectable()
export default class WalletEndpoints {

  private bot: Telegraf
  constructor(private readonly b: Telegraf){
    this.bot = b;
  }

  /**
   * handler
   */
  public handler() {
    this.bot.telegram
  }

  public getHandler(req: unknown, res: unknown) {
    console.log(req, res);
    
    // return this.bot.telegram.createInvoiceLink();
  }
}