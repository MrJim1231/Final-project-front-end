import googleAuthService from "../services/googleAuthService.js";
import Invite from "../models/Invite.js";
import Member from "../models/Member.js";

export const googleAuth = async (req, res) => {
  try {
    const { code, state } = req.query; // state = invite token
    const inviteToken = state || null;

    if (!code) {
      return res.status(400).json({ message: "Missing code" });
    }

    // === 1. Логиним / создаём пользователя через Google ===
    const result = await googleAuthService.loginWithGoogle(code);
    const user = result.user;

    // роль по умолчанию — owner
    let finalRole = "owner";

    // =====================================================
    // 🔥 2. Если есть invite → создаём Member с ownerId
    // =====================================================
    if (inviteToken) {
      const foundInvite = await Invite.findOne({ token: inviteToken });

      if (foundInvite) {
        console.log("Invite found for Google registration:", foundInvite);

        finalRole = foundInvite.role; // роль берём из инвайта

        await Member.create({
          ownerId: foundInvite.ownerId, // ← ВАЖНО! привязка к владельцу
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          avatar: user.avatar || null,
          role: foundInvite.role,
        });

        // удаляем invite после использования
        await Invite.deleteOne({ token: inviteToken });

        console.log("Member created via Google and invite removed");
      } else {
        console.log("Invite not found or expired");
      }
    } else {
      // нет инвайта → пользователь сам себе Owner
      finalRole = "owner";
    }

    // =====================================================
    // 🔄 3. Редирект на фронтенд + передаём роль
    // =====================================================
    res.redirect(
      `http://test111-blue.vercel.app/register?googleToken=${result.token}` +
        `&user=${encodeURIComponent(JSON.stringify(user))}` +
        `&role=${finalRole}`
    );
  } catch (err) {
    console.error("GOOGLE LOGIN ERROR:", err);
    res.status(500).json({ message: "Google login failed" });
  }
};
