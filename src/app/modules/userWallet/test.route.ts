import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { TestController } from "./test.controller";

const router = Router();

router.post("/send-money", checkAuth(Role.USER), TestController.sendMoney);
router.post(
  "/withdraw-Money",
  checkAuth(Role.USER),
  TestController.withdrawMoney
);
router.post("/add-Money", checkAuth(Role.USER), TestController.withdrawMoney);
router.get("/transactions", checkAuth(Role.USER), TestController.myTransaction);

export const testRoute = router;
