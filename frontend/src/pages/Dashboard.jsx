import { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import MapView from "../components/MapView";
import AIInsightPanel from "../components/AIInsightPanel";
import { getWeather, getForecastRisk } from "../services/api";
import { getAIInsight } from "../services/ai";
import { AnimatePresence } from "framer-motion";
import AIChatbot from "../components/AIChatbot";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6 },
  }),
};

const Dashboard = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [aiInsight, setAiInsight] = useState(null);
  const [riskZone, setRiskZone] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);

  /* LOCATION */
  const detectLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserLocation([pos.coords.longitude, pos.coords.latitude]),
      () => alert("Fetching Location..."),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  /* MAP CLICK */
  const handleMapClick = async (lat, lon) => {
    try {
      setShowAI(false);
      setAiInsight(null);

      setTimeout(async () => {
        setShowAI(true);
        setLoadingAI(true);
        setAiInsight("Analyzing live weather conditions...");

        const weatherRes = await getWeather(lat, lon);
        const { weather, risk } = weatherRes.data;

        const aiText = await getAIInsight({
          risk,
          weather,
          location: "Selected Location",
        });

        setAiInsight(aiText);
        setLoadingAI(false);
      }, 80);
    } catch {
      setAiInsight("Unable to fetch AI insight");
      setLoadingAI(false);
    }
  };

  /* FORECAST */
  const handleForecastClick = async () => {
    if (!userLocation) return alert("Detect location first");

    setShowAI(false);
    setAiInsight(null);

    setTimeout(async () => {
      try {
        setShowAI(true);
        const [lng, lat] = userLocation;

        // 1️⃣ Forecast risk
        const res = await getForecastRisk(lat, lng);
        setRiskZone(res.data);

        // 2️⃣ AI explanation
        const aiText = await getAIInsight({
          risk: res.data.overallRisk,
          weather: {
            temperature: "Forecast-based",
            rainfall: "Multi-day data",
            windSpeed: "Forecast",
            humidity: "Forecast",
          },
          location: "Your Area (7-day forecast)",
        });

        setAiInsight(aiText);

        // 3️⃣ CREATE ALERT + SEND EMAIL (HARDCODED EMAIL 🔥)
        await fetch(
          "https://extreme-weather-intelligence.onrender.com/api/alerts",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              type: "7-Day Weather Forecast",
              location: {
                name: "User Location",
                lat,
                lng,
              },
              userEmail: "shreyashlal@gmail.com", // 🔥 FIXED EMAIL HERE
            }),
          }
        );

        console.log("Alert stored & email sent");
      } catch (err) {
        console.error(err);
        alert("Failed to generate forecast alert");
      }
    }, 80);
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        <motion.div
          initial="hidden"
          animate="visible"
          className="p-6 max-w-7xl mx-auto"
        >
          {/* HERO */}
          <motion.div variants={fadeUp} className="mt-20 mb-10">
            <h1 className="text-4xl font-google-sans-regular font-extrabold text-gray-800">
              Extreme Weather Intelligence
            </h1>
            <p className="text-gray-600 mt-2 max-w-2xl font-google-sans-regular">
              AI-driven insights, live risk mapping, and predictive alerts to
              help you stay safe from extreme weather conditions.
            </p>
          </motion.div>

          {/* ACTION CARDS */}
          <div className="grid sm:grid-cols-2 gap-6 mb-10 font-google-sans-regular">
            <motion.div
              variants={fadeUp}
              custom={1}
              whileHover={{ scale: 1.04 }}
              className="bg-white rounded-xl shadow-lg p-5 border-l-4 border-green-600"
            >
              <h3 className="font-semibold text-lg mb-2 font-google-sans-regular">
                Live Location Detection
              </h3>
              <p className="text-sm text-gray-600 mb-3 font-google-sans-regular">
                Detect your real-time location and analyze local weather risks
                instantly.
              </p>
              <button
                onClick={detectLocation}
                className="px-4 py-2 bg-green-600 text-white rounded-md"
              >
                Detect My Location
              </button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={2}
              whileHover={{ scale: 1.04 }}
              className="bg-white rounded-xl shadow-lg p-5 border-l-4 border-red-600"
            >
              <h3 className="font-semibold text-lg mb-2 font-google-sans-regular">
                7-Day Risk Forecast
              </h3>
              <p className="text-sm text-gray-600 mb-3 font-google-sans-regular">
                Predict upcoming extreme weather threats using AI-powered
                forecasting models.
              </p>
              <button
                onClick={handleForecastClick}
                className="px-4 py-2 bg-red-600 text-white rounded-md font-google-sans-regular"
              >
                Generate Forecast
              </button>
            </motion.div>
          </div>

          {/* MAP */}
          <motion.div variants={fadeUp} custom={4}>
            <MapView
              userLocation={userLocation}
              onMapClick={handleMapClick}
              alerts={[]}
              riskZone={riskZone}
            />
          </motion.div>
        </motion.div>

        {/* AI PANEL */}
        <AIInsightPanel
          insight={aiInsight}
          loading={loadingAI}
          show={showAI}
          onClose={() => setShowAI(false)}
        />
        <AnimatePresence>
          {!showChatbot && (
            <motion.button
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
              onClick={() => setShowChatbot(true)}
              className="
        fixed bottom-6 left-6 z-40
        bg-green-600 text-white
        px-5 py-3 rounded-full shadow-xl
        hover:bg-green-700 transition
      "
            >
              Chat with Nova Weather Assistant🌞
            </motion.button>
          )}
        </AnimatePresence>

        <AIChatbot show={showChatbot} onClose={() => setShowChatbot(false)} />
      </div>
    </>
  );
};

export default Dashboard;
