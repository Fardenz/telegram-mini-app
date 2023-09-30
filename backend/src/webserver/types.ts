import { Request } from "express"

interface CustomData {
  telegramId: string
  userData: {
    id: number,
    first_name: string,
    last_name: string,
    language_code: string,
    allow_write_to_pm: boolean
  },
  authDate: Date,
  queryId: string
}

export interface CustomExpressRequest extends Request {
  customData: CustomData
}