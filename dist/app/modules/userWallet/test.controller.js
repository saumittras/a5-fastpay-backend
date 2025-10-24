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
exports.TestController = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const test_service_1 = require("./test.service");
const sendMoney = (0, catchAsync_1.catchAsync)(
// eslint-disable-next-line @typescript-eslint/no-unused-vars
(req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield test_service_1.UserWalletService.sendMoney(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: `Money sent Successfully Completed`,
        data: result,
    });
}));
const withdrawMoney = (0, catchAsync_1.catchAsync)(
// eslint-disable-next-line @typescript-eslint/no-unused-vars
(req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield test_service_1.UserWalletService.withdrawMoney(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: `Withdraw Money Successfully Completed`,
        data: result,
    });
}));
const addMoney = (0, catchAsync_1.catchAsync)(
// eslint-disable-next-line @typescript-eslint/no-unused-vars
(req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield test_service_1.UserWalletService.addMoney(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: `Add Money Successfully Completed`,
        data: result,
    });
}));
const myTransaction = (0, catchAsync_1.catchAsync)(
// eslint-disable-next-line @typescript-eslint/no-unused-vars
(req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield test_service_1.UserWalletService.myTransaction(req.body.walletNo);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: `All User Transaction reterived Completed`,
        data: result,
    });
}));
exports.TestController = {
    sendMoney,
    withdrawMoney,
    addMoney,
    myTransaction,
};
