const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  userId: { type: String, required: false }, // если нужен логин
  title: { type: String, required: true },
  description: { type: String, default: "" },
  status: { type: String, default: "Not Started" },
  priority: { type: String, default: "Low" },
  image: { type: String, default: "" },
  vital: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  completedAt: { type: Date, default: null },
});

module.exports = mongoose.model("Todo", TodoSchema);
