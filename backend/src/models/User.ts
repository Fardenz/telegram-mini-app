import mongoose, { Schema } from "mongoose";

const User = mongoose.model('User', new Schema({
  telegramId: String,
  walletAmount: String
}));
export default User;
