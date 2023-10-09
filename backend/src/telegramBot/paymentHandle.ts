import User from "../models/User"

const handleSuccessfulPayment = async (opts: { user_id: number; amount: number }) => {
  const { amount, user_id } = opts
  try {
    const filter = { telegramId: user_id }
    const update = {
      $setOnInsert: { telegramId: user_id },
      $inc: { walletAmountInCents: amount },
    }
    const options = { upsert: true, new: true, setDefaultsOnInsert: true }

    await User.findOneAndUpdate(filter, update, options)
  } catch (error) {
    const msg = `[handleSuccessfulPayment] Error saving payment for user:${user_id} amount: ${amount} at:${new Date().getTime()} error:${error}`
    console.error(msg)
    throw new Error(msg)
  }
}

export { handleSuccessfulPayment }
