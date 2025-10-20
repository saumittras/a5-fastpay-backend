import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { AdminController } from "./adminAuth.controller";

const router = Router();

router.get(
  "/",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  AdminController.getAllUser
);

router.post(
  "/user-action",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  AdminController.userBlockUnblock
);

router.get(
  "/transactions",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  AdminController.getAllTransactions
);

router.post(
  "/agent-action",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  AdminController.approvedSuspendAgent
);

export const adminRoutes = router;
