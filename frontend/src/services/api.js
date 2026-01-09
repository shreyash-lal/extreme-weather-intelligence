import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getWeather = (lat, lon) =>
  API.get(`/weather?lat=${lat}&lon=${lon}`);

export const getForecastRisk = (lat, lon) =>
  API.get(`/forecast?lat=${lat}&lon=${lon}`);

export const getAlerts = () => API.get("/alerts");
