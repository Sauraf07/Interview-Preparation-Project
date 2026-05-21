const User = require("../models/User");
const AppError = require("../utils/AppError");
const generateToken = require("../utils/generateToken");
const {
  validateRegister,
  validateLogin,
} = require("../validations/authValidation");

const formatUserResponse = (user) => ({
  id: user.id || user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  profileImage: user.profileImage,
  createdAt: user.createdAt,
});

const registerUser = async (payload) => {
  validateRegister(payload);

  const existingUser = await User.findOne({
    where: { email: payload.email.toLowerCase() },
  });
  if (existingUser) {
    throw new AppError("Email already registered", 409);
  }

  const user = await User.create({
    name: payload.name.trim(),
    email: payload.email.toLowerCase().trim(),
    password: payload.password,
    role: payload.role || "user",
    profileImage: payload.profileImage || "",
  });

  const token = generateToken(user.id || user._id);

  return {
    token,
    user: formatUserResponse(user),
  };
};

const loginUser = async (payload) => {
  validateLogin(payload);

  const user = await User.unscoped().findOne({
    where: { email: payload.email.toLowerCase() },
  });

  if (!user || !(await user.comparePassword(payload.password))) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = generateToken(user.id || user._id);

  return {
    token,
    user: formatUserResponse(user),
  };
};

module.exports = { registerUser, loginUser, formatUserResponse };
