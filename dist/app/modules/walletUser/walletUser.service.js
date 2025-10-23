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
exports.WalletUserService = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const transaction_controller_1 = require("../transaction/transaction.controller");
const transaction_interface_1 = require("../transaction/transaction.interface");
const transaction_model_1 = require("../transaction/transaction.model");
const user_interface_1 = require("../user/user.interface");
const user_model_1 = require("../user/user.model");
const sendMoney = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const phone = payload === null || payload === void 0 ? void 0 : payload.phoneTo;
    const isUserExist = yield user_model_1.User.findOne({ phone: phone });
    console.log("phone", phone, "IsExist", isUserExist);
    if (!isUserExist) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "User does not exist");
    }
    const trxData = {
        from: user.userId,
        phoneFrom: user.phone,
        to: isUserExist._id,
        phoneTo: isUserExist.phone,
        transactionId: (0, transaction_controller_1.getTXId)(),
        transactionType: transaction_interface_1.TX_Type.SEND_MONEY,
        amount: payload === null || payload === void 0 ? void 0 : payload.amount,
        status: transaction_interface_1.TX_Status.COMPLETED,
        initiatorRole: user_interface_1.Role.USER,
    };
    const transaction = yield transaction_model_1.Transaction.create(trxData);
    return transaction;
    // const {to, amount} = payload
});
exports.WalletUserService = {
    sendMoney,
};
