import express from "express";
import { getWeatherAndRisk } from "../controllers/weatherController.js";

const router = express.Router();

router.get("/", getWeatherAndRisk);

export default router;
