"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const mongoose_1 = require("mongoose");
const user_interface_1 = require("../user/user.interface");
const transaction_interface_1 = require("./transaction.interface");
const transactionSchema = new mongoose_1.Schema({
    from: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    phoneFrom: {
        type: String,
        required: true,
    },
    to: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    phoneTo: {
        type: String,
        required: true,
    },
    transactionId: {
        type: String,
        required: true,
    },
    transactionType: {
        type: String,
        enum: Object.values(transaction_interface_1.TX_Type),
        default: transaction_interface_1.TX_Type.SEND_MONEY,
    },
    amount: {
        type: Number,
        required: true,
    },
    fee: {
        type: Number,
        default: 0,
    },
    commission: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: Object.values(transaction_interface_1.TX_Status),
        default: transaction_interface_1.TX_Status.COMPLETED,
    },
    initiatorRole: {
        type: String,
        enum: Object.values(user_interface_1.Role),
        default: user_interface_1.Role.USER,
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.Transaction = (0, mongoose_1.model)("Transaction", transactionSchema);
