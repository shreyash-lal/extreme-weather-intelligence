import thresholds from "../utils/thresholds.js";

const calculateRisk = (weather) => {
  let risk = "LOW";

  if (
    weather.rainfall > thresholds.FLOOD.HIGH ||
    weather.windSpeed > thresholds.CYCLONE.HIGH
  ) {
    risk = "HIGH";
  } else if (
    weather.rainfall > thresholds.FLOOD.MEDIUM ||
    weather.windSpeed > thresholds.CYCLONE.MEDIUM
  ) {
    risk = "MEDIUM";
  }

  return risk;
};

export { calculateRisk };
