import mongoose, { Schema } from "mongoose";

const Wallet = mongoose.model('Wallet', new Schema({
  id: Number,
  amount: String
}));
export default Wallet;
