import bcryptjs from "bcryptjs";
import AppError from "../../errorHelpers/AppError";
import { ICashIn } from "../agent/agent.interface";
import { getTXId } from "../transaction/transaction.controller";
import { TX_Status, TX_Type } from "../transaction/transaction.interface";
import { Transaction } from "../transaction/transaction.model";
import { Role, status } from "../user/user.interface";
import { User } from "../user/user.model";
import { Wallet } from "../wallet/wallet.model";

const sendMoney = async (payload: ICashIn) => {
  const { agentNo, userNo, amount, pinNumber } = payload;

  const isUserExist = await User.findOne({ phone: agentNo });
  const isReceiverExist = await User.findOne({ phone: userNo });

  const isUsarWalletExist = await Wallet.findOne({ walletNo: agentNo });
  const isReceiverWalletExist = await Wallet.findOne({ walletNo: userNo });

  if (!isUserExist) throw new AppError(403, "Agent does not exist");
  if (isUserExist?.role !== Role.USER)
    throw new AppError(403, "You are not User");

  if (!isReceiverExist) throw new AppError(403, "Receiver user does not exist");
  if (isReceiverExist?.role !== Role.USER)
    throw new AppError(403, "Receiver is not a user");

  if (!isUserExist?.accountStatus) {
    throw new AppError(400, "User account status Not found");
  }
  if (
    [
      status.BLOCKED,
      status.CLOSED,
      status.DELETED,
      status.FROZEN,
      status.PENDING,
      status.SUSPEND,
    ].includes(isUserExist?.accountStatus)
  ) {
    throw new AppError(403, "You are not permitted for this operation");
  }

  if (!isUsarWalletExist || !isReceiverWalletExist)
    throw new AppError(403, "Wallet not found");

  if (!isUserExist?.pinNumber) {
    throw new AppError(403, "Agent PIN not found. Please set your PIN first.");
  }

  const isPinNoMatch = await bcryptjs.compare(
    pinNumber as string,
    isUserExist?.pinNumber as string
  );

  if (!isPinNoMatch) throw new AppError(403, "PIN Number does not match");

  if ((isUsarWalletExist.balance ?? 0) < amount)
    throw new AppError(403, "You don't have enough balance");

  const session = await Wallet.startSession();
  session.startTransaction();

  try {
    const newUserBalance =
      Number(isUsarWalletExist.balance ?? 0) - Number(amount);
    const newReceiverBalance =
      Number(isReceiverWalletExist.balance ?? 0) + Number(amount);

    const updatedUserWallet = await Wallet.findOneAndUpdate(
      { walletNo: agentNo },
      { balance: newUserBalance },
      { new: true, runValidators: true, session }
    );

    const updatedReciverWallet = await Wallet.findOneAndUpdate(
      { walletNo: userNo },
      { balance: newReceiverBalance },
      { new: true, runValidators: true, session }
    );

    if (!updatedUserWallet || !updatedReciverWallet)
      throw new AppError(401, "Wallet update failed");

    const trxData = {
      phoneFrom: agentNo,
      phoneTo: userNo,
      transactionId: getTXId(),
      transactionType: TX_Type.SEND_MONEY,
      amount,
      status: TX_Status.COMPLETED,
      initiatorRole: Role.USER,
    };

    const [transaction] = await Transaction.create([trxData], { session });

    await session.commitTransaction();
    session.endSession();

    return {
      message: "Money sended Successful",
      transaction,
      updatedUserWallet,
      updatedReciverWallet,
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const withdrawMoney = async (payload: ICashIn) => {
  const { agentNo, userNo, amount, pinNumber } = payload;

  const isUserExist = await User.findOne({ phone: agentNo });
  const isReceiverExist = await User.findOne({ phone: userNo });

  const isUsarWalletExist = await Wallet.findOne({ walletNo: agentNo });
  const isReceiverWalletExist = await Wallet.findOne({ walletNo: userNo });

  if (!isUserExist) throw new AppError(403, "Agent does not exist");
  if (isUserExist?.role !== Role.USER)
    throw new AppError(403, "You are not User");

  if (!isReceiverExist) throw new AppError(403, "Receiver user does not exist");
  if (isReceiverExist?.role !== Role.AGENT)
    throw new AppError(403, "Receiver is not a agent");

  if (!isUserExist?.accountStatus) {
    throw new AppError(400, "User account status Not found");
  }
  if (
    [
      status.BLOCKED,
      status.CLOSED,
      status.DELETED,
      status.FROZEN,
      status.PENDING,
      status.SUSPEND,
    ].includes(isUserExist?.accountStatus)
  ) {
    throw new AppError(403, "You are not permitted for this operation");
  }

  if (!isUsarWalletExist || !isReceiverWalletExist)
    throw new AppError(403, "Wallet not found");

  if (!isUserExist?.pinNumber) {
    throw new AppError(403, "Agent PIN not found. Please set your PIN first.");
  }

  const isPinNoMatch = await bcryptjs.compare(
    pinNumber as string,
    isUserExist?.pinNumber as string
  );

  if (!isPinNoMatch) throw new AppError(403, "PIN Number does not match");

  const fee = Number(amount) * 0.01;
  const totalAmount = Number(amount) + Number(fee);

  if ((isUsarWalletExist.balance ?? 0) < totalAmount)
    throw new AppError(403, "You don't have enough balance");

  const session = await Wallet.startSession();
  session.startTransaction();

  try {
    const newUserBalance =
      Number(isUsarWalletExist.balance ?? 0) - Number(totalAmount);
    const newReceiverBalance =
      Number(isReceiverWalletExist.balance ?? 0) + Number(totalAmount);

    const updatedUserWallet = await Wallet.findOneAndUpdate(
      { walletNo: agentNo },
      { balance: newUserBalance },
      { new: true, runValidators: true, session }
    );

    const updatedReciverWallet = await Wallet.findOneAndUpdate(
      { walletNo: userNo },
      { balance: newReceiverBalance },
      { new: true, runValidators: true, session }
    );

    if (!updatedUserWallet || !updatedReciverWallet)
      throw new AppError(401, "Wallet update failed");

    const trxData = {
      phoneFrom: agentNo,
      phoneTo: userNo,
      transactionId: getTXId(),
      transactionType: TX_Type.WITHDRAW,
      amount,
      fee: fee,
      status: TX_Status.COMPLETED,
      initiatorRole: Role.USER,
    };

    const [transaction] = await Transaction.create([trxData], { session });

    await session.commitTransaction();
    session.endSession();

    return {
      message: "Money sended Successful",
      transaction,
      updatedUserWallet,
      updatedReciverWallet,
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const addMoney = async (payload: ICashIn) => {
  const { agentNo, userNo, amount, pinNumber } = payload;

  const isUserExist = await User.findOne({ phone: agentNo });
  const isReceiverExist = await User.findOne({ phone: userNo });

  const isUsarWalletExist = await Wallet.findOne({ walletNo: agentNo });
  const isReceiverWalletExist = await Wallet.findOne({ walletNo: userNo });

  if (!isUserExist) throw new AppError(403, "User does not exist");
  if (isUserExist?.role !== Role.USER)
    throw new AppError(403, "You are not User");

  if (!isReceiverExist) throw new AppError(403, "Agent does not exist");

  if (isReceiverExist?.role !== Role.AGENT)
    throw new AppError(403, "Sender is not a agent");

  if (!isUserExist?.accountStatus) {
    throw new AppError(400, "User account status Not found");
  }
  if (
    [
      status.BLOCKED,
      status.CLOSED,
      status.DELETED,
      status.FROZEN,
      status.PENDING,
      status.SUSPEND,
    ].includes(isUserExist?.accountStatus)
  ) {
    throw new AppError(403, "You are not permitted for this operation");
  }

  if (!isUsarWalletExist || !isReceiverWalletExist)
    throw new AppError(403, "Wallet not found");

  if (!isUserExist?.pinNumber) {
    throw new AppError(403, "Agent PIN not found. Please set your PIN first.");
  }

  const isPinNoMatch = await bcryptjs.compare(
    pinNumber as string,
    isUserExist?.pinNumber as string
  );

  if (!isPinNoMatch) throw new AppError(403, "PIN Number does not match");

  if ((isReceiverWalletExist.balance ?? 0) < amount)
    throw new AppError(403, "You don't have enough balance");

  const session = await Wallet.startSession();
  session.startTransaction();

  try {
    const newUserBalance =
      Number(isUsarWalletExist.balance ?? 0) + Number(amount);
    const newReceiverBalance =
      Number(isReceiverWalletExist.balance ?? 0) - Number(amount);

    const updatedUserWallet = await Wallet.findOneAndUpdate(
      { walletNo: agentNo },
      { balance: newUserBalance },
      { new: true, runValidators: true, session }
    );

    const updatedReciverWallet = await Wallet.findOneAndUpdate(
      { walletNo: userNo },
      { balance: newReceiverBalance },
      { new: true, runValidators: true, session }
    );

    if (!updatedUserWallet || !updatedReciverWallet)
      throw new AppError(401, "Wallet update failed");

    const trxData = {
      phoneFrom: agentNo,
      phoneTo: userNo,
      transactionId: getTXId(),
      transactionType: TX_Type.ADD_MONEY,
      amount,
      fee: 0,
      status: TX_Status.COMPLETED,
      initiatorRole: Role.USER,
    };

    const [transaction] = await Transaction.create([trxData], { session });

    await session.commitTransaction();
    session.endSession();

    return {
      message: "Money Added Successful",
      transaction,
      updatedUserWallet,
      updatedReciverWallet,
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const myTransaction = async (walletNo: string) => {
  const transactions = await Transaction.find({
    $or: [{ phoneFrom: walletNo }, { phoneTo: walletNo }],
  })
    .sort({ createdAt: -1 })
    .lean();

  return transactions;
};

export const UserWalletService = {
  sendMoney,
  withdrawMoney,
  addMoney,
  myTransaction,
};
