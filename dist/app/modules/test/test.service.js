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
    var _a, _b, _c;
    const { agentNo, userNo, amount, pinNumber } = payload;
    const isUserExist = yield user_model_1.User.findOne({ phone: agentNo });
    const isReceiverExist = yield user_model_1.User.findOne({ phone: userNo });
    const isUsarWalletExist = yield wallet_model_1.Wallet.findOne({ walletNo: agentNo });
    const isReceiverWalletExist = yield wallet_model_1.Wallet.findOne({ walletNo: userNo });
    if (!isUserExist)
        throw new AppError_1.default(403, "Agent does not exist");
    if ((isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.role) !== user_interface_1.Role.USER)
        throw new AppError_1.default(403, "You are not User");
    if (!isReceiverExist)
        throw new AppError_1.default(403, "Receiver user does not exist");
    if ((isReceiverExist === null || isReceiverExist === void 0 ? void 0 : isReceiverExist.role) !== user_interface_1.Role.USER)
        throw new AppError_1.default(403, "Receiver is not a user");
    if (!(isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.accountStatus)) {
        throw new AppError_1.default(400, "User account status Not found");
    }
    if ([
        user_interface_1.status.BLOCKED,
        user_interface_1.status.CLOSED,
        user_interface_1.status.DELETED,
        user_interface_1.status.FROZEN,
        user_interface_1.status.PENDING,
        user_interface_1.status.SUSPEND,
    ].includes(isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.accountStatus)) {
        throw new AppError_1.default(403, "You are not permitted for this operation");
    }
    if (!isUsarWalletExist || !isReceiverWalletExist)
        throw new AppError_1.default(403, "Wallet not found");
    if (!(isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.pinNumber)) {
        throw new AppError_1.default(403, "Agent PIN not found. Please set your PIN first.");
    }
    const isPinNoMatch = yield bcryptjs_1.default.compare(pinNumber, isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.pinNumber);
    if (!isPinNoMatch)
        throw new AppError_1.default(403, "PIN Number does not match");
    if (((_a = isUsarWalletExist.balance) !== null && _a !== void 0 ? _a : 0) < amount)
        throw new AppError_1.default(403, "You don't have enough balance");
    const session = yield wallet_model_1.Wallet.startSession();
    session.startTransaction();
    try {
        const newUserBalance = Number((_b = isUsarWalletExist.balance) !== null && _b !== void 0 ? _b : 0) - Number(amount);
        const newReceiverBalance = Number((_c = isReceiverWalletExist.balance) !== null && _c !== void 0 ? _c : 0) + Number(amount);
        const updatedUserWallet = yield wallet_model_1.Wallet.findOneAndUpdate({ walletNo: agentNo }, { balance: newUserBalance }, { new: true, runValidators: true, session });
        const updatedReciverWallet = yield wallet_model_1.Wallet.findOneAndUpdate({ walletNo: userNo }, { balance: newReceiverBalance }, { new: true, runValidators: true, session });
        if (!updatedUserWallet || !updatedReciverWallet)
            throw new AppError_1.default(401, "Wallet update failed");
        const trxData = {
            phoneFrom: agentNo,
            phoneTo: userNo,
            transactionId: (0, transaction_controller_1.getTXId)(),
            transactionType: transaction_interface_1.TX_Type.SEND_MONEY,
            amount,
            status: transaction_interface_1.TX_Status.COMPLETED,
            initiatorRole: user_interface_1.Role.USER,
        };
        const [transaction] = yield transaction_model_1.Transaction.create([trxData], { session });
        yield session.commitTransaction();
        session.endSession();
        return {
            message: "Money sended Successful",
            transaction,
            updatedUserWallet,
            updatedReciverWallet,
        };
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
const withdrawMoney = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { agentNo, userNo, amount, pinNumber } = payload;
    const isUserExist = yield user_model_1.User.findOne({ phone: agentNo });
    const isReceiverExist = yield user_model_1.User.findOne({ phone: userNo });
    const isUsarWalletExist = yield wallet_model_1.Wallet.findOne({ walletNo: agentNo });
    const isReceiverWalletExist = yield wallet_model_1.Wallet.findOne({ walletNo: userNo });
    if (!isUserExist)
        throw new AppError_1.default(403, "Agent does not exist");
    if ((isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.role) !== user_interface_1.Role.USER)
        throw new AppError_1.default(403, "You are not User");
    if (!isReceiverExist)
        throw new AppError_1.default(403, "Receiver user does not exist");
    if ((isReceiverExist === null || isReceiverExist === void 0 ? void 0 : isReceiverExist.role) !== user_interface_1.Role.AGENT)
        throw new AppError_1.default(403, "Receiver is not a agent");
    if (!(isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.accountStatus)) {
        throw new AppError_1.default(400, "User account status Not found");
    }
    if ([
        user_interface_1.status.BLOCKED,
        user_interface_1.status.CLOSED,
        user_interface_1.status.DELETED,
        user_interface_1.status.FROZEN,
        user_interface_1.status.PENDING,
        user_interface_1.status.SUSPEND,
    ].includes(isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.accountStatus)) {
        throw new AppError_1.default(403, "You are not permitted for this operation");
    }
    if (!isUsarWalletExist || !isReceiverWalletExist)
        throw new AppError_1.default(403, "Wallet not found");
    if (!(isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.pinNumber)) {
        throw new AppError_1.default(403, "Agent PIN not found. Please set your PIN first.");
    }
    const isPinNoMatch = yield bcryptjs_1.default.compare(pinNumber, isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.pinNumber);
    if (!isPinNoMatch)
        throw new AppError_1.default(403, "PIN Number does not match");
    const fee = Number(amount) * 0.01;
    const totalAmount = Number(amount) + Number(fee);
    if (((_a = isUsarWalletExist.balance) !== null && _a !== void 0 ? _a : 0) < totalAmount)
        throw new AppError_1.default(403, "You don't have enough balance");
    const session = yield wallet_model_1.Wallet.startSession();
    session.startTransaction();
    try {
        const newUserBalance = Number((_b = isUsarWalletExist.balance) !== null && _b !== void 0 ? _b : 0) - Number(totalAmount);
        const newReceiverBalance = Number((_c = isReceiverWalletExist.balance) !== null && _c !== void 0 ? _c : 0) + Number(totalAmount);
        const updatedUserWallet = yield wallet_model_1.Wallet.findOneAndUpdate({ walletNo: agentNo }, { balance: newUserBalance }, { new: true, runValidators: true, session });
        const updatedReciverWallet = yield wallet_model_1.Wallet.findOneAndUpdate({ walletNo: userNo }, { balance: newReceiverBalance }, { new: true, runValidators: true, session });
        if (!updatedUserWallet || !updatedReciverWallet)
            throw new AppError_1.default(401, "Wallet update failed");
        const trxData = {
            phoneFrom: agentNo,
            phoneTo: userNo,
            transactionId: (0, transaction_controller_1.getTXId)(),
            transactionType: transaction_interface_1.TX_Type.WITHDRAW,
            amount,
            fee: fee,
            status: transaction_interface_1.TX_Status.COMPLETED,
            initiatorRole: user_interface_1.Role.USER,
        };
        const [transaction] = yield transaction_model_1.Transaction.create([trxData], { session });
        yield session.commitTransaction();
        session.endSession();
        return {
            message: "Money sended Successful",
            transaction,
            updatedUserWallet,
            updatedReciverWallet,
        };
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
const addMoney = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { agentNo, userNo, amount, pinNumber } = payload;
    const isUserExist = yield user_model_1.User.findOne({ phone: agentNo });
    const isReceiverExist = yield user_model_1.User.findOne({ phone: userNo });
    const isUsarWalletExist = yield wallet_model_1.Wallet.findOne({ walletNo: agentNo });
    const isReceiverWalletExist = yield wallet_model_1.Wallet.findOne({ walletNo: userNo });
    if (!isUserExist)
        throw new AppError_1.default(403, "User does not exist");
    if ((isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.role) !== user_interface_1.Role.USER)
        throw new AppError_1.default(403, "You are not User");
    if (!isReceiverExist)
        throw new AppError_1.default(403, "Agent does not exist");
    if ((isReceiverExist === null || isReceiverExist === void 0 ? void 0 : isReceiverExist.role) !== user_interface_1.Role.AGENT)
        throw new AppError_1.default(403, "Sender is not a agent");
    if (!(isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.accountStatus)) {
        throw new AppError_1.default(400, "User account status Not found");
    }
    if ([
        user_interface_1.status.BLOCKED,
        user_interface_1.status.CLOSED,
        user_interface_1.status.DELETED,
        user_interface_1.status.FROZEN,
        user_interface_1.status.PENDING,
        user_interface_1.status.SUSPEND,
    ].includes(isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.accountStatus)) {
        throw new AppError_1.default(403, "You are not permitted for this operation");
    }
    if (!isUsarWalletExist || !isReceiverWalletExist)
        throw new AppError_1.default(403, "Wallet not found");
    if (!(isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.pinNumber)) {
        throw new AppError_1.default(403, "Agent PIN not found. Please set your PIN first.");
    }
    const isPinNoMatch = yield bcryptjs_1.default.compare(pinNumber, isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.pinNumber);
    if (!isPinNoMatch)
        throw new AppError_1.default(403, "PIN Number does not match");
    if (((_a = isReceiverWalletExist.balance) !== null && _a !== void 0 ? _a : 0) < amount)
        throw new AppError_1.default(403, "You don't have enough balance");
    const session = yield wallet_model_1.Wallet.startSession();
    session.startTransaction();
    try {
        const newUserBalance = Number((_b = isUsarWalletExist.balance) !== null && _b !== void 0 ? _b : 0) + Number(amount);
        const newReceiverBalance = Number((_c = isReceiverWalletExist.balance) !== null && _c !== void 0 ? _c : 0) - Number(amount);
        const updatedUserWallet = yield wallet_model_1.Wallet.findOneAndUpdate({ walletNo: agentNo }, { balance: newUserBalance }, { new: true, runValidators: true, session });
        const updatedReciverWallet = yield wallet_model_1.Wallet.findOneAndUpdate({ walletNo: userNo }, { balance: newReceiverBalance }, { new: true, runValidators: true, session });
        if (!updatedUserWallet || !updatedReciverWallet)
            throw new AppError_1.default(401, "Wallet update failed");
        const trxData = {
            phoneFrom: agentNo,
            phoneTo: userNo,
            transactionId: (0, transaction_controller_1.getTXId)(),
            transactionType: transaction_interface_1.TX_Type.ADD_MONEY,
            amount,
            fee: 0,
            status: transaction_interface_1.TX_Status.COMPLETED,
            initiatorRole: user_interface_1.Role.USER,
        };
        const [transaction] = yield transaction_model_1.Transaction.create([trxData], { session });
        yield session.commitTransaction();
        session.endSession();
        return {
            message: "Money Added Successful",
            transaction,
            updatedUserWallet,
            updatedReciverWallet,
        };
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
const myTransaction = (walletNo) => __awaiter(void 0, void 0, void 0, function* () {
    const transactions = yield transaction_model_1.Transaction.find({
        $or: [{ phoneFrom: walletNo }, { phoneTo: walletNo }],
    })
        .sort({ createdAt: -1 })
        .lean();
    return transactions;
});
exports.UserWalletService = {
    sendMoney,
    withdrawMoney,
    addMoney,
    myTransaction,
};
