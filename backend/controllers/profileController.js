import profileService from "../services/profileService.js";

export const getProfile = async (req, res) => {
  try {
    const user = await profileService.getProfile(req.user.id);
    res.json(user);
  } catch (err) {
    console.error("PROFILE ERROR:", err);
    res
      .status(err.status || 500)
      .json({ message: err.message || "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const updatedUser = await profileService.updateProfile(
      req.user.id,
      req.body
    );
    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (err) {
    console.error("UPDATE PROFILE ERROR:", err);
    res
      .status(err.status || 500)
      .json({ message: err.message || "Server error" });
  }
};

export const changePassword = async (req, res) => {
  try {
    await profileService.changePassword(req.user.id, req.body);
    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("CHANGE PASSWORD ERROR:", err);
    res
      .status(err.status || 500)
      .json({ message: err.message || "Server error" });
  }
};
