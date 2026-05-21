const CodingProblem = require("../models/CodingProblem");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");
const { submitCode, runTestCases } = require("../utils/judge0");

const getProblems = asyncHandler(async (req, res) => {
  const where = { isPublished: true };
  if (req.query.difficulty) where.difficulty = req.query.difficulty;

  const problems = await CodingProblem.findAll({
    attributes: ["id", "title", "difficulty", "tags", "createdAt"],
    where,
    order: [["createdAt", "DESC"]],
  });
  res.json({ success: true, data: { problems } });
});

const getProblem = asyncHandler(async (req, res) => {
  const problem = await CodingProblem.findByPk(req.params.id);
  if (!problem) throw new AppError("Problem not found", 404);

  const sanitized = problem.get({ plain: true });
  sanitized.testCases = (sanitized.testCases || []).map((tc) => ({
    ...tc,
    expectedOutput: tc.isHidden ? undefined : tc.expectedOutput,
  }));

  res.json({ success: true, data: { problem: sanitized } });
});

const runCode = asyncHandler(async (req, res) => {
  const { sourceCode, language, stdin } = req.body;
  if (!sourceCode || !language)
    throw new AppError("Source code and language are required", 400);

  if (!process.env.JUDGE0_API_KEY && !process.env.JUDGE0_API_URL) {
    res.json({
      success: true,
      data: {
        stdout: "Judge0 not configured. Set JUDGE0_API_KEY in server .env",
        stderr: "",
        status: "Configuration Required",
        demo: true,
      },
    });
    return;
  }

  const result = await submitCode({ sourceCode, language, stdin: stdin || "" });
  res.json({ success: true, data: result });
});

const submitSolution = asyncHandler(async (req, res) => {
  const { sourceCode, language } = req.body;
  const problem = await CodingProblem.findByPk(req.params.id);
  if (!problem) throw new AppError("Problem not found", 404);

  if (!process.env.JUDGE0_API_KEY && !process.env.JUDGE0_API_URL) {
    res.json({
      success: true,
      data: {
        allPassed: false,
        results: [],
        message: "Judge0 not configured. Set JUDGE0_API_KEY in server .env",
        demo: true,
      },
    });
    return;
  }

  const result = await runTestCases({
    sourceCode,
    language,
    testCases: problem.testCases,
  });

  res.json({ success: true, data: result });
});

const createProblem = asyncHandler(async (req, res) => {
  const problem = await CodingProblem.create({
    ...req.body,
    createdBy: req.user.id,
  });
  res.status(201).json({ success: true, data: { problem } });
});

const deleteProblem = asyncHandler(async (req, res) => {
  const problem = await CodingProblem.findByPk(req.params.id);
  if (!problem) throw new AppError("Problem not found", 404);
  await problem.destroy();
  res.json({ success: true, message: "Problem deleted" });
});

module.exports = {
  getProblems,
  getProblem,
  runCode,
  submitSolution,
  createProblem,
  deleteProblem,
};
