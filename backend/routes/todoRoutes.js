const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");
const auth = require("../middleware/auth");

router.get("/", auth, todoController.getAll);
router.post("/", auth, todoController.create);
router.put("/:id", auth, todoController.update);
router.patch("/:id", auth, todoController.update); // ✅ добавили
router.delete("/:id", auth, todoController.remove);

module.exports = router;
