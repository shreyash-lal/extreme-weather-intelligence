import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const getWeatherData = async (lat, lon) => {
  const apiKey = process.env.WEATHER_API_KEY;

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  const res = await axios.get(url);

  return {
    rainfall: res.data.rain?.["1h"] || 0,
    windSpeed: res.data.wind.speed * 3.6, // m/s → km/h
    temperature: res.data.main.temp,
  };
};

export { getWeatherData };
