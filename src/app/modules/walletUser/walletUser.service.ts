import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelpers/AppError";
import { getTXId } from "../transaction/transaction.controller";
import {
  ITransaction,
  TX_Status,
  TX_Type,
} from "../transaction/transaction.interface";
import { Transaction } from "../transaction/transaction.model";
import { Role } from "../user/user.interface";
import { User } from "../user/user.model";

const sendMoney = async (payload: Partial<ITransaction>, user: JwtPayload) => {
  const phone = payload?.phoneTo as string;
  const isUserExist = await User.findOne({ phone: phone });
  console.log("phone", phone, "IsExist", isUserExist);

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User does not exist");
  }

  const trxData = {
    from: user.userId,
    phoneFrom: user.phone,
    to: isUserExist._id,
    phoneTo: isUserExist.phone,
    transactionId: getTXId(),
    transactionType: TX_Type.SEND_MONEY,
    amount: payload?.amount,
    status: TX_Status.COMPLETED,
    initiatorRole: Role.USER,
  };

  const transaction = await Transaction.create(trxData);
  return transaction;

  // const {to, amount} = payload
};

export const WalletUserService = {
  sendMoney,
};
