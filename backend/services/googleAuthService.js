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

    // 1. Обмен code → access_token
    const tokenRes = await axios.post("https://oauth2.googleapis.com/token", {
      code,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code",
    });

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

    if (!googleUser.email) {
      throw { status: 400, message: "Google user has no email" };
    }

    // 3. Ищем пользователя по email
    let user = await User.findOne({ email: googleUser.email });

    // 4. Если нет — создаем нового Google пользователя
    if (!user) {
      user = await User.create({
        email: googleUser.email,
        firstName: googleUser.given_name || "",
        lastName: googleUser.family_name || "",
        googleId: googleUser.id,
        avatar: googleUser.picture || "",
        username:
          googleUser.email.split("@")[0] +
          "_" +
          Math.floor(Math.random() * 10000), // уникальный username
        passwordHash: null, // Google-пользователь не имеет пароля
      });
    }

    // 5. Генерируем JWT
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: "30d" }
    );

    return { token, user };
  }
}

module.exports = new GoogleAuthService();
