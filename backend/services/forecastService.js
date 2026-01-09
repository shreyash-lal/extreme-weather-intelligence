import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const get7DayForecast = async (lat, lon) => {
  const apiKey = process.env.WEATHER_API_KEY;

  const res = await axios.get(
    "https://api.openweathermap.org/data/2.5/forecast",
    {
      params: {
        lat,
        lon,
        units: "metric",
        appid: apiKey,
      },
    }
  );

  // Every 8th entry ≈ once per day
  const dailyData = res.data.list.filter((_, i) => i % 8 === 0);

  return dailyData.slice(0, 5); // 5-day forecast
};
