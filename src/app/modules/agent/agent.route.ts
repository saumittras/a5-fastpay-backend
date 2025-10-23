import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { AgentController } from "./agent.controller";

const router = Router();

router.post("/cash-in", checkAuth(Role.AGENT), AgentController.cashIn);
router.post("/cash-out", checkAuth(Role.AGENT), AgentController.cashOut);

export const agentRoutes = router;
