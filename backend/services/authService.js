const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async ({
  firstName,
  lastName,
  username,
  email,
  password,
}) => {
  // Проверяем существование email/username
  if (await User.findOne({ email })) {
    throw { status: 400, message: "Email already exists" };
  }
  if (await User.findOne({ username })) {
    throw { status: 400, message: "Username already exists" };
  }

  // Хешируем пароль
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  // Создаём пользователя
  const user = await User.create({
    firstName,
    lastName,
    username,
    email,
    passwordHash,
  });

  // Возвращаем только пользователя (роль обработает контроллер!)
  return {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
  };
};

exports.login = async ({ username, password }) => {
  const user = await User.findOne({ username });
  if (!user) throw { status: 400, message: "Invalid username or password" };

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) throw { status: 400, message: "Invalid username or password" };

  // JWT
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return {
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  };
};
