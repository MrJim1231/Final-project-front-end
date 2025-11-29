const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: { type: String, default: null },

  role: {
    type: String,
    enum: ["edit", "view"],
    default: "edit",
  },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Member", MemberSchema);
