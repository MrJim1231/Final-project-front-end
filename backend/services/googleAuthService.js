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

    // === 1. Exchange code → access_token
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

    // === 2. Get Google profile
    const userRes = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    const google = userRes.data;

    if (!google.email) {
      throw { status: 400, message: "Google user has no email" };
    }

    // === 3. Find user in DB
    let user = await User.findOne({ email: google.email });

    // === 4. Update existing user ===
    if (user) {
      let changed = false;

      if (!user.googleId) {
        user.googleId = google.id;
        changed = true;
      }

      if (google.picture && user.avatar !== google.picture) {
        user.avatar = google.picture;
        changed = true;
      }

      if (!user.firstName && google.given_name) {
        user.firstName = google.given_name;
        changed = true;
      }

      if (!user.lastName && google.family_name) {
        user.lastName = google.family_name;
        changed = true;
      }

      if (changed) await user.save();
    }

    // === 5. Create new user ===
    if (!user) {
      user = await User.create({
        email: google.email,
        firstName: google.given_name || "",
        lastName: google.family_name || "",
        googleId: google.id,
        avatar: google.picture || "",
        username:
          google.email.split("@")[0] + "_" + Math.floor(Math.random() * 10000),
        passwordHash: null,
      });
    }

    // === 6. Generate JWT ===
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "30d",
    });

    // === 7. Return minimal user object for frontend ===
    return {
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar || null,
        googleId: user.googleId || null, // <<< ВАЖНО!
      },
    };
  }
}

module.exports = new GoogleAuthService();
