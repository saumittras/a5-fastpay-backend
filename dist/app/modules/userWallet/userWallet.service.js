"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserWalletService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const transaction_controller_1 = require("../transaction/transaction.controller");
const transaction_interface_1 = require("../transaction/transaction.interface");
const transaction_model_1 = require("../transaction/transaction.model");
const user_interface_1 = require("../user/user.interface");
const user_model_1 = require("../user/user.model");
const wallet_model_1 = require("../wallet/wallet.model");
const sendMoney = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    const { agentNo, userNo, amount, pinNumber } = payload;
    return payload;
    // const isAgentExist = await User.findOne({ phone: agentNo });
    // //   const isUserExist = await User.findOne({ phone: userNo });
    // const isAgentWalExist = await Wallet.findOne({ walletNo: agentNo });
    // const isUserWalExist = await Wallet.findOne({ walletNo: userNo });
    // if (!isAgentExist) throw new AppError(403, "User does not exist");
    // if (isAgentExist?.role !== Role.USER)
    //   throw new AppError(403, "User are not an Agent");
    // if (!isAgentExist?.accountStatus) {
    //   throw new AppError(400, "User wallet not found");
    // }
    // if (
    //   [
    //     status.BLOCKED,
    //     status.CLOSED,
    //     status.DELETED,
    //     status.FROZEN,
    //     status.PENDING,
    //     status.SUSPEND,
    //   ].includes(isAgentExist?.accountStatus)
    // ) {
    //   throw new AppError(403, "You are not permitted for this operation");
    // }
    // if (!isAgentWalExist || !isUserWalExist)
    //   throw new AppError(403, "Wallet not found");
    // if (!isAgentExist?.pinNumber) {
    //   throw new AppError(403, "Agent PIN not found. Please set your PIN first.");
    // }
    // const isPinNoMatch = await bcryptjs.compare(
    //   pinNumber as string,
    //   isAgentExist?.pinNumber as string
    // );
    // if (!isPinNoMatch) throw new AppError(403, "PIN Number does not match");
    // if ((isAgentWalExist.balance ?? 0) < amount)
    //   throw new AppError(403, "You don't have enough balance");
    // const session = await Wallet.startSession();
    // session.startTransaction();
    // try {
    //   const updatedAgentBalance =
    //     Number(isAgentWalExist.balance ?? 0) - Number(amount);
    //   const updatedUserBalance =
    //     Number(isUserWalExist.balance ?? 0) + Number(amount);
    //   const updatedAgentWallet = await Wallet.findOneAndUpdate(
    //     { walletNo: agentNo },
    //     { balance: updatedAgentBalance },
    //     { new: true, runValidators: true, session }
    //   );
    //   const updatedUserWallet = await Wallet.findOneAndUpdate(
    //     { walletNo: userNo },
    //     { balance: updatedUserBalance },
    //     { new: true, runValidators: true, session }
    //   );
    //   if (!updatedAgentWallet || !updatedUserWallet)
    //     throw new AppError(401, "Wallet update failed");
    //   const trxData = {
    //     phoneFrom: agentNo,
    //     phoneTo: userNo,
    //     transactionId: getTXId(),
    //     transactionType: TX_Type.CASH_IN,
    //     amount,
    //     status: TX_Status.COMPLETED,
    //     initiatorRole: Role.AGENT,
    //   };
    //   const [transaction] = await Transaction.create([trxData], { session });
    //   await session.commitTransaction();
    //   session.endSession();
    //   return {
    //     message: "Cash In Successful",
    //     transaction,
    //     updatedAgentBalance,
    //     updatedUserBalance,
    //   };
    // } catch (error) {
    //   await session.abortTransaction();
    //   session.endSession();
    //   throw error;
    // }
});
const addMoney = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { agentNo, userNo, amount, pinNumber } = payload;
    const totalAmount = Number(amount) * 0.01 + Number(amount);
    const isAgentExist = yield user_model_1.User.findOne({ phone: agentNo });
    //   const isUserExist = await User.findOne({ phone: userNo });
    const isAgentWalExist = yield wallet_model_1.Wallet.findOne({ walletNo: agentNo });
    const isUserWalExist = yield wallet_model_1.Wallet.findOne({ walletNo: userNo });
    if (!isAgentExist)
        throw new AppError_1.default(403, "Agent does not exist");
    if ((isAgentExist === null || isAgentExist === void 0 ? void 0 : isAgentExist.role) !== user_interface_1.Role.AGENT)
        throw new AppError_1.default(403, "You are not an Agent");
    if (!(isAgentExist === null || isAgentExist === void 0 ? void 0 : isAgentExist.accountStatus)) {
        throw new AppError_1.default(400, "User wallet not found");
    }
    if ([
        user_interface_1.status.BLOCKED,
        user_interface_1.status.CLOSED,
        user_interface_1.status.DELETED,
        user_interface_1.status.FROZEN,
        user_interface_1.status.PENDING,
        user_interface_1.status.SUSPEND,
    ].includes(isAgentExist === null || isAgentExist === void 0 ? void 0 : isAgentExist.accountStatus)) {
        throw new AppError_1.default(403, "You are not permitted for this operation");
    }
    if (!isAgentWalExist || !isUserWalExist)
        throw new AppError_1.default(403, "Wallet not found");
    if (!(isAgentExist === null || isAgentExist === void 0 ? void 0 : isAgentExist.pinNumber)) {
        throw new AppError_1.default(403, "Agent PIN not found. Please set your PIN first.");
    }
    const isPinNoMatch = yield bcryptjs_1.default.compare(pinNumber, isAgentExist === null || isAgentExist === void 0 ? void 0 : isAgentExist.pinNumber);
    if (!isPinNoMatch)
        throw new AppError_1.default(403, "PIN Number does not match");
    if (((_a = isUserWalExist.balance) !== null && _a !== void 0 ? _a : 0) < totalAmount)
        throw new AppError_1.default(403, "You don't have enough balance");
    const session = yield wallet_model_1.Wallet.startSession();
    session.startTransaction();
    try {
        const updatedAgentBalance = Number((_b = isAgentWalExist.balance) !== null && _b !== void 0 ? _b : 0) + Number(totalAmount);
        const updatedUserBalance = Number((_c = isUserWalExist.balance) !== null && _c !== void 0 ? _c : 0) - Number(totalAmount);
        const updatedAgentWallet = yield wallet_model_1.Wallet.findOneAndUpdate({ walletNo: agentNo }, { balance: updatedAgentBalance }, { new: true, runValidators: true, session });
        const updatedUserWallet = yield wallet_model_1.Wallet.findOneAndUpdate({ walletNo: userNo }, { balance: updatedUserBalance }, { new: true, runValidators: true, session });
        if (!updatedAgentWallet || !updatedUserWallet)
            throw new AppError_1.default(401, "Wallet update failed");
        const trxData = {
            phoneFrom: agentNo,
            phoneTo: userNo,
            transactionId: (0, transaction_controller_1.getTXId)(),
            transactionType: transaction_interface_1.TX_Type.CASH_OUT,
            amount,
            commission: Number(amount) * 0.01,
            status: transaction_interface_1.TX_Status.COMPLETED,
            initiatorRole: user_interface_1.Role.AGENT,
        };
        const [transaction] = yield transaction_model_1.Transaction.create([trxData], { session });
        yield session.commitTransaction();
        session.endSession();
        return {
            message: "Cash Out Successful",
            transaction,
            updatedAgentBalance,
            updatedUserBalance,
        };
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
exports.UserWalletService = { sendMoney, addMoney };
