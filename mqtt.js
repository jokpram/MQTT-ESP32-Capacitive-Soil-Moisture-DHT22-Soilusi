// mqtt.js
import mqtt from "mqtt";
import dotenv from "dotenv";
import SensorData from "./modelSensor.js";

dotenv.config();

const mqttURL = `mqtt://${process.env.MQTT_BROKER}:${process.env.MQTT_PORT}`;

console.log(`Connecting to MQTT broker at ${mqttURL}`);

const client = mqtt.connect(mqttURL, {
  clientId: `nodejs_server_${Math.random().toString(16).slice(3)}`,
  clean: true,
  connectTimeout: 4000,
  reconnectPeriod: 1000,
});

client.on("connect", () => {
  console.log("✅ MQTT Connected successfully");

  // Subscribe ke semua topik ESP32
  client.subscribe("sensors/#", (err) => {
    if (err) {
      console.error("❌ MQTT Subscribe error:", err);
    } else {
      console.log("✅ Subscribed to sensors/#");
    }
  });

  // Subscribe ke topik lain yang mungkin digunakan
  client.subscribe("esp32/#", (err) => {
    if (!err) console.log("✅ Subscribed to esp32/#");
  });
});

client.on("message", async (topic, message) => {
  try {
    console.log(`📨 MQTT Message received on ${topic}:`, message.toString());
    
    const payload = JSON.parse(message.toString());
    
    // Validasi payload minimal
    if (!payload.timestamp) {
      payload.timestamp = Date.now();
    }

    // Simpan ke database
    const savedData = await SensorData.create({
      device: payload.device || "unknown",
      sensor: payload.sensor || "unknown",
      temperature: payload.temperature || null,
      humidity: payload.humidity || null,
      soil_percent: payload.soil_percent || null,
      raw: payload.raw || null,
      timestamp: payload.timestamp
    });

    console.log(`✅ Saved to DB: ${savedData.device} - ${savedData.sensor}`);
  } catch (err) {
    console.error("❌ Error processing MQTT message:", err.message);
    console.error("Raw message:", message.toString());
  }
});

client.on("error", (err) => {
  console.error("❌ MQTT Client error:", err);
});

client.on("close", () => {
  console.log("⚠️ MQTT Connection closed");
});

client.on("reconnect", () => {
  console.log("🔄 MQTT Reconnecting...");
});

export default client;