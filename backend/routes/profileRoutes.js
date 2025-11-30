import express from "express";
const router = express.Router();

import {
  getProfile,
  updateProfile,
  changePassword,
} from "../controllers/profileController.js";

import auth from "../lib/auth.js";

// Protected profile routes
router.get("/", auth, getProfile);
router.put("/", auth, updateProfile);
router.put("/change-password", auth, changePassword);

export default router;
