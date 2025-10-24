"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const admin_route_1 = require("../modules/admin/admin.route");
const agent_route_1 = require("../modules/agent/agent.route");
const auth_route_1 = require("../modules/auth/auth.route");
// import { testRoute } from "../modules/userWallet/test.route";
const transaction_route_1 = require("../modules/transaction/transaction.route");
const user_route_1 = require("../modules/user/user.route");
const test_route_1 = require("../modules/userWallet/test.route");
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
        path: "/test",
        route: test_route_1.testRoute,
    },
    {
        path: "/agent-wallet",
        route: agent_route_1.agentRoutes,
    },
];
moduleRoutes.forEach((route) => {
    exports.router.use(route.path, route.route);
});
