const router = require("express").Router();
const inviteController = require("../controllers/inviteController");

router.post("/", inviteController.create);
router.get("/", inviteController.getAll);
router.get("/accept/:token", inviteController.accept);

module.exports = router;
