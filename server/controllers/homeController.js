const Question = require("../models/Question");
const Company = require("../models/Company");
const CodingProblem = require("../models/CodingProblem");
const LearningMaterial = require("../models/LearningMaterial");
const Quiz = require("../models/Quiz");
const QuizQuestion = require("../models/QuizQuestion");
const asyncHandler = require("../utils/asyncHandler");

const getHomeData = asyncHandler(async (req, res) => {
  const [popularQuestions, companies, codingProblems, materials, quizzes] =
    await Promise.all([
      Question.findAll({
        where: { isPublished: true },
        attributes: [
          "id",
          "title",
          "category",
          "difficulty",
          "tags",
          "company",
        ],
        order: [["createdAt", "DESC"]],
        limit: 6,
      }),
      Company.findAll({
        attributes: ["slug", "name", "tagline"],
        order: [["name", "ASC"]],
      }),
      CodingProblem.findAll({
        where: { isPublished: true },
        attributes: ["id", "title", "difficulty", "tags"],
        order: [["createdAt", "DESC"]],
        limit: 4,
      }),
      LearningMaterial.findAll({
        where: { isPublished: true },
        attributes: ["id", "title", "type", "category", "link"],
        order: [["createdAt", "DESC"]],
        limit: 4,
      }),
      Quiz.findAll({
        where: { isPublished: true },
        attributes: [
          "id",
          "title",
          "slug",
          "category",
          "difficulty",
          "icon",
          "color",
          "timePerQuestion",
          "createdAt",
        ],
        order: [["createdAt", "DESC"]],
        limit: 4,
        include: [
          {
            model: QuizQuestion,
            as: "questions",
            attributes: ["id"],
          },
        ],
      }),
    ]);

  res.json({
    success: true,
    data: {
      popularQuestions,
      companies,
      codingProblems,
      learningRoadmap: [
        {
          step: 1,
          title: "Fundamentals",
          description: "DSA, OS, DBMS, Networks",
        },
        {
          step: 2,
          title: "Company-specific prep",
          description: "Target Google, Amazon, TCS, etc.",
        },
        {
          step: 3,
          title: "Mock interviews",
          description: "Practice coding & HR questions",
        },
        {
          step: 4,
          title: "Revision",
          description: "Notes, cheat sheets, and videos",
        },
      ],
      materials,
      quizzes: quizzes.map((q) => {
        const plain = q.toJSON();
        return {
          ...plain,
          questionCount: plain.questions?.length || 0,
          questions: undefined,
        };
      }),
    },
  });
});

module.exports = { getHomeData };
