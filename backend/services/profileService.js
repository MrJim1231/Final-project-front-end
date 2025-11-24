const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.getProfile = async (userId) => {
  const user = await User.findById(userId).select("-passwordHash");
  if (!user) throw { status: 404, message: "User not found" };
  return user;
};

exports.updateProfile = async (
  userId,
  { firstName, lastName, email, contact, position }
) => {
  // Проверка email на уникальность
  const existEmail = await User.findOne({ email, _id: { $ne: userId } });
  if (existEmail) throw { status: 400, message: "Email already in use" };

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { firstName, lastName, email, contact, position },
    { new: true }
  ).select("-passwordHash");

  return updatedUser;
};

exports.changePassword = async (userId, { oldPassword, newPassword }) => {
  const user = await User.findById(userId);
  if (!user) throw { status: 404, message: "User not found" };

  const isMatch = await bcrypt.compare(oldPassword, user.passwordHash);
  if (!isMatch) throw { status: 400, message: "Incorrect old password" };

  const salt = await bcrypt.genSalt(10);
  user.passwordHash = await bcrypt.hash(newPassword, salt);
  await user.save();
};
