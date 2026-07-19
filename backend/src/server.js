 import dotenv from "dotenv";
import app from "./app.js";
import sequelize from "./config/database.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect Database
    await sequelize.authenticate();
    console.log("✅ PostgreSQL Connected Successfully");

    // Sync Models
    await sequelize.sync();
    console.log("✅ Database Synced Successfully");

    // Start Server
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server Failed to Start");
    console.error(error.message);
    process.exit(1);
  }
};

startServer();