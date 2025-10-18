import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/AppError";
import { AccountStatus, IUser } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import { generateToken, verifyToken } from "./jwt";

export const createUserTokens = (user: Partial<IUser>) => {
  const jwtPayload = {
    userId: user._id,
    phone: user.phone,
    role: user.role,
  };

  const accessToken = generateToken(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRE
  );

  const refreshToken = generateToken(
    jwtPayload,
    envVars.JWT_REFRESH_SECRET,
    envVars.JWT_REFRESH_EXPIRE
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const createNewAccessTokenWithRefreshToken = async (
  refreshToken: string
) => {
  const verifiedRefreshToken = verifyToken(
    refreshToken,
    envVars.JWT_REFRESH_SECRET
  ) as JwtPayload;

  const isUserExist = await User.findOne({ phone: verifiedRefreshToken.phone });

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Does Not Exist");
  }

  if (
    isUserExist.isActive === AccountStatus.BLOCKED ||
    isUserExist.isActive === AccountStatus.CLOSED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `User is ${isUserExist.isActive}`
    );
  }

  if (isUserExist.isActive === AccountStatus.DELETED) {
    throw new AppError(httpStatus.BAD_REQUEST, "User is Deleted");
  }

  const JwtPayload = {
    userId: isUserExist._id,
    phone: isUserExist.phone,
    role: isUserExist.role,
  };

  const accessToken = generateToken(
    JwtPayload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRE
  );

  return {
    accessToken,
  };
};
