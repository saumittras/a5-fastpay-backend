import { model, Schema } from "mongoose";
import {
  CurrencyType,
  IWallet,
  WalletStatus,
  WalletType,
} from "./wallet.interface";

const walletSchema = new Schema<IWallet>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  accountNo: {
    type: Number,
    unique: true,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    default: 50,
  },
  currency: {
    type: String,
    enum: Object.values(CurrencyType),
    default: CurrencyType.BDT,
  },
  walletType: {
    type: String,
    enum: Object.values(WalletType),
    default: WalletType.USER,
  },
  walletStatus: {
    type: String,
    enum: Object.values(WalletStatus),
    default: WalletStatus.UNVERIFIED,
  },
  isNIDVerified: {
    type: Boolean,
    default: false,
  },
});

export const Wallet = model<IWallet>("Wallet", walletSchema);
