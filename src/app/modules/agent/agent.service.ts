// import bcryptjs from "bcryptjs";
import AppError from "../../errorHelpers/AppError";
import { getTXId } from "../transaction/transaction.controller";
import { TX_Status, TX_Type } from "../transaction/transaction.interface";
import { Transaction } from "../transaction/transaction.model";
import { Role, status } from "../user/user.interface";
import { User } from "../user/user.model";
import { Wallet } from "../wallet/wallet.model";
import { ICashIn } from "./agent.interface";

const cashIn = async (payload: ICashIn) => {
  const { agentNo, userNo, amount, pinNumber } = payload;

  const isAgentExist = await User.findOne({ phone: agentNo });
  //   const isUserExist = await User.findOne({ phone: userNo });
  const isAgentWalExist = await Wallet.findOne({ walletNo: agentNo });
  const isUserWalExist = await Wallet.findOne({ walletNo: userNo });

  if (!isAgentExist) throw new AppError(403, "Agent does not exist");
  if (isAgentExist?.role !== Role.AGENT)
    throw new AppError(403, "You are not an Agent");

  if (!isAgentExist?.accountStatus) {
    throw new AppError(400, "User wallet not found");
  }
  if (
    [
      status.BLOCKED,
      status.CLOSED,
      status.DELETED,
      status.FROZEN,
      status.PENDING,
      status.SUSPEND,
    ].includes(isAgentExist?.accountStatus)
  ) {
    throw new AppError(403, "You are not permitted for this operation");
  }

  if (!isAgentWalExist || !isUserWalExist)
    throw new AppError(403, "Wallet not found");

  if (!isAgentExist?.pinNumber) {
    throw new AppError(403, "Agent PIN not found. Please set your PIN first.");
  }

  // const isPinNoMatch = await bcryptjs.compare(
  //   pinNumber as string,
  //   isAgentExist?.pinNumber as string
  // );

  // if (!isPinNoMatch) throw new AppError(403, "PIN Number does not match");

  if ((isAgentWalExist.balance ?? 0) < amount)
    throw new AppError(403, "You don't have enough balance");

  const session = await Wallet.startSession();
  session.startTransaction();

  try {
    const updatedAgentBalance =
      Number(isAgentWalExist.balance ?? 0) - Number(amount);
    const updatedUserBalance =
      Number(isUserWalExist.balance ?? 0) + Number(amount);

    const updatedAgentWallet = await Wallet.findOneAndUpdate(
      { walletNo: agentNo },
      { balance: updatedAgentBalance },
      { new: true, runValidators: true, session }
    );

    const updatedUserWallet = await Wallet.findOneAndUpdate(
      { walletNo: userNo },
      { balance: updatedUserBalance },
      { new: true, runValidators: true, session }
    );

    if (!updatedAgentWallet || !updatedUserWallet)
      throw new AppError(401, "Wallet update failed");

    const trxData = {
      phoneFrom: agentNo,
      phoneTo: userNo,
      transactionId: getTXId(),
      transactionType: TX_Type.CASH_IN,
      amount,
      status: TX_Status.COMPLETED,
      initiatorRole: Role.AGENT,
    };

    const [transaction] = await Transaction.create([trxData], { session });

    await session.commitTransaction();
    session.endSession();

    return {
      message: "Cash In Successful",
      transaction,
      updatedAgentBalance,
      updatedUserBalance,
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const cashOut = async (payload: ICashIn) => {
  const { agentNo, userNo, amount, pinNumber } = payload;

  const totalAmount = Number(amount) * 0.01 + Number(amount);

  const isAgentExist = await User.findOne({ phone: agentNo });
  //   const isUserExist = await User.findOne({ phone: userNo });
  const isAgentWalExist = await Wallet.findOne({ walletNo: agentNo });
  const isUserWalExist = await Wallet.findOne({ walletNo: userNo });

  if (!isAgentExist) throw new AppError(403, "Agent does not exist");

  if (isAgentExist?.role !== Role.AGENT)
    throw new AppError(403, "You are not an Agent");

  if (!isAgentExist?.accountStatus) {
    throw new AppError(400, "User wallet not found");
  }
  if (
    [
      status.BLOCKED,
      status.CLOSED,
      status.DELETED,
      status.FROZEN,
      status.PENDING,
      status.SUSPEND,
    ].includes(isAgentExist?.accountStatus)
  ) {
    throw new AppError(403, "You are not permitted for this operation");
  }

  if (!isAgentWalExist || !isUserWalExist)
    throw new AppError(403, "Wallet not found");

  if (!isAgentExist?.pinNumber) {
    throw new AppError(403, "Agent PIN not found. Please set your PIN first.");
  }

  // const isPinNoMatch = await bcryptjs.compare(
  //   pinNumber as string,
  //   isAgentExist?.pinNumber as string
  // );

  // if (!isPinNoMatch) throw new AppError(403, "PIN Number does not match");

  if ((isUserWalExist.balance ?? 0) < totalAmount)
    throw new AppError(403, "You don't have enough balance");

  const session = await Wallet.startSession();
  session.startTransaction();

  try {
    const updatedAgentBalance =
      Number(isAgentWalExist.balance ?? 0) + Number(totalAmount);
    const updatedUserBalance =
      Number(isUserWalExist.balance ?? 0) - Number(totalAmount);

    const updatedAgentWallet = await Wallet.findOneAndUpdate(
      { walletNo: agentNo },
      { balance: updatedAgentBalance },
      { new: true, runValidators: true, session }
    );

    const updatedUserWallet = await Wallet.findOneAndUpdate(
      { walletNo: userNo },
      { balance: updatedUserBalance },
      { new: true, runValidators: true, session }
    );

    if (!updatedAgentWallet || !updatedUserWallet)
      throw new AppError(401, "Wallet update failed");

    const trxData = {
      phoneFrom: agentNo,
      phoneTo: userNo,
      transactionId: getTXId(),
      transactionType: TX_Type.CASH_OUT,
      amount,
      commission: Number(amount) * 0.01,
      status: TX_Status.COMPLETED,
      initiatorRole: Role.AGENT,
    };

    const [transaction] = await Transaction.create([trxData], { session });

    await session.commitTransaction();
    session.endSession();

    return {
      message: "Cash Out Successful",
      transaction,
      updatedAgentBalance,
      updatedUserBalance,
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const AgentService = { cashIn, cashOut };
