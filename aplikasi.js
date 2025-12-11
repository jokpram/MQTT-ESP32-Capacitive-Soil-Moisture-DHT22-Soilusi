//aplikasi.js
import app from "./jalurAplikasi.js";
import sequelize from "./konfigurasiDatabase.js";

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.sync();
    console.log("PostgreSQL Connected & Synced");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Database connection error:", err.message);
  }
})();