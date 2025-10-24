import { Router } from "express";
import { adminRoutes } from "../modules/admin/admin.route";
import { agentRoutes } from "../modules/agent/agent.route";
import { AuthRoutes } from "../modules/auth/auth.route";
// import { testRoute } from "../modules/userWallet/test.route";
import { TransactionRoutes } from "../modules/transaction/transaction.route";
import { UserRoutes } from "../modules/user/user.route";
import { testRoute } from "../modules/userWallet/test.route";

export const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/transaction",
    route: TransactionRoutes,
  },
  {
    path: "/admin",
    route: adminRoutes,
  },
  {
    path: "/test",
    route: testRoute,
  },
  {
    path: "/agent-wallet",
    route: agentRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
