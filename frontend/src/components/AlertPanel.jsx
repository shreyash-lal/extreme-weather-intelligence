import { useEffect, useState } from "react";
import { getAIInsight } from "../services/ai";

const AlertPanel = ({ alert }) => {
  const [aiText, setAiText] = useState("");

  useEffect(() => {
    if (!alert) return;

    setAiText("Loading AI insights...");

    getAIInsight(alert).then((res) => {
      setAiText(res);
    });
  }, [alert]);

  if (!alert) {
    return <div>Select a marker to see details</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>{alert.type} Alert</h2>
      <p>
        <b>Location:</b> {alert.location.name}
      </p>
      <p>
        <b>Risk:</b> {alert.riskLevel}
      </p>
      <hr />
      <h3>AI Insights</h3>
      <pre>{aiText}</pre>
    </div>
  );
};

export default AlertPanel;
