import Settings from "../infrastructure/settings"
import { centsToEuros } from "../helpers/centsToEuros"

export default class Wallet {
  static async createPaymentLink(opts: { amount: number }): Promise<void> {
    const { amount } = opts
    try {
      const params = new URLSearchParams({ amount: amount.toString() }).toString()
      const response = await fetch(`${Settings.apiUrl()}/payment/link?${params}`, {
        headers: {
          Authorization: window.Telegram.WebApp.initData,
        },
      })

      const body = await response.json()
      window.Telegram.WebApp.openInvoice(body.url, (status) => {
        if (status === "paid") {
          console.log("Payment Paid!")
          // update wallet value
          // refresh
        } else {
          console.error(`Payment Faild with: ${status}`)
          // error popup?
        }
      })
    } catch (e) {
      console.error(e)
    }
  }

  static async getBalance(): Promise<number | undefined> {
    try {
      console.log(Settings.apiUrl())
      const response = await fetch(`${Settings.apiUrl()}/wallet`, {
        headers: {
          Authorization: window.Telegram.WebApp.initData,
        },
      })

      const res = await response.json()
      console.log(res)
      return centsToEuros(res.amountInCents)
    } catch (e) {
      console.error(e)
    }
  }
}
