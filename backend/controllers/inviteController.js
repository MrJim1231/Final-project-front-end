const inviteService = require("../services/inviteService");

module.exports = {
  async invite(req, res) {
    try {
      console.log("📩 [INVITE] Incoming request body:", req.body);

      const { email, role } = req.body;

      if (!email) {
        console.log("❌ [INVITE ERROR] Email is missing");
        return res.status(400).json({ error: "Email is required" });
      }

      console.log(`📨 [INVITE] Sending invite to: ${email}, role: ${role}`);

      const data = await inviteService.sendInvite(email, role);

      console.log("✅ [INVITE SUCCESS] Invite created:", data);

      res.json({ success: true, invite: data });
    } catch (e) {
      console.log("🔥 [INVITE ERROR] Internal error:", e);
      res.status(400).json({ error: e.message });
    }
  },

  async members(req, res) {
    try {
      console.log("👥 [MEMBERS] Fetching members...");
      const data = await inviteService.listMembers();
      console.log("✅ [MEMBERS] Loaded:", data.length);
      res.json(data);
    } catch (e) {
      console.log("🔥 [MEMBERS ERROR] Failed:", e);
      res.status(500).json({ error: e.message });
    }
  },

  async updateRole(req, res) {
    try {
      console.log("🔄 [UPDATE ROLE] Params:", req.params);
      console.log("🔄 [UPDATE ROLE] Body:", req.body);

      const { role } = req.body;
      const updated = await inviteService.updateRole(req.params.id, role);

      console.log("✅ [UPDATE ROLE] Updated member:", updated);
      res.json(updated);
    } catch (e) {
      console.log("🔥 [UPDATE ROLE ERROR] Failed:", e);
      res.status(400).json({ error: e.message });
    }
  },

  async projectLink(req, res) {
    try {
      console.log("🔗 [PROJECT LINK] Getting link...");
      const link = await inviteService.getProjectLink();
      console.log("✅ [PROJECT LINK] Loaded:", link);
      res.json(link);
    } catch (e) {
      console.log("🔥 [PROJECT LINK ERROR] Failed:", e);
      res.status(500).json({ error: e.message });
    }
  },
};
