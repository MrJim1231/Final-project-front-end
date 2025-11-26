const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");
const auth = require("../middleware/authMiddleware");

// защищенные маршруты
router.get("/", auth, todoController.getAll);
router.post("/", auth, todoController.create);
router.put("/:id", auth, todoController.update);
router.delete("/:id", auth, todoController.remove);

module.exports = router;
