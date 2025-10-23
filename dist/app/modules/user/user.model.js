"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const user_interface_1 = require("./user.interface");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    phone: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    pinNumber: { type: String, required: true },
    picture: { type: String },
    address: { type: String },
    accountStatus: {
        type: String,
        enum: Object.values(user_interface_1.status),
        default: user_interface_1.status.ACTIVE,
    },
    agentRequest: { type: Boolean, default: false },
    role: {
        type: String,
        enum: Object.values(user_interface_1.Role),
        default: user_interface_1.Role.USER,
    },
    createdBy: { type: String, enum: Object.values(user_interface_1.Role), default: user_interface_1.Role.USER },
}, {
    timestamps: true,
    versionKey: false,
});
exports.User = (0, mongoose_1.model)("User", userSchema);
