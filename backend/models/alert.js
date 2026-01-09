import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true, // Flood, Cyclone
  },
  location: {
    name: String,
    lat: Number,
    lng: Number,
  },
  riskLevel: {
    type: String, // LOW, MEDIUM, HIGH
    required: true,
  },
  message: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Alert = mongoose.models.Alert || mongoose.model("Alert", alertSchema);

export default Alert;
