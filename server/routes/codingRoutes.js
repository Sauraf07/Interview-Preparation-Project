const express = require('express');
const {
  getProblems,
  getProblem,
  runCode,
  submitSolution,
  createProblem,
  deleteProblem,
} = require('../controllers/codingController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getProblems);
router.post('/run', protect, runCode);
router.get('/:id', getProblem);
router.post('/:id/submit', protect, submitSolution);

router.post('/', protect, authorize('admin'), createProblem);
router.delete('/:id', protect, authorize('admin'), deleteProblem);

module.exports = router;
