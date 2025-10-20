import { ObjectId } from "mongoose";

export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
  AGENT = "AGENT",
}

export enum status {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  SUSPEND = "SUSPEND",
  BLOCKED = "BLOCKED",
  DELETED = "DELETED",
}

export interface IUser {
  _id?: ObjectId;
  name: string;
  phone: string;
  password: string;
  pinNumber: number;
  picture?: string;
  address?: string;
  accountStatus?: status;
  agentRequest?: boolean;
  role?: Role;
  createdBy?: Role;
}
