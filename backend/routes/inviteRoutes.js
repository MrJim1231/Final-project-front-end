import express from "express";
const router = express.Router();
import * as inviteController from "../controllers/inviteController.js";
import auth from "../lib/auth.js";

router.post("/send", auth, inviteController.invite);
router.get("/members", auth, inviteController.members);
router.put("/member/:id/role", auth, inviteController.updateRole);
router.get("/project-link", auth, inviteController.projectLink);

export default router;
