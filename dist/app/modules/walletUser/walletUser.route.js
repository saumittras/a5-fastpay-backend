"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletUserRoutes = void 0;
const express_1 = require("express");
const walletUser_service_1 = require("./walletUser.service");
const router = (0, express_1.Router)();
router.post("/send-money", walletUser_service_1.WalletUserService.sendMoney);
exports.walletUserRoutes = router;
