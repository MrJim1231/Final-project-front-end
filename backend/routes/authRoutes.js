const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/authController");
const googleAuthController = require("../controllers/googleAuthController");

// === обычная регистрация / логин ===
router.post("/register", register);
router.post("/login", login);

// === GOOGLE LOGIN ===

// 1) отправить пользователя на страницу Google
router.get("/google", (req, res) => {
  const { GOOGLE_CLIENT_ID, GOOGLE_REDIRECT_URI } = process.env;

  const url =
    `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${GOOGLE_CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(GOOGLE_REDIRECT_URI)}` +
    `&response_type=code&scope=email%20profile`;

  res.redirect(url);
});

// 2) Google возвращает code → обрабатываем
router.get("/google/callback", googleAuthController.googleAuth);

module.exports = router;
