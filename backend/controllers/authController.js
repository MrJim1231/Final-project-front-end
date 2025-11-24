const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ============================
//   REGISTER
// ============================
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;

    // Проверяем существование email/username
    const existEmail = await User.findOne({ email });
    if (existEmail)
      return res.status(400).json({ message: "Email already exists" });

    const existUsername = await User.findOne({ username });
    if (existUsername)
      return res.status(400).json({ message: "Username already exists" });

    // Хешируем пароль
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Создаем пользователя
    const user = await User.create({
      firstName,
      lastName,
      username,
      email,
      passwordHash,
    });

    res
      .status(201)
      .json({ message: "User registered successfully", userId: user._id });
  } catch (err) {
    console.log("REGISTER ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ============================
//   LOGIN
// ============================
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Проверяем пользователя
    const user = await User.findOne({ username });
    if (!user)
      return res.status(400).json({ message: "Invalid username or password" });

    // Проверяем пароль
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid username or password" });

    // Создаем JWT токен
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "Login success",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (err) {
    console.log("LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ============================
//   PROFILE (проверка токена)
// ============================
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-passwordHash");
    res.json(user);
  } catch (err) {
    console.log("PROFILE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ============================
//   UPDATE PROFILE
// ============================
exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, email, contact, position } = req.body;

    // Проверка email на уникальность
    const existEmail = await User.findOne({ email, _id: { $ne: req.user.id } });
    if (existEmail)
      return res.status(400).json({ message: "Email already in use" });

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { firstName, lastName, email, contact, position },
      { new: true }
    ).select("-passwordHash");

    res.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.log("UPDATE PROFILE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ============================
//   CHANGE PASSWORD
// ============================
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(oldPassword, user.passwordHash);
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect old password" });

    const salt = await bcrypt.genSalt(10);
    user.passwordHash = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.log("CHANGE PASSWORD ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
