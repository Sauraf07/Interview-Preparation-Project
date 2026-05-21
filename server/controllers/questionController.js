const Question = require("../models/Question");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");
const { Op } = require("sequelize");

const buildQuestionQuery = (query) => {
  const where = { isPublished: true };

  if (query.category) where.category = query.category;
  if (query.difficulty) where.difficulty = query.difficulty;
  if (query.company) where.company = { [Op.like]: `%${query.company}%` };

  if (query.search) {
    const s = `%${query.search}%`;
    where[Op.or] = [
      { title: { [Op.like]: s } },
      { description: { [Op.like]: s } },
      { company: { [Op.like]: s } },
    ];
  }

  return where;
};

const getQuestions = asyncHandler(async (req, res) => {
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.min(parseInt(req.query.limit, 10) || 10, 50);
  const skip = (page - 1) * limit;

  const where = buildQuestionQuery(req.query);
  if (req.user?.role === "admin" && req.query.includeUnpublished === "true") {
    delete where.isPublished;
  }

  const { rows: questions, count: total } = await Question.findAndCountAll({
    where,
    order: [["createdAt", "DESC"]],
    limit,
    offset: skip,
  });

  res.json({
    success: true,
    data: { questions, total, page, pages: Math.ceil(total / limit) },
  });
});

const getQuestion = asyncHandler(async (req, res) => {
  const question = await Question.findByPk(req.params.id);
  if (!question) throw new AppError("Question not found", 404);
  res.json({ success: true, data: { question } });
});

const createQuestion = asyncHandler(async (req, res) => {
  const question = await Question.create({
    ...req.body,
    createdBy: req.user.id,
  });
  res.status(201).json({ success: true, data: { question } });
});

const updateQuestion = asyncHandler(async (req, res) => {
  const question = await Question.findByPk(req.params.id);
  if (!question) throw new AppError("Question not found", 404);
  await question.update(req.body);
  res.json({ success: true, data: { question } });
});

const deleteQuestion = asyncHandler(async (req, res) => {
  const question = await Question.findByPk(req.params.id);
  if (!question) throw new AppError("Question not found", 404);
  await question.destroy();
  res.json({ success: true, message: "Question deleted" });
});

const getCategories = asyncHandler(async (req, res) => {
  const questions = await Question.findAll({ where: { isPublished: true } });
  const categories = Array.from(
    new Set(questions.map((q) => q.category).filter(Boolean)),
  );
  const difficulties = ["easy", "medium", "hard"];
  const tags = Array.from(
    new Set(questions.flatMap((q) => q.tags || []).filter(Boolean)),
  );
  res.json({ success: true, data: { categories, difficulties, tags } });
});

module.exports = {
  getQuestions,
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getCategories,
};
