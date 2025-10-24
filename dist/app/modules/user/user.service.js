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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const env_1 = require("../../config/env");
const wallet_model_1 = require("../wallet/wallet.model");
const user_model_1 = require("./user.model");
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, phone, password, pinNumber } = payload, rest = __rest(payload, ["name", "phone", "password", "pinNumber"]);
    const isUserExist = yield user_model_1.User.findOne({ phone: phone });
    if (isUserExist) {
        throw new Error("User Already Exist");
    }
    const hashPassword = yield bcryptjs_1.default.hash(password, Number(env_1.envVars.BCRYPT_SALT_ROUND));
    const hashPin = yield bcryptjs_1.default.hash(pinNumber === null || pinNumber === void 0 ? void 0 : pinNumber.toString(), Number(env_1.envVars.BCRYPT_SALT_ROUND));
    const user = yield user_model_1.User.create(Object.assign({ name: name, phone: phone, password: hashPassword, pinNumber: hashPin }, rest));
    if (user) {
        const walletData = {
            userId: user === null || user === void 0 ? void 0 : user._id,
            walletNo: user === null || user === void 0 ? void 0 : user.phone,
            pinNumber: hashPin,
            walletType: user === null || user === void 0 ? void 0 : user.role,
            walletStatus: user === null || user === void 0 ? void 0 : user.accountStatus,
        };
        yield wallet_model_1.Wallet.create(walletData);
    }
    return user;
});
exports.UserServices = {
    createUser,
};
