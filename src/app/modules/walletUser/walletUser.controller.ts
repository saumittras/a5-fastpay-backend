/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const sendMoney = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const payload = req.body;

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Successfully Sent Money",
      data: null,
    });
  }
);

export const WalletUserController = {
  sendMoney,
};
