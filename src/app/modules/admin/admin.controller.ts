/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AdminServices } from "./admin.service";

const getAllUser = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const user = await AdminServices.getAllUser();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "All user data retrieved",
      data: user,
    });
  }
);

const getAllWallet = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const wallet = await AdminServices.getAllWallet();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "All Wallet data retrieved",
      data: wallet,
    });
  }
);

const userBlockUnblock = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const user = await AdminServices.userBlockUnblock(
      req.body.walletNo,
      req.body.action
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: `User is ${req.body.action}`,
      data: user,
    });
  }
);

const getAllTransactions = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const result = await AdminServices.getAllTransactions();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "All Transactions data retrieved",
      data: result,
    });
  }
);

const approvedSuspendAgent = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const result = await AdminServices.approvedSuspendAgent(
      req.body.walletNo,
      req.body.action
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: `Agent ${req.body.action} successfully`,
      data: result,
    });
  }
);

export const AdminController = {
  getAllUser,
  userBlockUnblock,
  getAllTransactions,
  approvedSuspendAgent,
  getAllWallet,
};
