const asyncHandler = require("../utils/asyncHandler");
const authService = require("../services/authService");
const User = require("../models/User");
const AppError = require("../utils/AppError");

const register = asyncHandler(async (req, res) => {
  const result = await authService.registerUser(req.body);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const login = asyncHandler(async (req, res) => {
  const result = await authService.loginUser(req.body);

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: result,
  });
});

const getMe = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  res.status(200).json({
    success: true,
    data: {
      user: authService.formatUserResponse(
        user.get ? user.get({ plain: true }) : user,
      ),
    },
  });
});

module.exports = { register, login, getMe };
