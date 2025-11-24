const User = require("../models/User");

// ============================
//   GET PROFILE
// ============================
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-passwordHash");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    console.error("PROFILE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ============================
//   UPDATE PROFILE
// ============================
exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, email, contact, position } = req.body;

    if (!firstName || !lastName)
      return res
        .status(400)
        .json({ message: "First and Last name are required" });

    const emailExist = await User.findOne({ email, _id: { $ne: req.user.id } });
    if (emailExist)
      return res.status(400).json({ message: "Email already exists" });

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { firstName, lastName, email, contact, position },
      { new: true, runValidators: true }
    ).select("-passwordHash");

    res.json(user);
  } catch (err) {
    console.error("UPDATE PROFILE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
