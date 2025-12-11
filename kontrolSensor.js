import SensorData from "./modelSensor.js";
import { Op, fn, col } from "sequelize";

// Ambil semua data
export const getAllData = async (req, res) => {
  try {
    const { limit = 200, device, sensor } = req.query;
    let whereClause = {};
    if (device) whereClause.device = device;
    if (sensor) whereClause.sensor = sensor;

    const data = await SensorData.findAll({
      where: whereClause,
      order: [["timestamp", "DESC"]],
      limit: parseInt(limit),
    });

    res.json({
      success: true,
      count: data.length,
      data,
    });
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Ambil data terakhir
export const getLatestData = async (req, res) => {
  try {
    const data = await SensorData.findOne({
      order: [["timestamp", "DESC"]],
    });

    res.json({ success: true, data: data || null });
  } catch (err) {
    console.error("Error fetching latest data:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Ambil data berdasarkan range waktu
export const getDataByTimeRange = async (req, res) => {
  try {
    const { start, end, limit = 100 } = req.query;
    let whereClause = {};
    if (start && end) {
      whereClause.timestamp = { [Op.between]: [parseInt(start), parseInt(end)] };
    }

    const data = await SensorData.findAll({
      where: whereClause,
      order: [["timestamp", "DESC"]],
      limit: parseInt(limit),
    });

    res.json({ success: true, count: data.length, data });
  } catch (err) {
    console.error("Error fetching time range data:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Ambil daftar device
export const getDevices = async (req, res) => {
  try {
    const devices = await SensorData.findAll({
      attributes: [[fn("DISTINCT", col("device")), "device"]],
      order: [["device", "ASC"]],
    });

    res.json({ success: true, devices: devices.map((d) => d.device) });
  } catch (err) {
    console.error("Error fetching devices:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};
