import { model, Schema } from "mongoose";
import { IWallet, WalletStatus, WalletType } from "./wallet.interface";

const walletSchema = new Schema<IWallet>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  walletNo: {
    type: String,
    unique: true,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    default: 50,
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
  blockedReason: {
    type: String,
  },
  isNIDVerified: {
    type: Boolean,
    default: false,
  },
});

export const Wallet = model<IWallet>("Wallet", walletSchema);
