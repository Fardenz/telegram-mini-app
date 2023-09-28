import mongoose, { Schema } from "mongoose";

const Wallet = mongoose.model('Wallet', new Schema({
  telegramId: String,
  amount: String
}));
export default Wallet;
