import { get7DayForecast } from "../services/forecastService.js";
import {
  calculateDailyRiskScore,
  classifyRisk,
} from "../services/riskModel.js";
import Alert from "../models/Alert.js";

export const get7DayRiskForecast = async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({
        message: "Latitude & longitude required",
      });
    }

    /* =========================
       1️⃣ FETCH FORECAST DATA
       ========================= */
    const forecast = await get7DayForecast(lat, lon);

    /* =========================
       2️⃣ DAILY RISK CALCULATION
       ========================= */
    const dailyRisk = forecast.map((day, index) => {
      const score = calculateDailyRiskScore(day);
      const risk = classifyRisk(score);

      return {
        day: `Day ${index + 1}`,
        score,
        risk,
      };
    });

    /* =========================
       3️⃣ OVERALL ZONE RISK
       ========================= */
    const overallRisk = dailyRisk.some((d) => d.risk === "HIGH")
      ? "HIGH"
      : dailyRisk.some((d) => d.risk === "MEDIUM")
      ? "MEDIUM"
      : "LOW";

    /* =========================
       4️⃣ ALERT TYPE & MESSAGE
       ========================= */
    let alertType = "Advisory";
    let message = "Weather conditions are expected to remain stable.";

    if (overallRisk === "MEDIUM") {
      alertType = "Watch";
      message =
        "Moderate weather risk expected in the coming days. Stay prepared and monitor updates.";
    }

    if (overallRisk === "HIGH") {
      alertType = "Warning";
      message =
        "High weather risk predicted in the coming days. Immediate preparedness is advised.";
    }

    /* =========================
       5️⃣ PREVENT ALERT SPAM
       ========================= */
    const recentAlert = await Alert.findOne({
      "location.lat": lat,
      "location.lng": lon,
      riskLevel: overallRisk,
    }).sort({ createdAt: -1 });

    if (!recentAlert) {
      await Alert.create({
        type: alertType,
        location: {
          name: "Forecast Zone",
          lat,
          lng: lon,
        },
        riskLevel: overallRisk,
        message,
      });
    }

    /* =========================
       6️⃣ RESPONSE TO FRONTEND
       ========================= */
    res.json({
      location: { lat, lon },
      overallRisk,
      alertType,
      dailyRisk,
    });
  } catch (error) {
    res.status(500).json({
      message: "7-day forecast failed",
      error: error.message,
    });
  }
};
