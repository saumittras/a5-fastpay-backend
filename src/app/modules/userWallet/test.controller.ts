import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { UserWalletService } from "./test.service";

const sendMoney = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, _next: NextFunction) => {
    const result = await UserWalletService.sendMoney(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: `Money sent Successfully Completed`,
      data: result,
    });
  }
);

const withdrawMoney = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, _next: NextFunction) => {
    const result = await UserWalletService.withdrawMoney(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: `Withdraw Money Successfully Completed`,
      data: result,
    });
  }
);

const addMoney = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, _next: NextFunction) => {
    const result = await UserWalletService.addMoney(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: `Add Money Successfully Completed`,
      data: result,
    });
  }
);

const myTransaction = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, _next: NextFunction) => {
    const result = await UserWalletService.myTransaction(req.body.walletNo);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: `All User Transaction reterived Completed`,
      data: result,
    });
  }
);

export const TestController = {
  sendMoney,
  withdrawMoney,
  addMoney,
  myTransaction,
};
