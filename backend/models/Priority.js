const mongoose = require("mongoose");

const PrioritySchema = new mongoose.Schema({
  id: { type: String, unique: true },
  title: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Priority", PrioritySchema);
