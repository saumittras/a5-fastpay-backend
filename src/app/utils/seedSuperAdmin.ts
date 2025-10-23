/* eslint-disable no-console */
import bcryptjs from "bcryptjs";
import { envVars } from "../config/env";
import { IUser, Role } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";

export const seedSuperAdmin = async () => {
  try {
    const isSuperAdminExist = await User.findOne({
      phone: envVars.SUPER_ADMIN_PHONE,
    });

    if (isSuperAdminExist) {
      console.log("Super Admin Already Exist");
      return;
    }
    const hashedPassword = await bcryptjs.hash(
      envVars.SUPER_ADMIN_PASSWORD,
      Number(envVars.BCRYPT_SALT_ROUND)
    );

    const hashedPin = await bcryptjs.hash(
      envVars.SUPER_ADMIN_PIN,
      Number(envVars.BCRYPT_SALT_ROUND)
    );

    const payload: IUser = {
      name: "Super Admin",
      role: Role.SUPER_ADMIN,
      phone: envVars.SUPER_ADMIN_PHONE,
      password: hashedPassword,
      pinNumber: hashedPin,
      createdBy: Role.SUPER_ADMIN,
    };

    const superAdmin = await User.create(payload);
    console.log("Super Admin Created Successfully ", superAdmin);
  } catch (error) {
    console.log(error);
  }
};
