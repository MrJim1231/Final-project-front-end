const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getProfile,
} = require("../controllers/authController");
const auth = require("../middleware/auth");

// Auth
router.post("/register", register);
router.post("/login", login);

// Protected
router.get("/profile", auth, getProfile);

module.exports = router;
