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
exports.AdminServices = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const transaction_model_1 = require("../transaction/transaction.model");
const user_interface_1 = require("../user/user.interface");
const user_model_1 = require("../user/user.model");
const wallet_model_1 = require("../wallet/wallet.model");
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const allUser = yield user_model_1.User.find({});
    return allUser;
});
const getAllWallet = () => __awaiter(void 0, void 0, void 0, function* () {
    const wallet = yield wallet_model_1.Wallet.find({});
    return wallet;
});
const getAllTransactions = () => __awaiter(void 0, void 0, void 0, function* () {
    const allTransactions = yield transaction_model_1.Transaction.find();
    return allTransactions;
});
const userBlockUnblock = (walletNo, action) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.User.findOne({ phone: walletNo });
    if (!isUserExist) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "User Not Found");
    }
    let userAction;
    if (action.toLowerCase() === "block") {
        userAction = user_interface_1.status.BLOCKED;
    }
    else if (action.toLowerCase() === "unblock") {
        userAction = user_interface_1.status.ACTIVE;
    }
    else {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Invalid action");
    }
    const payload = { accountStatus: userAction };
    const result = yield user_model_1.User.findByIdAndUpdate(isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.id, payload, {
        new: true,
    });
    return result;
});
const approvedSuspendAgent = (walletNo, action) => __awaiter(void 0, void 0, void 0, function* () {
    const isAgentExist = yield user_model_1.User.findOne({ phone: walletNo });
    if (!isAgentExist) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "User Not Found");
    }
    let agentAction;
    if (isAgentExist.accountStatus === user_interface_1.status.ACTIVE &&
        isAgentExist.role === user_interface_1.Role.USER) {
        if (action.toLowerCase() === "approve") {
            agentAction = user_interface_1.Role.AGENT;
            const result = yield user_model_1.User.findByIdAndUpdate(isAgentExist === null || isAgentExist === void 0 ? void 0 : isAgentExist.id, { role: agentAction }, { new: true });
            return result;
        }
    }
    if (isAgentExist.accountStatus === user_interface_1.status.ACTIVE &&
        isAgentExist.role === user_interface_1.Role.AGENT) {
        if (action.toLowerCase() === "suspend") {
            agentAction = user_interface_1.status.SUSPEND;
            const result = yield user_model_1.User.findByIdAndUpdate(isAgentExist === null || isAgentExist === void 0 ? void 0 : isAgentExist.id, { accountStatus: agentAction }, { new: true });
            return result;
        }
    }
    if (isAgentExist.accountStatus === user_interface_1.status.SUSPEND &&
        isAgentExist.role === user_interface_1.Role.AGENT) {
        if (action.toLowerCase() === "active") {
            agentAction = user_interface_1.status.ACTIVE;
            const result = yield user_model_1.User.findByIdAndUpdate(isAgentExist === null || isAgentExist === void 0 ? void 0 : isAgentExist.id, { accountStatus: agentAction }, { new: true });
            return result;
        }
    }
});
exports.AdminServices = {
    getAllUser,
    userBlockUnblock,
    getAllTransactions,
    approvedSuspendAgent,
    getAllWallet,
};
