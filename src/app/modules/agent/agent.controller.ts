import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AgentService } from "./agent.service";

const cashIn = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, _next: NextFunction) => {
    const result = await AgentService.cashIn(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: `Cash In Successfully Completed`,
      data: result,
    });
  }
);

const cashOut = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, _next: NextFunction) => {
    const result = await AgentService.cashOut(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Cash Out Successfully Completed",
      data: result,
    });
  }
);

export const AgentController = {
  cashIn,
  cashOut,
};
