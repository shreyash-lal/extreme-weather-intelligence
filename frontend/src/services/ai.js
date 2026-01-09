export async function getAIInsight({ risk, weather, location }) {
  const prompt = `
You are an AI disaster management assistant.

Location: ${location}
Risk Level: ${risk}

Weather Data:
Temperature: ${weather.temperature}°C
Rainfall: ${weather.rainfall} mm
Humidity: ${weather.humidity}%
Wind Speed: ${weather.windSpeed} km/h

Explain the situation simply and give safety precautions.
`;

  const response = await window.puter.ai.chat(prompt, {
    model: "gemini-3-flash-preview",
  });

  return response?.message?.content || "No AI response";
}
