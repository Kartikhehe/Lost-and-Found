import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { sequelize } from "./models/index.js";
import authRoutes from "./routes/auth.js";
import reportRoutes from "./routes/reports.js";
import claimRoutes from "./routes/claims.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/claims", claimRoutes);

const PORT = process.env.PORT || 5050;

sequelize.sync({ alter: true })
  .then(() => {
    console.log("🔗 Database connected successfully.");
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });