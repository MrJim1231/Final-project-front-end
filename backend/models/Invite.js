const mongoose = require("mongoose");

const InviteSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // <-- теперь приглашение привязано к конкретному пользователю
  },

  email: {
    type: String,
    required: true,
  },

  token: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["edit", "view"],
    default: "edit",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Invite", InviteSchema);
