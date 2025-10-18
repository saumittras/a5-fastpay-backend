import { ObjectId } from "mongoose";

export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
  AGENT = "AGENT",
}

export enum AccountStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
  FROZEN = "FROZEN",
  CLOSED = "CLOSED",
  DELETED = "DELETED",
}

export interface IUser {
  _id?: ObjectId;
  name: string;
  // email?: string;
  phone: string;
  password: string;
  pinNumber: string;
  picture?: string;
  address?: string;
  isActive?: AccountStatus;
  isNIDVerified?: boolean;
  role?: Role;
  createdBy?: Role;
}
