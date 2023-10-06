import Settings from "../infrastructure/settings"
import { centsToEuros } from "../helpers/centsToEuros"

export default class Wallet {

    private static getAuthToken(): string {
        return window.Telegram.WebApp.initData;
    }

    static async createPaymentLink(opts: {
        amount: number,
    }, callback: () => void): Promise<void> {
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
                    callback();
                } else {
                    console.error(`Payment Faild with: ${status}`)
                }
            })
        } catch (e) {
            console.error(e)
        }
    }

    static async withdrawal(opts: {
        amount: number
        iban: string,
    }, callback: () => void): Promise<void> {
        const { amount, iban } = opts
        if (!amount || !iban) return;

        try {
            const response = await fetch(`${Settings.apiUrl()}/wallet`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: this.getAuthToken(),
                },
                body: JSON.stringify({
                    amountInCents: (amount * 100).toString(),
                    iban
                })
            })
            console.log("withdrawal", response.status);
            if (response.status === 200) {
                callback();
            }

        } catch (e) {
            console.error(e)
        }
    }

    static async getBalance(): Promise<number | undefined> {
        try {
            console.log(Settings.apiUrl())
            const response = await fetch(`${Settings.apiUrl()}/wallet`, {
                headers: {
                    Authorization: this.getAuthToken(),
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
