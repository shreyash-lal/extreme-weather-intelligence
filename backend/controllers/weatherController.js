import { getWeatherData } from "../services/weatherService.js";
import { calculateRisk } from "../services/riskEngine.js";

// GET /api/weather?lat=..&lon=..
const getWeatherAndRisk = async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({
        message: "Latitude and longitude required",
      });
    }

    // 1️⃣ Weather data fetch
    const weather = await getWeatherData(lat, lon);

    // 2️⃣ Risk calculation
    const risk = calculateRisk(weather);

    // 3️⃣ Response
    res.json({
      location: { lat, lon },
      weather,
      risk,
    });
  } catch (error) {
    res.status(500).json({
      message: "Weather processing failed",
      error: error.message,
    });
  }
};

export { getWeatherAndRisk };
