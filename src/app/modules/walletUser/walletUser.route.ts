import { Router } from "express";
import { WalletUserService } from "./walletUser.service";

const router = Router();

router.post("/send-money", WalletUserService.sendMoney);

export const walletUserRoutes = router;
