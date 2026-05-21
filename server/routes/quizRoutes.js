const express = require("express");
const {
  getQuizzes,
  getQuizBySlug,
  submitQuiz,
  getMyAttempts,
  optionalAuth,
} = require("../controllers/quizController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getQuizzes);
router.get("/attempts/me", protect, getMyAttempts);
router.get("/:slug", getQuizBySlug);
router.post("/:slug/submit", optionalAuth, submitQuiz);

module.exports = router;
