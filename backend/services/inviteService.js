const Invite = require("../models/Invite");
const Member = require("../models/Member");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

class InviteService {
  // ================================================
  // 📩 ОТПРАВИТЬ ПРИГЛАШЕНИЕ
  // ================================================
  async sendInvite({ email, role = "edit", ownerId }) {
    const token = crypto.randomBytes(20).toString("hex");

    // Сохраняем, кто отправил приглашение
    const invite = await Invite.create({
      ownerId,
      email,
      token,
      role,
    });

    const link = `http://localhost:5173/register?invite=${token}`;

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
  // 👥 ПОЛУЧИТЬ УЧАСТНИКОВ ДЛЯ ТЕКУЩЕГО ПОЛЬЗОВАТЕЛЯ
  // ================================================
  async listMembers(ownerId) {
    return await Member.find({ ownerId });
  }

  // ================================================
  // 🔄 ОБНОВИТЬ РОЛЬ УЧАСТНИКА (ТОЛЬКО СВОИХ)
  // ================================================
  async updateRole(memberId, role, ownerId) {
    return await Member.findOneAndUpdate(
      { _id: memberId, ownerId },
      { role },
      { new: true }
    );
  }

  // ================================================
  // 🔗 ПОЛУЧИТЬ ССЫЛКУ НА ПРОЕКТ (оставим как есть)
  // ================================================
  async getProjectLink() {
    return { link: "https://sharelinkhereandthere.com/34565yy29" };
  }
}

module.exports = new InviteService();
