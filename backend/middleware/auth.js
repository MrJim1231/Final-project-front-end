const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Member = require("../models/Member");

module.exports = async (req, res, next) => {
  const header = req.header("Authorization");

  if (!header) {
    return res.status(401).json({ message: "No token provided" });
  }

  if (!header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 1. Загружаем пользователя
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // 2. Проверяем, является ли он member другого owner
    const member = await Member.findOne({
      email: user.email,
      ownerId: { $ne: user._id }, // защитный фильтр
    });

    if (member) {
      // 🔥 Пользователь — приглашённый участник чужого workspace
      req.user = {
        id: user._id,
        email: user.email,
        ownerId: member.ownerId,
        role: member.role, // owner / edit / view
      };
    } else {
      // 👑 Пользователь — владелец workspace (или у него нет membership)
      req.user = {
        id: user._id,
        email: user.email,
        ownerId: user._id, // сам себе владелец
        role: "owner",
      };
    }

    next();
  } catch (err) {
    console.error("AUTH ERROR:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
