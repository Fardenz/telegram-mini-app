import { AuthInfo } from "../types/auth"

export default class Stash {
  static AUTH: string = "Auth"

  static saveToken(auth: object): void {
    localStorage.setItem(this.AUTH, JSON.stringify(auth))
  }

  static restoreAuth(): AuthInfo {
    const backup = localStorage.getItem(this.AUTH)!
    const parsed = JSON.parse(backup!)
    return parsed
  }

  static clearAuth(): void {
    localStorage.removeItem(this.AUTH)
  }
}
