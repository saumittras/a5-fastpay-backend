"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserZodSchema = exports.createUserZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const user_interface_1 = require("./user.interface");
exports.createUserZodSchema = zod_1.default.object({
    _id: zod_1.default.string().optional(),
    name: zod_1.default
        .string({ invalid_type_error: "Name must be string" })
        .min(2, { message: "Name too short" })
        .max(50, { message: "Name too long" }),
    phone: zod_1.default
        .string({ invalid_type_error: "Address must be String" })
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
        message: "Phone number must be valid for Bangladesh, Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    }),
    password: zod_1.default
        .string()
        .min(8)
        .regex(/^(?=.*[A-Z])/, {
        message: "Password must contain at least 1 uppercase letter",
    })
        .regex(/^(?=.*[!@#$%^&*])/, {
        message: "Password must contain at least 1 special character.",
    })
        .regex(/^(?=.*\d)/, {
        message: "Password must contain at least 1 number",
    }),
    pinNumber: zod_1.default
        .number({ invalid_type_error: "Name must be string" })
        .min(4, { message: "Pin Number Must be 6 Digit" })
        .max(4, { message: "Pin Number Must be 6 Digit" }),
    picture: zod_1.default.string().optional(),
    address: zod_1.default
        .string({ invalid_type_error: "Address must be string" })
        .max(200, { message: "Address can notexceed 200 characters" })
        .optional(),
    accountStatus: zod_1.default.enum(Object.values(user_interface_1.status)),
    agentRequest: zod_1.default.boolean().optional(),
    role: zod_1.default.enum(Object.values(user_interface_1.Role)),
    createdBy: zod_1.default.enum(Object.values(user_interface_1.Role)),
});
exports.UpdateUserZodSchema = zod_1.default.object({
    _id: zod_1.default.string().optional(),
    name: zod_1.default
        .string({ invalid_type_error: "Name must be string" })
        .min(2, { message: "Name too short" })
        .max(50, { message: "Name too long" })
        .optional(),
    phone: zod_1.default
        .string({ invalid_type_error: "Address must be String" })
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
        message: "Phone number must be valid for Bangladesh, Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    })
        .optional(),
    password: zod_1.default
        .string()
        .min(8)
        .regex(/^(?=.*[A-Z])/, {
        message: "Password must contain at least 1 uppercase letter",
    })
        .regex(/^(?=.*[!@#$%^&*])/, {
        message: "Password must contain at least 1 special character.",
    })
        .regex(/^(?=.*\d)/, {
        message: "Password must contain at least 1 number",
    })
        .optional(),
    pinNumber: zod_1.default
        .string({ invalid_type_error: "Name must be string" })
        .min(4, { message: "Pin Number Must be 4 Digit" })
        .max(4, { message: "Pin Number Must be 4 Digit" })
        .optional(),
    picture: zod_1.default.string().optional(),
    address: zod_1.default
        .string({ invalid_type_error: "Address must be string" })
        .max(200, { message: "Address can not exceed 200 characters" })
        .optional(),
    accountStatus: zod_1.default.enum(Object.values(user_interface_1.status)).optional(),
    agentRequest: zod_1.default.boolean().optional().optional(),
    role: zod_1.default.enum(Object.values(user_interface_1.Role)).optional(),
    createdBy: zod_1.default.enum(Object.values(user_interface_1.Role)).optional(),
});
