const Quiz = require("../models/Quiz");
const QuizQuestion = require("../models/QuizQuestion");
const QuizAttempt = require("../models/QuizAttempt");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

const getQuizzes = asyncHandler(async (req, res) => {
  const where = { isPublished: true };
  if (req.query.category) where.category = req.query.category;
  if (req.query.difficulty) where.difficulty = req.query.difficulty;

  const quizzes = await Quiz.findAll({
    where,
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: QuizQuestion,
        as: "questions",
        attributes: ["id"],
      },
    ],
  });

  const formatted = quizzes.map((q) => {
    const plain = q.toJSON();
    return {
      ...plain,
      questionCount: plain.questions?.length || 0,
      questions: undefined,
    };
  });

  res.json({ success: true, data: { quizzes: formatted } });
});

const getQuizBySlug = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findOne({
    where: { slug: req.params.slug, isPublished: true },
    include: [
      {
        model: QuizQuestion,
        as: "questions",
        attributes: ["id", "question", "options", "order"],
        order: [["order", "ASC"]],
      },
    ],
  });

  if (!quiz) throw new AppError("Quiz not found", 404);

  const data = quiz.toJSON();
  data.questions = data.questions
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((q, i) => ({
    id: q.id,
    question: q.question,
    options: q.options,
    order: q.order ?? i,
  }));

  res.json({ success: true, data: { quiz: data } });
});

const submitQuiz = asyncHandler(async (req, res) => {
  const { answers, timeTaken } = req.body;

  if (!Array.isArray(answers)) {
    throw new AppError("Answers array is required", 400);
  }

  const quiz = await Quiz.findOne({
    where: { slug: req.params.slug, isPublished: true },
    include: [
      {
        model: QuizQuestion,
        as: "questions",
        order: [["order", "ASC"]],
      },
    ],
  });

  if (!quiz) throw new AppError("Quiz not found", 404);

  const questions = quiz.questions;
  if (answers.length !== questions.length) {
    throw new AppError("Answer count does not match question count", 400);
  }

  let score = 0;
  const results = questions.map((q, index) => {
    const selected = answers[index];
    const correct = selected === q.correctIndex;
    if (correct) score += 1;
    return {
      questionId: q.id,
      question: q.question,
      options: q.options,
      selectedIndex: selected,
      correctIndex: q.correctIndex,
      correct,
      explanation: q.explanation,
    };
  });

  const total = questions.length;
  const percentage = total ? Math.round((score / total) * 100) : 0;

  let attempt = null;
  if (req.user?.id) {
    attempt = await QuizAttempt.create({
      userId: req.user.id,
      quizId: quiz.id,
      score,
      total,
      percentage,
      answers: results,
      timeTaken: timeTaken || 0,
    });
  }

  res.json({
    success: true,
    data: {
      score,
      total,
      percentage,
      results,
      attemptId: attempt?.id,
      quizTitle: quiz.title,
      passed: percentage >= 60,
    },
  });
});

const getMyAttempts = asyncHandler(async (req, res) => {
  const attempts = await QuizAttempt.findAll({
    where: { userId: req.user.id },
    include: [{ model: Quiz, attributes: ["title", "slug", "category", "icon"] }],
    order: [["createdAt", "DESC"]],
    limit: 20,
  });

  res.json({ success: true, data: { attempts } });
});

const optionalAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer")) return next();

  try {
    const jwt = require("jsonwebtoken");
    const User = require("../models/User");
    const decoded = jwt.verify(authHeader.split(" ")[1], process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if (user) req.user = { id: user.id, role: user.role };
  } catch {
    /* guest submit */
  }
  next();
};

module.exports = {
  getQuizzes,
  getQuizBySlug,
  submitQuiz,
  getMyAttempts,
  optionalAuth,
};
