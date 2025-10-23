import { ObjectId } from "mongoose";
import { Role } from "../user/user.interface";

export enum TX_Type {
  ADD_MONEY = "ADD_MONEY",
  WITHDRAW = "WITHDRAW",
  SEND_MONEY = "SEND_MONEY",
  CASH_IN = "CASH_IN",
  CASH_OUT = "CASH_OUT",
}

export enum TX_Status {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  REVERSED = "REVERSED",
  FAILED = "FAILED",
}

export interface ITransaction {
  _id?: ObjectId;
  phoneFrom: string;
  phoneTo: string;
  transactionId: string;
  transactionType: TX_Type;
  amount: number;
  fee?: number;
  commission?: number;
  status?: TX_Status;
  initiatorRole?: Role;
}
