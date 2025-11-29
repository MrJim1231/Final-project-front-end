const googleAuthService = require("../services/googleAuthService");
const Invite = require("../models/Invite");
const Member = require("../models/Member");

exports.googleAuth = async (req, res) => {
  try {
    const { code, state } = req.query; // ← Google передает invite через state
    const invite = state || null;

    if (!code) {
      return res.status(400).json({ message: "Missing code" });
    }

    // === 1. Логиним / создаём пользователя через Google ===
    const result = await googleAuthService.loginWithGoogle(code);
    const user = result.user;

    // =====================================================
    // 🔥 2. Если есть invite → создаём Member и удаляем invite
    // =====================================================
    if (invite) {
      const foundInvite = await Invite.findOne({ token: invite });

      if (foundInvite) {
        console.log("Invite found for Google registration:", foundInvite);

        await Member.create({
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          avatar: user.avatar || null,
          role: foundInvite.role,
        });

        await Invite.deleteOne({ token: invite });

        console.log("Member created via Google and invite removed");
      } else {
        console.log("Invite not found or expired");
      }
    }

    // =====================================================
    // 🔄 3. Редирект на фронтенд для авто-логина
    // =====================================================
    res.redirect(
      `http://localhost:5173/register?googleToken=${
        result.token
      }&user=${encodeURIComponent(JSON.stringify(user))}`
    );
  } catch (err) {
    console.error("GOOGLE LOGIN ERROR:", err);
    res.status(500).json({ message: "Google login failed" });
  }
};
