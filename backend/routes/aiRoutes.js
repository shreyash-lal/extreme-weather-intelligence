import express from "express";
import { getAIInsight } from "../controllers/aiController.js";

const router = express.Router();

router.post("/", getAIInsight);

export default router;
