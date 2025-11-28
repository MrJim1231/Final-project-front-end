const Invite = require("../models/Invite");
const Member = require("../models/Member");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

class InviteService {
  async sendInvite(email, role = "edit") {
    const token = crypto.randomBytes(20).toString("hex");

    const invite = await Invite.create({
      email,
      token,
      role,
    });

    const link = `http://localhost:3000/register?invite=${token}`;

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

  async listMembers() {
    return await Member.find();
  }

  async updateRole(memberId, role) {
    return await Member.findByIdAndUpdate(memberId, { role }, { new: true });
  }

  async getProjectLink() {
    return { link: "https://sharelinkhereandthere.com/34565yy29" };
  }
}

module.exports = new InviteService();
