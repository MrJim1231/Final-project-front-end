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
// MongoDB connection (Singleton for Vercel)
// ==========================
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGO_URI, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 5000,
      })
      .then(async (mongoose) => {
        console.log("MongoDB connected successfully ✅");

        // Init defaults (only once per cold start)
        const { default: initDefaults } = await import("../initDefaults.js");
        await initDefaults();

        return mongoose;
      })
      .catch((err) => {
        console.error("MongoDB connection error ❌:", err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

// Connect DB now
await connectDB();

// ==========================
// Routes (dynamic imports for Vercel)
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
