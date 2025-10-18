import { model, Schema } from "mongoose";
import { Role } from "../user/user.interface";
import { ITransaction, TX_Status, TX_Type } from "./transaction.interface";

const transactionSchema = new Schema<ITransaction>(
  {
    from: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    phoneFrom: {
      type: String,
      required: true,
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    phoneTo: {
      type: String,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    transactionType: {
      type: String,
      enum: Object.values(TX_Type),
      default: TX_Type.SEND_MONEY,
    },
    amount: {
      type: Number,
      required: true,
    },
    fee: {
      type: Number,
      default: 0,
    },
    commission: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: Object.values(TX_Status),
      default: TX_Status.COMPLETED,
    },
    initiatorRole: {
      type: String,
      enum: Object.values(Role),
      default: Role.USER,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Transaction = model<ITransaction>(
  "Transaction",
  transactionSchema
);
