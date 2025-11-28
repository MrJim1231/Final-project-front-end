const mongoose = require("mongoose");

const InviteSchema = new mongoose.Schema({
  email: { type: String, required: true },
  token: { type: String, required: true },
  projectId: { type: String, required: false }, // если нужны проекты
  status: { type: String, default: "pending" }, // pending / accepted
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Invite", InviteSchema);
