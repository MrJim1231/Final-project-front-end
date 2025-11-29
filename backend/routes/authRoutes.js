const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/authController");
const googleAuthController = require("../controllers/googleAuthController");

// ===============================
// === STANDARD LOGIN / REGISTER =
// ===============================
router.post("/register", register);
router.post("/login", login);

// ===============================
// === GOOGLE OAUTH ROUTES ======
// ===============================

// 1) Отправляем пользователя на Google OAuth
router.get("/google", (req, res) => {
  const { GOOGLE_CLIENT_ID, GOOGLE_REDIRECT_URI } = process.env;

  const invite = req.query.invite || ""; // получаем инвайт

  if (!GOOGLE_CLIENT_ID || !GOOGLE_REDIRECT_URI) {
    return res.status(500).json({
      message: "Google OAuth not configured (.env missing)",
    });
  }

  // invite передаём через state
  const url =
    `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${GOOGLE_CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(GOOGLE_REDIRECT_URI)}` +
    `&response_type=code` +
    `&access_type=offline` +
    `&prompt=consent` +
    `&scope=${encodeURIComponent("email profile openid")}` +
    (invite ? `&state=${invite}` : "");

  res.redirect(url);
});

// 2) Google возвращает code + state (invite)
router.get("/google/callback", googleAuthController.googleAuth);

module.exports = router;
