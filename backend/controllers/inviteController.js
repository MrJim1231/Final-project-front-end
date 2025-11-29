const inviteService = require("../services/inviteService");
const Member = require("../models/Member");

module.exports = {
  // ===========================================
  // 📩 СОЗДАТЬ ПРИГЛАШЕНИЕ
  // ===========================================
  async invite(req, res) {
    try {
      console.log("📩 [INVITE] Incoming request body:", req.body);

      const { email, role } = req.body;

      if (!email) {
        console.log("❌ [INVITE ERROR] Email is missing");
        return res.status(400).json({ error: "Email is required" });
      }

      console.log(
        `📨 [INVITE] Sending invite to: ${email}, role: ${role}, ownerId: ${req.user.id}`
      );

      // Передаём ownerId — КТО создаёт приглашение
      const data = await inviteService.sendInvite({
        email,
        role,
        ownerId: req.user.id,
      });

      console.log("✅ [INVITE SUCCESS] Invite created:", data);

      res.json({ success: true, invite: data });
    } catch (e) {
      console.log("🔥 [INVITE ERROR] Internal error:", e);
      res.status(400).json({ error: e.message });
    }
  },

  // ===========================================
  // 👥 ПОЛУЧИТЬ СПИСОК УЧАСТНИКОВ ДЛЯ ТЕКУЩЕГО ВЛАДЕЛЬЦА
  // ===========================================
  async members(req, res) {
    try {
      console.log(`👥 [MEMBERS] Fetching members for ownerId: ${req.user.id}`);

      // ВАЖНО: ТОЛЬКО УЧАСТНИКИ ТЕКУЩЕГО ПОЛЬЗОВАТЕЛЯ
      const data = await Member.find({ ownerId: req.user.id });

      console.log("✅ [MEMBERS] Loaded:", data.length);

      res.json(data);
    } catch (e) {
      console.log("🔥 [MEMBERS ERROR] Failed:", e);
      res.status(500).json({ error: e.message });
    }
  },

  // ===========================================
  // 🔄 ОБНОВИТЬ РОЛЬ УЧАСТНИКА
  // ===========================================
  async updateRole(req, res) {
    try {
      console.log("🔄 [UPDATE ROLE] Params:", req.params);
      console.log("🔄 [UPDATE ROLE] Body:", req.body);

      const memberId = req.params.id;
      const { role } = req.body;

      // Меняем только если member принадлежит текущему владельцу!
      const updated = await Member.findOneAndUpdate(
        { _id: memberId, ownerId: req.user.id },
        { role },
        { new: true }
      );

      if (!updated) {
        return res
          .status(403)
          .json({ error: "You cannot update members of another user" });
      }

      console.log("✅ [UPDATE ROLE] Updated member:", updated);
      res.json(updated);
    } catch (e) {
      console.log("🔥 [UPDATE ROLE ERROR] Failed:", e);
      res.status(400).json({ error: e.message });
    }
  },

  // ===========================================
  // 🔗 ССЫЛКА ПРОЕКТА (если требуется)
  // ===========================================
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
