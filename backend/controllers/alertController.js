import Alert from "../models/Alert.js";
import { getWeatherData } from "../services/weatherService.js";
import { calculateRisk } from "../services/riskEngine.js";
import { sendAlertEmail } from "../services/emailService.js";

// POST /api/alerts
const createAlert = async (req, res) => {
  try {
    const { type, location, userEmail } = req.body;
    // location = { name, lat, lng }

    if (!type || !location) {
      return res.status(400).json({ message: "Missing data" });
    }

    // 1️⃣ Weather fetch
    const weather = await getWeatherData(location.lat, location.lng);

    // 2️⃣ Risk calculate
    const risk = calculateRisk(weather);

    // 3️⃣ Alert message
    const message = `${type} alert for ${location.name}. Risk level: ${risk}`;

    // 4️⃣ Save to DB
    const alert = await Alert.create({
      type,
      location,
      riskLevel: risk,
      message,
    });

    // 5️⃣ Send Email (OPTIONAL but powerful)
    if (userEmail) {
      await sendAlertEmail("shiprakarn2@gmail.com", alert);
    }

    // 6️⃣ Response
    res.status(201).json({
      message: "Alert created successfully",
      alert,
      console: "Alert process completed",
    });
  } catch (error) {
    res.status(500).json({
      message: "Alert creation failed",
      error: error.message,
    });
  }
};

// GET /api/alerts
const getAllAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ createdAt: -1 });
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch alerts" });
  }
};

export { createAlert, getAllAlerts };
