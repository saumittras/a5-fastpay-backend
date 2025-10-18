import { IUser } from "./../user/user.interface";
import { User } from "./../user/user.model";
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import bcryptjs from "bcryptjs";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";

import { Response } from "express";
import AppError from "../../errorHelpers/AppError";
import { setAuthCookie } from "../../utils/setCookies";
import {
  createNewAccessTokenWithRefreshToken,
  createUserTokens,
} from "../../utils/userTokens";

const credentialsLogin = async (payload: Partial<IUser>, res: Response) => {
  const { phone, password } = payload;

  const isUserExist = await User.findOne({ phone });

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Does Not Exist");
  }

  const isPasswordMatched = await bcryptjs.compare(
    password as string,
    isUserExist.password as string
  );

  if (!isPasswordMatched) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Phone Number and Password do not match"
    );
  }

  const userTokens = createUserTokens(isUserExist);
  setAuthCookie(res, userTokens);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: pass, pinNumber, ...rest } = isUserExist.toObject();

  return {
    accessToken: userTokens.accessToken,
    refreshToken: userTokens.refreshToken,
    user: rest,
  };
};

const getNewAccessToken = async (refreshToken: string, res: Response) => {
  const newAccessToken = await createNewAccessTokenWithRefreshToken(
    refreshToken
  );
  setAuthCookie(res, newAccessToken);

  return {
    accessToken: newAccessToken,
  };
};

const resetPassword = async (
  oldPassword: string,
  newPassword: string,
  decodedToken: JwtPayload
) => {
  const user = await User.findById(decodedToken.userId);

  const isOldPasswordMatch = await bcryptjs.compare(
    oldPassword,
    user!.password as string
  );
  if (!isOldPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, "Old Password Does not match");
  }
  const hPassword = await bcryptjs.hash(
    newPassword,
    Number(envVars.BCRYPT_SALT_ROUND)
  );

  await User.findByIdAndUpdate(
    user?._id,
    { $set: { password: hPassword } },
    {
      new: true,
    }
  );
};

export const AuthServices = {
  credentialsLogin,
  getNewAccessToken,
  resetPassword,
};
