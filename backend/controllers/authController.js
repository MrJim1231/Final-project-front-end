const authService = require("../services/authService");
const Invite = require("../models/Invite");
const Member = require("../models/Member");

exports.register = async (req, res) => {
  try {
    // 1. Регистрируем пользователя
    const user = await authService.register(req.body);

    // 2. Проверяем invite token (из query или body)
    const inviteToken = req.query.invite || req.body.invite;
    console.log("Invite token:", inviteToken);

    if (inviteToken) {
      const invite = await Invite.findOne({ token: inviteToken });

      if (invite) {
        console.log("Invite found:", invite);

        // 3. СОЗДАЁМ Member и ПЕРЕДАЁМ ownerId
        await Member.create({
          ownerId: invite.ownerId, // <<< ВАЖНО!!!
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          avatar: null,
          role: invite.role,
        });

        // 4. Удаляем invite
        await Invite.deleteOne({ token: inviteToken });

        console.log("Member created and invite removed");
      } else {
        console.log("Invite not found");
      }
    }

    res.status(201).json({
      message: "User registered successfully",
      userId: user._id,
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
    res.json({ message: "Login success", ...result });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res
      .status(err.status || 500)
      .json({ message: err.message || "Server error" });
  }
};
