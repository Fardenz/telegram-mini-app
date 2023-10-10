import Settings from "@infrastructure/settings"
import { centsToEuros } from "@helpers/centsToEuros"

export default class Wallet {
  private static getAuthToken(): string {
    return window.Telegram.WebApp.initData
  }

  static async createPaymentLink(
    opts: {
      amount: number
    },
    callback: () => void,
    showToast: (params?: any) => void
  ): Promise<void> {
    const { amount } = opts
    try {
      const params = new URLSearchParams({ amount: amount.toString() }).toString()
      const response = await fetch(`${Settings.apiUrl()}/payment/link?${params}`, {
        headers: {
          Authorization: this.getAuthToken(),
        },
      })

      const body = await response.json()
      window.Telegram.WebApp.openInvoice(body.url, (status) => {
        if (status === "paid") {
          showToast({
            title: "Payment successful!",
            status: "success",
          })
          callback()
        } else {
          showToast({
            title: `Payment failed with status: ${status}`,
            status: "warning",
          })
        }
      })
    } catch (e) {
      showToast({
        title: `Error processing payment.`,
        status: "error",
      })
    }
  }

  static async withdrawal(
    opts: {
      amount: number
      iban: string
    },
    callback: () => void,
    showToast: (params?: any) => void
  ): Promise<void> {
    const { amount, iban } = opts
    if (!amount || !iban) return

    try {
      const response = await fetch(`${Settings.apiUrl()}/wallet`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.getAuthToken(),
        },
        body: JSON.stringify({
          amountInCents: (amount * 100).toString(),
          iban,
        }),
      })
      if (response.status === 200) {
        showToast({
          title: "Withdrawal successful",
          description: "Will be processed in 15 days.",
          status: "success",
        })
        callback()
      }
    } catch (e) {
      showToast({
        title: "Withdrawal Error",
        description: "Error trying to save Withdrawal information",
        status: "error",
      })
      console.error(e)
    }
  }

  static async getBalance(showToast: (params?: any) => void): Promise<number | undefined> {
    try {
      const response = await fetch(`${Settings.apiUrl()}/wallet`, {
        headers: {
          Authorization: this.getAuthToken(),
        },
      })

      const res = await response.json()
      return centsToEuros(res.amountInCents)
    } catch (e) {
      showToast({
        title: "Unable to get balance.",
        status: "error",
      })
      console.error(e)
    }
  }
}
