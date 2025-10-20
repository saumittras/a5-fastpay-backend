/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AdminServices } from "./adminAuth.service";

const getAllUser = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const user = await AdminServices.getAllUser();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "All user data retived",
      data: user,
    });
  }
);

const userBlockUnblock = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const user = await AdminServices.userBlockUnblock(
      req.body.id,
      req.body.action
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "All user data retived",
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
      message: "All Transactions data retived",
      data: result,
    });
  }
);

const approvedSuspendAgent = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const result = await AdminServices.approvedSuspendAgent(
      req.body.id,
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
};
