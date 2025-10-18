import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { TransactionControllers } from "./transaction.controller";

const router = Router();

router.post(
  "/send-money",
  checkAuth(...Object.values(Role)),
  TransactionControllers.sendMoney
);

export const TransactionRoutes = router;
