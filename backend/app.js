import express from "express";
import cors from "cors";

import weatherRoutes from "./routes/weatherRoutes.js";
import alertRoutes from "./routes/alertRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import forecastRoutes from "./routes/forecastRoutes.js";
import globalRiskRoutes from "./routes/globalRiskRoutes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/weather", weatherRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/forecast", forecastRoutes);
app.use("/api/global-risk", globalRiskRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Extreme Weather Alert API is running");
});

export default app;
