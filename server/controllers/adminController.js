const User = require("../models/User");
const Question = require("../models/Question");
const LearningMaterial = require("../models/LearningMaterial");
const CodingProblem = require("../models/CodingProblem");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

const getAllQuestions = asyncHandler(async (req, res) => {
  const questions = await Question.findAll({
    order: [["createdAt", "DESC"]],
    limit: 100,
  });
  res.json({ success: true, data: { questions } });
});

const getStats = asyncHandler(async (req, res) => {
  const [users, questions, materials, codingProblems] = await Promise.all([
    User.count(),
    Question.count(),
    LearningMaterial.count(),
    CodingProblem.count(),
  ]);

  res.json({
    success: true,
    data: { users, questions, materials, codingProblems },
  });
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ["password"] },
    order: [["createdAt", "DESC"]],
  });
  res.json({ success: true, data: { users } });
});

const updateUserRole = asyncHandler(async (req, res) => {
  const { role } = req.body;
  if (!["user", "admin"].includes(role))
    throw new AppError("Invalid role", 400);

  const user = await User.findByPk(req.params.id);
  if (!user) throw new AppError("User not found", 404);
  await user.update({ role });
  const safeUser = await User.findByPk(req.params.id); // will apply defaultScope to exclude password
  res.json({ success: true, data: { user: safeUser } });
});

const deleteUser = asyncHandler(async (req, res) => {
  if (req.params.id === req.user.id)
    throw new AppError("Cannot delete your own account", 400);

  const user = await User.findByPk(req.params.id);
  if (!user) throw new AppError("User not found", 404);
  await user.destroy();

  res.json({ success: true, message: "User deleted" });
});

module.exports = {
  getStats,
  getUsers,
  getAllQuestions,
  updateUserRole,
  deleteUser,
};
