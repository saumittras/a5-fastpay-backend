"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
const mongoose_1 = require("mongoose");
const wallet_interface_1 = require("./wallet.interface");
const walletSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    walletNo: {
        type: Number,
        unique: true,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
        default: 50,
    },
    walletType: {
        type: String,
        enum: Object.values(wallet_interface_1.WalletType),
        default: wallet_interface_1.WalletType.USER,
    },
    walletStatus: {
        type: String,
        enum: Object.values(wallet_interface_1.WalletStatus),
        default: wallet_interface_1.WalletStatus.UNVERIFIED,
    },
    blockedReason: {
        type: String,
    },
    isNIDVerified: {
        type: Boolean,
        default: false,
    },
});
exports.Wallet = (0, mongoose_1.model)("Wallet", walletSchema);
