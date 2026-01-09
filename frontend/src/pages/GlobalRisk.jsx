import { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";

const GlobalRisk = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGlobalRisk();
  }, []);

  const fetchGlobalRisk = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/global-risk/simulate"
      );
      setData(res.data);
    } catch (err) {
      setError("Unable to load global risk simulation data");
    } finally {
      setLoading(false);
    }
  };

  const Card = ({ title, items, color }) => (
    <div className="bg-white rounded-xl shadow-lg p-5">
      <h2
        className={`text-xl font-bold mb-4 ${
          color === "red"
            ? "text-red-600"
            : color === "yellow"
            ? "text-yellow-600"
            : "text-green-600"
        }`}
      >
        {title}
      </h2>

      {items.length === 0 ? (
        <p className="text-gray-500 text-sm">No data available</p>
      ) : (
        <ul className="space-y-3">
          {items.map((loc, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
            >
              <span className="font-medium text-gray-800">
                {index + 1}. {loc.name}
              </span>
              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  color === "red"
                    ? "bg-red-100 text-red-700"
                    : color === "yellow"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                Risk Score: {loc.score}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-6 pt-20">
        <div className="max-w-6xl mx-auto">
          {/* PAGE HEADER */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              🌍 Global Weather Risk Simulation
            </h1>
            <p className="text-gray-600 mt-2">
              AI-driven simulation highlighting potential high-risk and safe
              regions worldwide based on 7-day forecast analysis.
            </p>
          </div>

          {/* STATUS */}
          {loading && (
            <p className="text-gray-500 text-center">
              Running global risk simulation...
            </p>
          )}

          {error && (
            <p className="text-red-600 text-center font-medium">{error}</p>
          )}

          {/* DATA */}
          {data && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card
                title="🔴 Top 10 High Risk Zones"
                items={data.highRisk || []}
                color="red"
              />
              <Card
                title="🟡 Moderate Risk Zones"
                items={data.mediumRisk || []}
                color="yellow"
              />
              <Card
                title="🟢 Safest Zones"
                items={data.safeZones || []}
                color="green"
              />
            </div>
          )}

          {/* DISCLAIMER */}
          <div className="mt-10 bg-white p-4 rounded-lg shadow text-sm text-gray-600">
            <strong>Disclaimer:</strong> This is a simulated global risk
            assessment based on sampled locations and forecast data. It is
            intended for awareness and demonstration purposes, not as an
            official warning system.
          </div>
        </div>
      </div>
    </>
  );
};

export default GlobalRisk;
