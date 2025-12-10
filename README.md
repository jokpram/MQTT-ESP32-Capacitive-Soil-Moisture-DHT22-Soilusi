1. Melihat Semua Data dari ESP32

Jalankan:

mosquitto_sub -h 192.168.101.77 -t sensors/# -v


Jika ESP32 berjalan, Anda akan melihat contoh output:

sensors/esp32-01/dht {"device":"esp32-01","sensor":"dht22","temperature":29.40,"humidity":70.10,"timestamp":1700000000}
sensors/esp32-01/soil {"device":"esp32-01","sensor":"soil","soil_percent":43.22,"raw":1812,"timestamp":1700000001}

✔ 2. Jika ingin test manual (seperti test/topic)

Anda bisa publish data test pada topik sensor:

mosquitto_pub -h 192.168.101.77 -t sensors/test -m "Test ESP32"


Atau kalau ingin coba JSON:

mosquitto_pub -h 192.168.101.77 -t sensors/test -m '{"test":123}'

✔ 3. Jika hanya ingin melihat soil saja:
mosquitto_sub -h 192.168.101.77 -t sensors/esp32-01/soil -v


Jika hanya dht:

mosquitto_sub -h 192.168.101.77 -t sensors/esp32-01/dht -v

✔ 4. Test broker seperti contoh Anda
Subscribe:
mosquitto_sub -h 192.168.101.77 -t test/topic

Publish:
mosquitto_pub -h 192.168.101.77 -t test/topic -m "Halo dari broker"

Jika Anda ingin saya buatkan mode topik baru (misalnya farm/sensor/soil) saya bisa buatkan juga.

Cukup beri tahu format topik yang Anda inginkan.

ChatGPT can make mistakes. Check important inf
