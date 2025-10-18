import { Types } from "mongoose";

export enum CurrencyType {
  BDT = "BDT",
  USD = "USD",
}

export enum WalletType {
  USER = "USER",
  AGENT = "AGENT",
  PENDINGAGENT = "PENDINGAGENT",
}

export enum WalletStatus {
  UNVERIFIED = "UNVERIFIED",
  BLOCKED = "BLOCKED",
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
}

export interface IWallet {
  _id?: string;
  userId: Types.ObjectId;
  accountNo: number;
  balance: number;
  currency: CurrencyType;
  walletType: WalletType;
  walletStatus: WalletStatus;
  blockedReason?: string;
  isNIDVerified: boolean;
}
