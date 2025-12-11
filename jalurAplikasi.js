import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sensorRoutes from "./ruteSensor.js";
import "./mqtt.js";

dotenv.config();

const app = express();

app.use(cors({ origin: "*", methods: ["GET","POST","PUT","DELETE"], allowedHeaders: ["Content-Type","Authorization"] }));
app.use(express.json());

// routes
app.use("/api/sensors", sensorRoutes);

export default app;
