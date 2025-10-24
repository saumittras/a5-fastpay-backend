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
exports.userWalletController = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const userWallet_service_1 = require("./userWallet.service");
const sendMoney = (0, catchAsync_1.catchAsync)(
// eslint-disable-next-line @typescript-eslint/no-unused-vars
(req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userWallet_service_1.UserWalletService.sendMoney(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: `Cash In Successfully Completed`,
        data: result,
    });
}));
// const addMoney = catchAsync(
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   async (req: Request, res: Response, _next: NextFunction) => {
//     const result = await AgentService.cashOut(req.body);
//     sendResponse(res, {
//       success: true,
//       statusCode: httpStatus.CREATED,
//       message: "Cash Out Successfully Completed",
//       data: result,
//     });
//   }
// );
exports.userWalletController = {
    sendMoney,
    // addMoney,
};
