"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envVars = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const loadEnvVariables = () => {
    const requiredEnvVariables = [
        "PORT",
        "MONGO_DB",
        "NODE_ENV",
        "JWT_ACCESS_SECRET",
        "JWT_ACCESS_EXPIRE",
        "JWT_REFRESH_SECRET",
        "JWT_REFRESH_EXPIRE",
        "BCRYPT_SALT_ROUND",
        "SUPER_ADMIN_PHONE",
        "SUPER_ADMIN_PASSWORD",
        "SUPER_ADMIN_PIN",
    ];
    requiredEnvVariables.forEach((key) => {
        if (!process.env[key]) {
            throw new Error(`Missing required environment variable ${key}`);
        }
    });
    return {
        PORT: process.env.PORT,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        MONGO_DB: process.env.MONGO_DB,
        NODE_ENV: process.env.NODE_ENV,
        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
        JWT_ACCESS_EXPIRE: process.env.JWT_ACCESS_EXPIRE,
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
        JWT_REFRESH_EXPIRE: process.env.JWT_REFRESH_EXPIRE,
        BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND,
        SUPER_ADMIN_PHONE: process.env.SUPER_ADMIN_PHONE,
        SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD,
        SUPER_ADMIN_PIN: process.env.SUPER_ADMIN_PIN,
    };
};
exports.envVars = loadEnvVariables();
