import axios from "axios";

const API = axios.create({
  baseURL: "https://extreme-weather-intelligence.onrender.com/api",
});

export const getWeather = (lat, lon) =>
  API.get(`/weather?lat=${lat}&lon=${lon}`);

export const getForecastRisk = (lat, lon) =>
  API.get(`/forecast?lat=${lat}&lon=${lon}`);

export const getAlerts = () => API.get("/alerts");
