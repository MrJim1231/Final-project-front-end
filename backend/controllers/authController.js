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
