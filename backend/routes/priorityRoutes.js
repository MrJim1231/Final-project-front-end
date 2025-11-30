import express from "express";
const router = express.Router();
import * as priorityController from "../controllers/priorityController.js";

router.get("/", priorityController.getAll);
router.post("/", priorityController.create);
router.put("/:id", priorityController.update);
router.delete("/:id", priorityController.remove);

export default router;
