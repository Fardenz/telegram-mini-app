import cleanNonSet from "../helpers/cleanNonSet"

export type JSONRecord = Record<string, unknown>
export default class SuperFetch {
  protected static jwtToken?: string

  static setToken(jwtToken: string): void {
    this.jwtToken = jwtToken
  }

  static async post(baseUrl: string, payload: JSONRecord): Promise<JSONRecord> {
    return await this.call("POST", baseUrl, payload)
  }

  private static async call(
    method: string,
    endpoint: string,
    body?: JSONRecord
  ): Promise<JSONRecord> {
    const response: Response = await fetch(endpoint, this.requestOptions(method, body))
    if (response.status >= 400) throw new Error()
    return await response.json()
  }

  private static requestOptions(method: string, body?: JSONRecord): JSONRecord {
    const options: JSONRecord = {
      method,
      headers: this.headers(),
      body: JSON.stringify(body),
    }
    return cleanNonSet(options)
  }

  private static headers(): Record<string, string> {
    const result: Record<string, string> = {
      "content-type": "application/json;charset=UTF-8",
    }
    if (this.jwtToken) {
      result.Authorization = "Bearer " + this.jwtToken
    }
    return result
  }
}
