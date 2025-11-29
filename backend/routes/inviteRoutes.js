const router = require("express").Router();
const inviteController = require("../controllers/inviteController");
const auth = require("../middleware/auth");

router.post("/send", auth, inviteController.invite);
router.get("/members", auth, inviteController.members);
router.put("/member/:id/role", auth, inviteController.updateRole);
router.get("/project-link", auth, inviteController.projectLink);

module.exports = router;
