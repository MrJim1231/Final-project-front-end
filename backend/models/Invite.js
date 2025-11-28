const mongoose = require("mongoose");

const InviteSchema = new mongoose.Schema({
  email: { type: String, required: true },
  token: { type: String, required: true },
  role: {
    type: String,
    enum: ["owner", "edit", "view"],
    default: "edit",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Invite", InviteSchema);
