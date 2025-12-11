 SOILUSI - ESP32 MQTT Sensor Data Monitoring

## Overview
This project enables monitoring of sensor data from ESP32 devices via MQTT protocol. The system publishes sensor readings (DHT22 temperature/humidity and soil moisture) to an MQTT broker for real-time data collection and analysis.

## Prerequisites
- MQTT Broker running at `192.168.101.77`
- `mosquitto` client tools installed on your machine
- ESP32 devices configured to publish to the `sensors/#` topic hierarchy

## Quick Start

### 1. View All Data from ESP32 Devices
Subscribe to all sensor topics:
```terminal
mosquitto_sub -h 192.168.101.77 -t sensors/# -v
Example output:

text
sensors/esp32-01/dht {"device":"esp32-01","sensor":"dht22","temperature":29.40,"humidity":70.10,"timestamp":1700000000}
sensors/esp32-01/soil {"device":"esp32-01","sensor":"soil","soil_percent":43.22,"raw":1812,"timestamp":1700000001}
2. Manual Testing
Publish test messages to verify broker connectivity:

Simple message:

terminal
mosquitto_pub -h 192.168.101.77 -t sensors/test -m "Test ESP32"
JSON message:

terminal
mosquitto_pub -h 192.168.101.77 -t sensors/test -m '{"test":123}'
3. Filter Specific Sensor Data
View only soil moisture data:

terminal
mosquitto_sub -h 192.168.101.77 -t sensors/esp32-01/soil -v
View only DHT22 (temperature/humidity) data:

terminal
mosquitto_sub -h 192.168.101.77 -t sensors/esp32-01/dht -v
4. General Broker Testing
Subscribe to test topic:

terminal
mosquitto_sub -h 192.168.101.77 -t test/topic
Publish to test topic:

terminal
mosquitto_pub -h 192.168.101.77 -t test/topic -m "Halo dari broker"
Topic Structure
The system uses the following MQTT topic hierarchy:

sensors/[device_id]/dht - DHT22 temperature and humidity data

sensors/[device_id]/soil - Soil moisture sensor data

sensors/test - Testing topic

test/topic - General broker testing

Data Format
DHT22 Data
json
{
  "device": "esp32-01",
  "sensor": "dht22",
  "temperature": 29.40,
  "humidity": 70.10,
  "timestamp": 1700000000
}
Soil Moisture Data
json
{
  "device": "esp32-01",
  "sensor": "soil",
  "soil_percent": 43.22,
  "raw": 1812,
  "timestamp": 1700000001
}
Screenshots
Screenshot 2025-12-11 074743.png - Example of all sensor data subscription

Screenshot 2025-12-11 074840.png - Example of filtered soil sensor data

Screenshot 2025-12-11 074913.png - Example of broker testing

Customization
To modify the topic structure or add new sensor types, update the ESP32 firmware configuration. Common alternative topic patterns include:

farm/sensor/soil

agriculture/[device]/[sensor_type]

iot/[location]/[sensor]

Troubleshooting
If no data appears, verify the ESP32 is powered and connected to WiFi

Ensure the MQTT broker is running at the specified IP address

Check network connectivity between your machine and the broker

Verify the ESP32 is publishing to the correct topic structure

Notes
The timestamp field uses Unix epoch time

Soil moisture percentage is calculated from raw analog readings

Multiple ESP32 devices can be differentiated by their device ID in the topic
