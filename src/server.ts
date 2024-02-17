import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";
async function connectDB() {
  try {
    const db = await mongoose.connect(config.db_url as string);
    if (db) {
      console.log("DB connects successfully");
      app.listen(config.port, () => {
        console.log(`University App listening on port ${config.port}`);
      });
    }
  } catch (error) {
    console.log("Error from server.ts", error);
  }
}
connectDB();
