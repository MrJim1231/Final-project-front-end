const authService = require("../services/authService");
const Invite = require("../models/Invite");
const Member = require("../models/Member");

exports.register = async (req, res) => {
  try {
    // 1. Регистрируем пользователя
    const user = await authService.register(req.body);

    // Роль по умолчанию — owner (если нет инвайта)
    let finalRole = "owner";

    // 2. Проверяем invite token (из query или из body)
    const inviteToken = req.query.invite || req.body.invite;
    console.log("Invite token:", inviteToken);

    if (inviteToken) {
      const invite = await Invite.findOne({ token: inviteToken });

      if (invite) {
        console.log("Invite found:", invite);

        finalRole = invite.role; // роль берём из инвайта

        // 3. СОЗДАЁМ участника (Member)
        await Member.create({
          ownerId: invite.ownerId, // ← владелец
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          avatar: null,
          role: invite.role,
        });

        // 4. Удаляем приглашение
        await Invite.deleteOne({ token: inviteToken });

        console.log("Member created and invite removed");
      } else {
        console.log("Invite not found");
      }
    }

    // 5. Возвращаем роль в ответе
    res.status(201).json({
      message: "User registered successfully",
      userId: user._id,
      role: finalRole, // <<< ДОБАВЛЕНО
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res
      .status(err.status || 500)
      .json({ message: err.message || "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const result = await authService.login(req.body);

    // Получаем роль пользователя (если он участник в чём-то)
    const member = await Member.findOne({ email: result.user.email });

    let role = "owner"; // если пользователь никому не принадлежит

    if (member) {
      role = member.role;
    }

    res.json({
      message: "Login success",
      ...result,
      role, // <<< ДОБАВЛЕНО
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res
      .status(err.status || 500)
      .json({ message: err.message || "Server error" });
  }
};
