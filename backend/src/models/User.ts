import mongoose, { Schema } from "mongoose"

const User = mongoose.model(
  "User",
  new Schema({
    telegramId: String,
    walletAmountInCents: Number,
    withdrawalRequests: [Schema.Types.Mixed],
  })
)
export default User
