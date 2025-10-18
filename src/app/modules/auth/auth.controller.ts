import { NextFunction } from "express";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelpers/AppError";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const credentialsLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const loginData = await AuthServices.credentialsLogin(payload, res);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User logged in successfully",
      data: loginData,
    });
  }
);

const getNewAccessToken = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "No refresh token recived from cookies"
      );
    }

    const tokenInfo = await AuthServices.getNewAccessToken(
      refreshToken as string,
      res
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "New AccessToken Generated successfully",
      data: tokenInfo,
    });
  }
);

const logout = catchAsync(
  async (_req: Request, res: Response, _next: NextFunction) => {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User Logged Out Successfully",
      data: null,
    });
  }
);

const resetPassword = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const decodedToken = req.user;

    const user = await AuthServices.resetPassword(
      oldPassword,
      newPassword,
      decodedToken as JwtPayload
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Password reset Successfully",
      data: user,
    });
  }
);

export const AuthControllers = {
  credentialsLogin,
  getNewAccessToken,
  logout,
  resetPassword,
};
