const Invite = require("../models/Invite");
const Member = require("../models/Member");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

class InviteService {
  // ================================================
  // 📩 ОТПРАВИТЬ ПРИГЛАШЕНИЕ
  // ================================================
  async sendInvite({ email, role = "edit", ownerId }) {
    // ❌ Защита от owner
    if (role === "owner") {
      throw new Error("Owner role cannot be assigned");
    }

    const token = crypto.randomBytes(20).toString("hex");

    const invite = await Invite.create({
      ownerId,
      email,
      token,
      role,
    });

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    const link = `${frontendUrl}/register?invite=${token}`;

    await sendEmail(
      email,
      "You're invited to the project",
      `
        <h2>Project Invitation</h2>
        <p>You were invited to collaborate on this project.</p>
        <p>Click to join: <a href="${link}">${link}</a></p>
      `
    );

    return invite;
  }

  // ================================================
  // 👥 СПИСОК УЧАСТНИКОВ
  // ================================================
  async listMembers(ownerId) {
    return await Member.find({ ownerId });
  }

  // ================================================
  // 🔄 ОБНОВИТЬ РОЛЬ
  // ================================================
  async updateRole(memberId, role, ownerId) {
    // ❌ Нельзя назначать owner
    if (role === "owner") {
      throw new Error("Owner role cannot be assigned");
    }

    return await Member.findOneAndUpdate(
      { _id: memberId, ownerId },
      { role },
      { new: true }
    );
  }

  // ================================================
  // 🔗 LINK
  // ================================================
  async getProjectLink() {
    return { link: "https://sharelinkhereandthere.com/34565yy29" };
  }
}

module.exports = new InviteService();
