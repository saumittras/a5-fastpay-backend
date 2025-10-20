import { model, Schema } from "mongoose";
import { IUser, Role, status } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    phone: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    pinNumber: { type: Number, required: true },
    picture: { type: String },
    address: { type: String },
    accountStatus: {
      type: String,
      enum: Object.values(status),
      default: status.ACTIVE,
    },
    agentRequest: { type: Boolean, default: false },
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
