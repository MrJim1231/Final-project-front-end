const inviteService = require("../services/inviteService");
const Member = require("../models/Member");

module.exports = {
  // ===========================================
  // 📩 СОЗДАТЬ ПРИГЛАШЕНИЕ
  // ===========================================
  async invite(req, res) {
    try {
      const { email, role } = req.body;

      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

      // ❌ Запрещаем назначать роль owner
      if (role === "owner") {
        return res.status(400).json({ error: "Owner role cannot be assigned" });
      }

      const data = await inviteService.sendInvite({
        email,
        role: role || "edit",
        ownerId: req.user.id,
      });

      res.json({ success: true, invite: data });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },

  // ===========================================
  // 👥 ПОЛУЧИТЬ СПИСОК УЧАСТНИКОВ
  // ===========================================
  async members(req, res) {
    try {
      const data = await Member.find({ ownerId: req.user.id });
      res.json(data);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },

  // ===========================================
  // 🔄 ОБНОВИТЬ РОЛЬ (owner запрещён)
  // ===========================================
  async updateRole(req, res) {
    try {
      const memberId = req.params.id;
      const { role } = req.body;

      // ❌ Запрещаем менять на owner
      if (role === "owner") {
        return res.status(400).json({ error: "Cannot assign owner role" });
      }

      const updated = await Member.findOneAndUpdate(
        { _id: memberId, ownerId: req.user.id },
        { role },
        { new: true }
      );

      if (!updated) {
        return res.status(403).json({ error: "Access denied" });
      }

      res.json(updated);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },

  // ===========================================
  // 🔗 LINK
  // ===========================================
  async projectLink(req, res) {
    try {
      const link = await inviteService.getProjectLink();
      res.json(link);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },
};
