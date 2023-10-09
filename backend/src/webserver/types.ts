import { Request } from "express"

interface CustomData {
  telegramId: string
  userData: {
    id: number
    first_name: string
    last_name: string
    language_code: string
    allow_write_to_pm: boolean
  }
  authDate: Date
  queryId: string
}

export interface CustomExpressRequest<Params = any, ResBody = any, ReqBody = any>
  extends Request<Params, ResBody, ReqBody> {
  customData: CustomData
}

export interface ErrorResponse {
  error: string
}

export class CustomError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options)
  }

  /** method to stringify error correctly */
  toJSON() {
    return {
      error: this.message,
    }
  }
}
