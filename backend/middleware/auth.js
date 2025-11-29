const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const header = req.header("Authorization");

  // Нет заголовка
  if (!header) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Проверяем формат
  if (!header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  const token = header.split(" ")[1];

  try {
    // Расшифровываем токен
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Кладём в req.user только то, что нужно
    req.user = {
      id: decoded.id, // <-- очень важно!
    };

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
