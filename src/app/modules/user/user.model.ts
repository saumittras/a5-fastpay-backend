import { model, Schema } from "mongoose";
import { AccountStatus, IUser, Role } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    // email: { type: String },
    phone: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    pinNumber: { type: String, required: true },
    picture: { type: String },
    address: { type: String },
    isActive: {
      type: String,
      enum: Object.values(AccountStatus),
      default: AccountStatus.ACTIVE,
    },
    isNIDVerified: { type: Boolean, default: false },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.USER,
    },
    createdBy: { type: String, enum: Object.values(Role), default: Role.USER },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const User = model<IUser>("User", userSchema);
