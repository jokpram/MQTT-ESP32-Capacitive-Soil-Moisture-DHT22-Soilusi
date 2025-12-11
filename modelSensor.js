// modelSensor.js
import { DataTypes } from "sequelize";
import sequelize from "./konfigurasiDatabase.js";

const SensorData = sequelize.define(
  "SensorData",
  {
    device: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "unknown"
    },
    sensor: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "unknown"
    },
    temperature: {
      type: DataTypes.FLOAT,
      validate: {
        min: -50,
        max: 100
      }
    },
    humidity: {
      type: DataTypes.FLOAT,
      validate: {
        min: 0,
        max: 100
      }
    },
    soil_percent: {
      type: DataTypes.FLOAT,
      validate: {
        min: 0,
        max: 100
      }
    },
    raw: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 4096
      }
    },
    timestamp: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: () => Date.now()
    }
  },
  { 
    tableName: "sensor_data",
    indexes: [
      {
        fields: ['timestamp']
      },
      {
        fields: ['device']
      },
      {
        fields: ['sensor']
      }
    ]
  }
);

// Tambahkan hooks untuk validasi sebelum save
SensorData.beforeCreate((sensorData) => {
  if (!sensorData.timestamp) {
    sensorData.timestamp = Date.now();
  }
});

export default SensorData;