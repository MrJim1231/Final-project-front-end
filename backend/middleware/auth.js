const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const header = req.header("Authorization");

  if (!header) {
    return res.status(401).json({ message: "No token provided" });
  }

  // ДОЛЖНО БЫТЬ: "Bearer TOKEN"
  if (!header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  const token = header.split(" ")[1]; // <-- ВАЖНО

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
