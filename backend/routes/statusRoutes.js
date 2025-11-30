import express from "express";
const router = express.Router();
import * as statusController from "../controllers/statusController.js";

router.get("/", statusController.getAll);
router.post("/", statusController.create);
router.put("/:id", statusController.update);
router.delete("/:id", statusController.remove);

export default router;
