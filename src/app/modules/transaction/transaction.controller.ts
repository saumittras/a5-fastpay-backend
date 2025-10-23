import httpStatus from "http-status-codes";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ITransaction } from "./transaction.interface";
import { Transaction } from "./transaction.model";

export const getTXId = () => {
  return `TX_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
};

const registerTransaction = async (payload: Partial<ITransaction>) => {
  const transactionId = getTXId();
  const transaction = await Transaction.create({ transactionId, ...payload });
  return transaction;
};

const sendMoney = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const payload = req.body;

    // console.log(payload);

    // const decodedToken = req.user;

    // console.log(decodedToken);

    // const transResult = await TransactionServices.sendMoney(
    //   payload,
    //   decodedToken
    // );
    // console.log(transResult);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Successfully Sent Money",
      data: null,
    });
  }
);

export const TransactionControllers = {
  sendMoney,
  // addMoney,
  // withdrowMoney,
  // cashIn,
  // cashOut,
};
