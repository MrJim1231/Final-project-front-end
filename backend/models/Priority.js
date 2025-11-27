const mongoose = require("mongoose");

const PrioritySchema = new mongoose.Schema({
  title: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Priority", PrioritySchema);
