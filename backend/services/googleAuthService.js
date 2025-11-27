const axios = require("axios");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

class GoogleAuthService {
  async loginWithGoogle(code) {
    const {
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      GOOGLE_REDIRECT_URI,
      JWT_SECRET,
    } = process.env;

    console.log("=== 🔵 GoogleAuthService START ===");
    console.log("📌 Received code:", code);

    // 1. Обмен code → access_token
    const tokenRes = await axios.post("https://oauth2.googleapis.com/token", {
      code,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code",
    });

    console.log("📌 Google token response:", tokenRes.data);

    if (!tokenRes.data.access_token) {
      throw { status: 400, message: "Failed to get Google access token" };
    }

    const accessToken = tokenRes.data.access_token;

    // 2. Получение профиля Google
    const userRes = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const googleUser = userRes.data;

    console.log("📌 Google profile:", googleUser);

    if (!googleUser.email) {
      throw { status: 400, message: "Google user has no email" };
    }

    // 3. Ищем пользователя по email
    let user = await User.findOne({ email: googleUser.email });

    console.log("📌 Found user in DB:", user);

    // === 4. Если найден — обновляем данные ===
    if (user) {
      let changed = false;

      if (!user.googleId) {
        user.googleId = googleUser.id;
        changed = true;
      }

      // обновляем аватар
      if (googleUser.picture && user.avatar !== googleUser.picture) {
        console.log("📌 Updating avatar:", googleUser.picture);
        user.avatar = googleUser.picture;
        changed = true;
      }

      // обновляем имя
      if (!user.firstName && googleUser.given_name) {
        user.firstName = googleUser.given_name;
        changed = true;
      }

      if (!user.lastName && googleUser.family_name) {
        user.lastName = googleUser.family_name;
        changed = true;
      }

      if (changed) {
        console.log("📌 Saving updated user...");
        await user.save();
      } else {
        console.log("📌 No changes in user profile");
      }
    }

    // === 5. Если не найден — создаём нового ===
    if (!user) {
      console.log("📌 Creating new user...");
      user = await User.create({
        email: googleUser.email,
        firstName: googleUser.given_name || "",
        lastName: googleUser.family_name || "",
        googleId: googleUser.id,
        avatar: googleUser.picture || "",
        username:
          googleUser.email.split("@")[0] +
          "_" +
          Math.floor(Math.random() * 10000),
        passwordHash: null,
      });
    }

    console.log("📌 FINAL USER DATA:", user);

    // 6. Генерируем JWT
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: "30d" }
    );

    console.log("📌 Generated JWT:", token);
    console.log("=== 🟢 GoogleAuthService END ===");

    return { token, user };
  }
}

module.exports = new GoogleAuthService();
