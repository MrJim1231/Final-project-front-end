const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  userId: { type: String, required: false },
  title: { type: String, required: true },
  description: { type: String, default: "" },

  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Status",
    required: true,
  },
  priority: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Priority",
    required: true,
  },

  image: { type: String, default: "" },
  vital: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  completedAt: { type: Date, default: null },
});

module.exports = mongoose.model("Todo", TodoSchema);
