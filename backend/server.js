const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

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

    // ==========================
    // Создание дефолтных статусов и приоритетов
    // ==========================
    const initDefaults = require("./initDefaults");
    await initDefaults();
  })
  .catch((err) => console.log("MongoDB connection error ❌:", err));

const path = require("path");

// ==========================
// Static files (Serving Frontend)
// ==========================
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// ==========================
// Routes
// ==========================
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const statusRoutes = require("./routes/statusRoutes");
const priorityRoutes = require("./routes/priorityRoutes");
const todoRoutes = require("./routes/todoRoutes");
const inviteRoutes = require("./routes/inviteRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/status", statusRoutes);
app.use("/api/priority", priorityRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/invite", inviteRoutes);

// ==========================
// Wildcard route (for SPA)
// ==========================
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

// ==========================
// Start server
// ==========================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
