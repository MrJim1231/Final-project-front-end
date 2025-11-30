import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import statusRoutes from "./routes/statusRoutes.js";
import priorityRoutes from "./routes/priorityRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import inviteRoutes from "./routes/inviteRoutes.js";

import initDefaults from "./initDefaults.js";

dotenv.config();

const app = express();

// ==========================
// Middleware
// ==========================
app.use(cors());
app.use(express.json());

// ==========================
// MongoDB connection
// ==========================
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected successfully ✅");
    console.log("DB Name:", mongoose.connection.name);

    await initDefaults();
  })
  .catch((err) => console.log("MongoDB connection error ❌:", err));

// ==========================
// Routes
// ==========================
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

// ==========================
// Start server
// ==========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
