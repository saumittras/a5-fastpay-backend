import { Types } from "mongoose";

export enum WalletType {
  USER = "USER",
  AGENT = "AGENT",
  PENDINGAGENT = "PENDINGAGENT",
}

export enum WalletStatus {
  UNVERIFIED = "UNVERIFIED",
  BLOCKED = "BLOCKED",
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPEND",
}

export interface IWallet {
  _id?: string;
  userId: Types.ObjectId;
  walletNo: string;
  pinNumber: string;
  balance: number;
  walletType: WalletType;
  walletStatus: WalletStatus;
  blockedReason?: string;
  isNIDVerified: boolean;
}
