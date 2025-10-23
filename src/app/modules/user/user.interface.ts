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
  BLOCKED = "BLOCKED",
  FROZEN = "FROZEN",
  CLOSED = "CLOSED",
  DELETED = "DELETED",
  SUSPEND = "SUSPEND",
}

export interface IUser {
  _id?: ObjectId;
  name: string;
  phone: string;
  password: string;
  pinNumber: string;
  picture?: string;
  address?: string;
  accountStatus?: status;
  agentRequest?: boolean;
  role?: Role;
  createdBy?: Role;
}
