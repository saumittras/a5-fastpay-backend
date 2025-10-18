/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const createUser = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    console.log(req.body);
    const user = await UserServices.createUser(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message:
        "User and Wallet Created Successfully. Please Verify the wallet by NID Card",
      data: user,
    });
  }
);

export const UserController = {
  createUser,
};
