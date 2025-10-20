import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const getAllUser = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, _next: NextFunction) => {
    // const user = await AdminServices.getAllUser();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "All user data retived",
      data: "user",
    });
  }
);

export const AgentController = {
  getAllUser,
};
