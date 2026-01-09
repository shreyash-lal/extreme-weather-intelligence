import express from "express";
import { simulateGlobalRisk } from "../controllers/globalRiskController.js";

const router = express.Router();
router.get("/simulate", simulateGlobalRisk);

export default router;
