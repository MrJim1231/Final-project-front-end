import googleAuthService from "../services/googleAuthService.js";
import Invite from "../models/Invite.js";
import Member from "../models/Member.js";

export const googleAuth = async (req, res) => {
  try {
    const { code, state } = req.query; // state — это invite token
    const inviteToken = state || null;

    if (!code) {
      return res.status(400).json({ message: "Missing code" });
    }

    // === 1. Авторизация через Google ===
    const result = await googleAuthService.loginWithGoogle(code);
    const user = result.user;

    let finalRole = "owner"; // роль по умолчанию

    // === 2. Если есть инвайт — создаём участника
    if (inviteToken) {
      const foundInvite = await Invite.findOne({ token: inviteToken });

      if (foundInvite) {
        console.log("Invite found for Google registration:", foundInvite);

        finalRole = foundInvite.role;

        await Member.create({
          ownerId: foundInvite.ownerId,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          avatar: user.avatar || null,
          role: foundInvite.role,
        });

        await Invite.deleteOne({ token: inviteToken });
        console.log("Member created and invite removed");
      } else {
        console.log("Invite not found or expired");
      }
    }

    // === 3. Редирект на фронтенд с параметрами ===
    const frontendUrl = "https://todolist-front-end-five.vercel.app/register";
    const query = new URLSearchParams({
      googleToken: result.token,
      user: JSON.stringify(user),
      role: finalRole,
    });

    res.redirect(`${frontendUrl}?${query.toString()}`);
  } catch (err) {
    console.error("GOOGLE LOGIN ERROR:", err);
    res.status(500).json({ message: "Google login failed" });
  }
};
