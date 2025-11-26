const mongoose = require("mongoose");

const StatusSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  title: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Status", StatusSchema);
