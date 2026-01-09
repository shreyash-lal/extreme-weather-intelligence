import express from "express";
import { createAlert, getAllAlerts } from "../controllers/alertController.js";

const router = express.Router();

// Create new alert
router.post("/", createAlert);

// Get all alerts
router.get("/", getAllAlerts);

export default router;
