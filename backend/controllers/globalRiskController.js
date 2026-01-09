import { GLOBAL_LOCATIONS } from "../data/globalLocations.js";
import { get7DayForecast } from "../services/forecastService.js";
import { calculateDailyRiskScore } from "../services/riskModel.js";

export const simulateGlobalRisk = async (req, res) => {
  try {
    const results = [];

    for (const loc of GLOBAL_LOCATIONS) {
      const forecast = await get7DayForecast(loc.lat, loc.lon);

      let maxScore = 0;
      forecast.forEach((day) => {
        const score = calculateDailyRiskScore(day);
        if (score > maxScore) maxScore = score;
      });

      results.push({
        name: loc.name,
        lat: loc.lat,
        lon: loc.lon,
        score: maxScore,
      });
    }

    // Sort descending
    results.sort((a, b) => b.score - a.score);

    res.json({
      highRisk: results.slice(0, 10),
      mediumRisk: results.slice(10, 20),
      safeZones: results.slice(-10),
    });
  } catch (err) {
    res.status(500).json({ message: "Simulation failed" });
  }
};
