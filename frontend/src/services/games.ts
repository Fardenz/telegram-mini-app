import Settings from "@infrastructure/settings"

export default class GamesService {
  static async play(choices: number[] | number, type: "dice" | "coinflip"): Promise<number | undefined> {
    try {
      const body: any = {
        choice: choices,
        type: type,
      }
      console.log(Settings.apiUrl())
      const response = await fetch(`${Settings.apiUrl()}/game`, {
        headers: {
          Authorization: window.Telegram.WebApp.initData,
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        method: "POST",
      })

      const res = await response.json()
      console.log(res)
      return res.result as number
    } catch (e) {
      console.error(e)
    }
  }
}
