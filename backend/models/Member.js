const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: { type: String, default: null },
  role: {
    type: String,
    enum: ["owner", "edit", "view"],
    default: "edit",
  },
});

module.exports = mongoose.model("Member", MemberSchema);
