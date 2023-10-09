import Settings from "../infrastructure/settings"
import SuperFetch, { JSONRecord } from "../infrastructure/superFetch"

export default class Auth {
  static async validateTelegramData(initData: string): Promise<boolean> {
    const endpoint: string = Settings.apiUrl() + "/auth/validateData"
    const body: JSONRecord = {
      initData,
    }
    let result: boolean

    try {
      const response: JSONRecord = await SuperFetch.post(endpoint, body)
      result = Boolean(response.result)
    } catch {
      result = false
    }

    return result
  }
}
