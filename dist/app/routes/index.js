"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const admin_route_1 = require("../modules/admin/admin.route");
const auth_route_1 = require("../modules/auth/auth.route");
const transaction_route_1 = require("../modules/transaction/transaction.route");
const user_route_1 = require("../modules/user/user.route");
const walletUser_route_1 = require("../modules/walletUser/walletUser.route");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/user",
        route: user_route_1.UserRoutes,
    },
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/transaction",
        route: transaction_route_1.TransactionRoutes,
    },
    {
        path: "/admin",
        route: admin_route_1.adminRoutes,
    },
    {
        path: "/user-wallet",
        route: walletUser_route_1.walletUserRoutes,
    },
];
moduleRoutes.forEach((route) => {
    exports.router.use(route.path, route.route);
});
