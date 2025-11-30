import Invite from "../models/Invite.js";
import Member from "../models/Member.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

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

    const link = `https://test111-blue.vercel.app/register?invite=${token}`;

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

export default new InviteService();
