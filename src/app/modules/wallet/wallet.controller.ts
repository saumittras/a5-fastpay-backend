/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
import AppError from "../../errorHelpers/AppError";
import { catchAsync } from "../../utils/catchAsync";
import { verifyToken } from "../../utils/jwt";
import { sendResponse } from "../../utils/sendResponse";

const verifyWallet = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const body = req.body;
    console.log("Body", body);
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(403, "No Token Recieved");
    }
    const verifiedToken = verifyToken(
      token,
      envVars.JWT_ACCESS_SECRET
    ) as JwtPayload;
    console.log(verifiedToken);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message:
        "User and Wallet Created Successfully. Please Verify the wallet by NID Card",
      data: null,
    });
  }
);
const changeCurrency = catchAsync(
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

export const WalletControllers = {
  verifyWallet,
  changeCurrency,
  beAgent,
};
