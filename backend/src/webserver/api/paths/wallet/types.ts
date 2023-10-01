export interface GetWalletResponsee {
  telegramId: string,
  amountInCents: string
}
export interface PostWithdrawMoneyRequestBody {
  iban: string;
  amountInCents: string
}

export interface WithdrawalRequest {
  amountInCents: string;
  ibam: string;
  isCompleted: boolean;
}