// ruteSensor.js
import express from "express";
import { 
  getAllData, 
  getLatestData, 
  getDataByTimeRange,
  getDevices 
} from "./kontrolSensor.js";

const router = express.Router();

router.get("/", getAllData);
router.get("/latest", getLatestData);
router.get("/range", getDataByTimeRange);
router.get("/devices", getDevices);

export default router;