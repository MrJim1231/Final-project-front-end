const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/authController");
const googleAuthController = require("../controllers/googleAuthController");

// === обычная регистрация / логин ===
router.post("/register", register);
router.post("/login", login);

// ===============================
// === GOOGLE LOGIN ROUTES ======
// ===============================

// 1) Отправляем пользователя на страницу Google
router.get("/google", (req, res) => {
  const { GOOGLE_CLIENT_ID, GOOGLE_REDIRECT_URI } = process.env;

  // ЛОГИ ДЛЯ ДЕБАГА (ОЧЕНЬ ВАЖНО!)
  console.log("GOOGLE_CLIENT_ID =", GOOGLE_CLIENT_ID);
  console.log("GOOGLE_REDIRECT_URI =", GOOGLE_REDIRECT_URI);

  if (!GOOGLE_CLIENT_ID || !GOOGLE_REDIRECT_URI) {
    return res.status(500).json({
      message: "Google OAuth not configured (.env missing)",
    });
  }

  const url =
    `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${GOOGLE_CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(GOOGLE_REDIRECT_URI)}` +
    `&response_type=code` +
    `&access_type=offline` +
    `&prompt=consent` +
    `&scope=${encodeURIComponent("email profile openid")}`;

  res.redirect(url);
});

// 2) Google возвращает ?code=123 → обрабатываем
router.get("/google/callback", googleAuthController.googleAuth);

module.exports = router;
