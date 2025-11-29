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

    // =============================
    // 1. EXCHANGE CODE → ACCESS TOKEN
    // =============================
    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
      }
    );

    const accessToken = tokenResponse.data?.access_token;

    if (!accessToken) {
      throw {
        status: 400,
        message: "Google OAuth: Failed to retrieve access token",
      };
    }

    // =============================
    // 2. GET GOOGLE USER INFO
    // =============================
    const googleUserResponse = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const google = googleUserResponse.data;

    if (!google?.email) {
      throw { status: 400, message: "Google OAuth: Email not available" };
    }

    // =============================
    // 3. FIND EXISTING USER
    // =============================
    let user = await User.findOne({ email: google.email });

    // =============================
    // 4. UPDATE EXISTING USER
    // =============================
    if (user) {
      let shouldSave = false;

      if (!user.googleId) {
        user.googleId = google.id;
        shouldSave = true;
      }

      if (google.picture && user.avatar !== google.picture) {
        user.avatar = google.picture;
        shouldSave = true;
      }

      if (google.given_name && !user.firstName) {
        user.firstName = google.given_name;
        shouldSave = true;
      }

      if (google.family_name && !user.lastName) {
        user.lastName = google.family_name;
        shouldSave = true;
      }

      if (shouldSave) await user.save();
    }

    // =============================
    // 5. CREATE NEW USER (Google registration)
    // =============================
    if (!user) {
      const baseUsername = google.email.split("@")[0];
      const randomSuffix = Math.floor(Math.random() * 10000);
      const uniqueUsername = `${baseUsername}_${randomSuffix}`;

      user = await User.create({
        email: google.email,
        firstName: google.given_name || "",
        lastName: google.family_name || "",
        googleId: google.id,
        avatar: google.picture || "",
        username: uniqueUsername,
        passwordHash: null,
      });
    }

    // =============================
    // 6. GENERATE JWT
    // =============================
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "30d",
    });

    // =============================
    // 7. RETURN RESPONSE
    // =============================
    return {
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar || null,
        googleId: user.googleId || null,
      },
    };
  }
}

module.exports = new GoogleAuthService();
