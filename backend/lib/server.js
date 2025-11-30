import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// ==========================
// Middleware
// ==========================
app.use(cors());
app.use(express.json());

// ==========================
// MongoDB connection with connection pooling for serverless
// ==========================
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("Using existing MongoDB connection");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    isConnected = db.connections[0].readyState === 1;
    console.log("MongoDB connected successfully ✅");
    console.log("DB Name:", mongoose.connection.name);

    // Initialize default statuses and priorities
    const { default: initDefaults } = await import("../initDefaults.js");
    await initDefaults();
  } catch (err) {
    console.log("MongoDB connection error ❌:", err);
    throw err;
  }
};

// Connect to DB on app initialization
connectDB();

// ==========================
// Routes
// ==========================
const { default: authRoutes } = await import("../routes/authRoutes.js");
const { default: profileRoutes } = await import("../routes/profileRoutes.js");
const { default: statusRoutes } = await import("../routes/statusRoutes.js");
const { default: priorityRoutes } = await import("../routes/priorityRoutes.js");
const { default: todoRoutes } = await import("../routes/todoRoutes.js");
const { default: inviteRoutes } = await import("../routes/inviteRoutes.js");

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/status", statusRoutes);
app.use("/api/priority", priorityRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/invite", inviteRoutes);

// ==========================
// Test route
// ==========================
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.get("/api", (req, res) => {
  res.send("API is running 🚀");
});

export default app;
