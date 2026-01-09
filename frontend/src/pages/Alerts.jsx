import { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/alerts");
      setAlerts(res.data);
    } catch (err) {
      console.error("Failed to load alerts");
    } finally {
      setLoading(false);
    }
  };

  const timeAgo = (date) => {
    const diff = Math.floor((Date.now() - new Date(date)) / 1000);
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hrs ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  };

  const riskColor = (risk) => {
    if (risk === "HIGH") return "border-red-500 bg-red-50";
    if (risk === "MEDIUM") return "border-yellow-500 bg-yellow-50";
    return "border-green-500 bg-green-50";
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50 p-6 pt-20">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          ⚠️ Active Alerts
        </h1>

        {loading && <p>Loading alerts...</p>}

        {!loading && alerts.length === 0 && (
          <p className="text-gray-500">No alerts generated yet.</p>
        )}

        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert._id}
              className={`border-l-4 p-4 rounded-lg shadow-sm ${riskColor(
                alert.riskLevel
              )}`}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">{alert.type} Alert</h3>
                <span className="text-xs text-gray-500">
                  {timeAgo(alert.createdAt)}
                </span>
              </div>

              <p className="text-sm text-gray-700 mt-1">
                📍 {alert.location?.name || "Unknown location"}
              </p>

              <p className="text-sm mt-2">{alert.message}</p>

              <span className="inline-block mt-2 text-xs font-semibold">
                Risk Level: <span className="uppercase">{alert.riskLevel}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Alerts;
