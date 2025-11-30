import express from "express";
const router = express.Router();
import * as todoController from "../controllers/todoController.js";
import auth from "../lib/auth.js";

router.get("/", auth, todoController.getAll);
router.post("/", auth, todoController.create);
router.put("/:id", auth, todoController.update);
router.patch("/:id", auth, todoController.update); // ✅ добавили
router.delete("/:id", auth, todoController.remove);

export default router;
