"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWalletZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const wallet_interface_1 = require("./wallet.interface");
exports.createWalletZodSchema = zod_1.default.object({
    _id: zod_1.default.string().optional(),
    userId: zod_1.default.string(),
    walletNo: zod_1.default
        .string({ invalid_type_error: "Address must be String" })
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
        message: "Phone number must be valid for Bangladesh, Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    }),
    pinNumber: zod_1.default
        .number({ invalid_type_error: "Name must be string" })
        .min(4, { message: "Pin Number Must be 6 Digit" })
        .max(4, { message: "Pin Number Must be 6 Digit" }),
    balance: zod_1.default.number(),
    walletType: zod_1.default.enum(Object.values(wallet_interface_1.WalletType)),
    walletStatus: zod_1.default
        .enum(Object.values(wallet_interface_1.WalletStatus))
        .default(wallet_interface_1.WalletType.USER),
    blockedReason: zod_1.default.string().optional(),
    isNIDVerified: zod_1.default.boolean(),
});
