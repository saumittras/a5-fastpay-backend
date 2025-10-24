import bcryptjs from "bcryptjs";
import { envVars } from "../../config/env";
import { Wallet } from "../wallet/wallet.model";
import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (payload: Partial<IUser>) => {
  const { name, phone, password, pinNumber, ...rest } = payload;
  const isUserExist = await User.findOne({ phone: phone });
  if (isUserExist) {
    throw new Error("User Already Exist");
  }

  const hashPassword = await bcryptjs.hash(
    password as string,
    Number(envVars.BCRYPT_SALT_ROUND)
  );

  const hashPin = await bcryptjs.hash(
    pinNumber?.toString() as string,
    Number(envVars.BCRYPT_SALT_ROUND)
  );

  const user = await User.create({
    name: name,
    phone: phone,
    password: hashPassword,
    pinNumber: hashPin,
    ...rest,
  });

  if (user) {
    const walletData = {
      userId: user?._id,
      walletNo: user?.phone,
      pinNumber: hashPin,
      walletType: user?.role,
      walletStatus: user?.accountStatus,
    };

    await Wallet.create(walletData);
  }
  return user;
};

export const UserServices = {
  createUser,
};
