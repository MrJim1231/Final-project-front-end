const Invite = require("../models/Invite");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

class InviteService {
  async createInvite(email) {
    const token = crypto.randomBytes(20).toString("hex");

    // Сохраняем в БД
    const invite = await Invite.create({
      email,
      token,
      createdAt: Date.now(),
    });

    // Формируем ссылку
    const inviteLink = `http://localhost:3000/register?invite=${token}`;

    // Отправляем письмо
    await sendEmail(
      email,
      "You are invited to Todo App",
      `
        <h2>Invitation to Todo App</h2>
        <p>You were invited to join Todo App.</p>
        <p><a href="${inviteLink}">Click here to join</a></p>
        <p>Or open this link manually:</p>
        <p>${inviteLink}</p>
      `
    );

    return invite;
  }

  async getInvites() {
    return await Invite.find().sort({ createdAt: -1 });
  }

  async acceptInvite(token) {
    const invite = await Invite.findOne({ token });
    if (!invite) throw new Error("Invalid invite token");

    invite.status = "accepted";
    await invite.save();

    return invite;
  }
}

module.exports = new InviteService();
