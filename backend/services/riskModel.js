export const calculateDailyRiskScore = (data) => {
  const rainfall = data.rain?.["3h"] || 0; // mm
  const windSpeed = (data.wind?.speed || 0) * 3.6; // m/s → km/h
  const humidity = data.main?.humidity || 0; // %
  const temperature = data.main?.temp || 0; // °C

  const score =
    0.4 * rainfall + 0.25 * windSpeed + 0.2 * humidity + 0.15 * temperature;

  return Math.round(score);
};

export const classifyRisk = (score) => {
  if (score >= 80) return "HIGH";
  if (score >= 50) return "MEDIUM";
  return "LOW";
};
