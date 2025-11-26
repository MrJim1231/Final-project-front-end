const express = require("express");
const router = express.Router();
const priorityController = require("../controllers/priorityController");

router.get("/", priorityController.getAll);
router.post("/", priorityController.create);
router.put("/:id", priorityController.update);
router.delete("/:id", priorityController.remove);

module.exports = router;
