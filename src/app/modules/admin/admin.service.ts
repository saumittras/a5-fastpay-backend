import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { Transaction } from "../transaction/transaction.model";
import { Role, status } from "../user/user.interface";
import { User } from "../user/user.model";
import { Wallet } from "../wallet/wallet.model";

const getAllUser = async () => {
  const allUser = await User.find({});
  return allUser;
};

const getAllWallet = async () => {
  const wallet = await Wallet.find({});
  return wallet;
};

const getAllTransactions = async () => {
  const allTransactions = await Transaction.find();
  return allTransactions;
};

const userBlockUnblock = async (userId: string, action: string) => {
  const isUserExist = await User.findById(userId);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
  }

  let userAction;
  if (action.toLowerCase() === "block") {
    userAction = status.BLOCKED;
  } else if (action.toLowerCase() === "unblock") {
    userAction = status.ACTIVE;
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid action");
  }

  const payload = { accountStatus: userAction };
  const result = await User.findByIdAndUpdate(userId, payload, {
    new: true,
  });

  return result;
};

const approvedSuspendAgent = async (id: string, action: string) => {
  const isAgentExist = await User.findById(id);
  if (!isAgentExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
  }

  let agentAction;
  if (
    isAgentExist.accountStatus === status.ACTIVE &&
    isAgentExist.role === Role.USER
  ) {
    if (action.toLowerCase() === "approve") {
      agentAction = Role.AGENT;
      const result = await User.findByIdAndUpdate(
        id,
        { role: agentAction },
        { new: true }
      );
      return result;
    }
  }

  if (
    isAgentExist.accountStatus === status.ACTIVE &&
    isAgentExist.role === Role.AGENT
  ) {
    if (action.toLowerCase() === "suspend") {
      agentAction = status.SUSPEND;
      const result = await User.findByIdAndUpdate(
        id,
        { accountStatus: agentAction },
        { new: true }
      );
      return result;
    }
  }

  if (
    isAgentExist.accountStatus === status.SUSPEND &&
    isAgentExist.role === Role.AGENT
  ) {
    if (action.toLowerCase() === "active") {
      agentAction = status.ACTIVE;
      const result = await User.findByIdAndUpdate(
        id,
        { accountStatus: agentAction },
        { new: true }
      );
      return result;
    }
  }
};

export const AdminServices = {
  getAllUser,
  userBlockUnblock,
  getAllTransactions,
  approvedSuspendAgent,
  getAllWallet,
};
