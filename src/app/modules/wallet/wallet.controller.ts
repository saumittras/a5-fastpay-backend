/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
import AppError from "../../errorHelpers/AppError";
import { catchAsync } from "../../utils/catchAsync";
import { verifyToken } from "../../utils/jwt";
import { sendResponse } from "../../utils/sendResponse";
import { WalletServices } from "./wallet.service";

const verifyWallet = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const body = req.body;

    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(403, "No Token Recieved");
    }
    const verifiedToken = verifyToken(
      token,
      envVars.JWT_ACCESS_SECRET
    ) as JwtPayload;

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message:
        "User and Wallet Created Successfully. Please Verify the wallet by NID Card",
      data: null,
    });
  }
);

const myTransactions = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message:
        "User and Wallet Created Successfully. Please Verify the wallet by NID Card",
      data: null,
    });
  }
);

const beAgent = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message:
        "User and Wallet Created Successfully. Please Verify the wallet by NID Card",
      data: null,
    });
  }
);

const checkBalance = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const result = await WalletServices.checkBalance(req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User Balance is successfully rettrive ",
      data: result,
    });
  }
);

export const WalletControllers = {
  verifyWallet,
  myTransactions,
  beAgent,
  checkBalance,
};
