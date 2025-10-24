"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userWalletRoutes = void 0;
const express_1 = require("express");
const userWallet_service_1 = require("./userWallet.service");
const router = (0, express_1.Router)();
router.post("/send-money", userWallet_service_1.UserWalletService.sendMoney);
router.post("/add-money", userWallet_service_1.UserWalletService.addMoney);
exports.userWalletRoutes = router;
