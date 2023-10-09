export enum SUPPORTED_CURRENCIES {
  EURO = "EUR",
}

export interface GetWalletResponsee {
  telegramId: string
  amountInCents: string
}
export interface PostWithdrawMoneyRequestBody {
  iban: string
  amountInCents: string
}

export interface PostWithdrawMoneyResponse {
  telegramId: string
  amountInCents: string
}

export interface WithdrawalRequest {
  amountInCents: string
  ibam: string
  isCompleted: boolean
}

export interface PaymentLinkResponseBody {
  telegramId: string
  url: string
}
