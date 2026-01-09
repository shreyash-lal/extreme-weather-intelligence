const getAIInsight = async (req, res) => {
  try {
    const { risk, location } = req.body;

    res.json({
      note: "AI powered insights are generated on frontend using Gemini",
      fallbackMessage:
        risk === "HIGH"
          ? "Severe risk detected. Follow evacuation protocols."
          : "Monitor weather updates regularly.",
    });
  } catch (error) {
    res.status(500).json({ message: "AI fallback failed" });
  }
};

export { getAIInsight };
