const authService = require("../services/authService");
const Invite = require("../models/Invite");
const Member = require("../models/Member");

exports.register = async (req, res) => {
  try {
    // 1. Регистрируем пользователя
    const user = await authService.register(req.body);

    // Роль по умолчанию — owner (если нет инвайта)
    let finalRole = "owner";

    // 2. Проверяем invite token (из query или body)
    const inviteToken = req.query.invite || req.body.invite;

    if (inviteToken) {
      const invite = await Invite.findOne({ token: inviteToken });

      if (invite) {
        finalRole = invite.role;

        // 3. Создаём участника (Member)
        await Member.create({
          ownerId: invite.ownerId,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          avatar: null,
          role: invite.role,
        });

        // 4. Удаляем приглашение
        await Invite.deleteOne({ token: inviteToken });
      }
    }

    // 5. Ответ
    res.status(201).json({
      message: "User registered successfully",
      userId: user._id,
      role: finalRole,
    });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const result = await authService.login(req.body);

    // Определяем роль пользователя
    const member = await Member.findOne({ email: result.user.email });

    const role = member ? member.role : "owner";

    res.json({
      message: "Login success",
      ...result,
      role,
    });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Server error" });
  }
};
