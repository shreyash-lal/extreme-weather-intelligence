import express from "express";
import { get7DayRiskForecast } from "../controllers/forecastController.js";

const router = express.Router();

router.get("/", get7DayRiskForecast);

export default router;
