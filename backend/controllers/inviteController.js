const inviteService = require("../services/inviteService");

module.exports = {
  async create(req, res) {
    try {
      const { email } = req.body;
      const invite = await inviteService.createInvite(email);
      res.json({ success: true, invite });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async getAll(req, res) {
    const invites = await inviteService.getInvites();
    res.json(invites);
  },

  async accept(req, res) {
    try {
      const invite = await inviteService.acceptInvite(req.params.token);
      res.json({ success: true, invite });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
