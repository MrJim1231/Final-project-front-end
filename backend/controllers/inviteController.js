const inviteService = require("../services/inviteService");

module.exports = {
  async invite(req, res) {
    try {
      const { email, role } = req.body;
      const data = await inviteService.sendInvite(email, role);
      res.json({ success: true, invite: data });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },

  async members(req, res) {
    const data = await inviteService.listMembers();
    res.json(data);
  },

  async updateRole(req, res) {
    const { role } = req.body;
    const updated = await inviteService.updateRole(req.params.id, role);
    res.json(updated);
  },

  async projectLink(req, res) {
    res.json(await inviteService.getProjectLink());
  },
};
