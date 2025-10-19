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

export const adminRoutes = router;
