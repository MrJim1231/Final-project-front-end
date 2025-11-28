const router = require("express").Router();
const inviteController = require("../controllers/inviteController");

router.post("/send", inviteController.invite);
router.get("/members", inviteController.members);
router.put("/member/:id/role", inviteController.updateRole);
router.get("/project-link", inviteController.projectLink);

module.exports = router;
