const googleAuthService = require("../services/googleAuthService");

exports.googleAuth = async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) return res.status(400).json({ message: "Missing code" });

    const result = await googleAuthService.loginWithGoogle(code);

    res.redirect(
      `http://localhost:5173/login?googleToken=${
        result.token
      }&user=${encodeURIComponent(JSON.stringify(result.user))}`
    );
  } catch (err) {
    console.error("GOOGLE LOGIN ERROR:", err);
    res.status(500).json({ message: "Google login failed" });
  }
};
