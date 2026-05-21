const express = require('express');
const {
  getQuestions,
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getCategories,
} = require('../controllers/questionController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/meta/categories', getCategories);
router.get('/', getQuestions);
router.get('/:id', getQuestion);

router.post('/', protect, authorize('admin'), createQuestion);
router.put('/:id', protect, authorize('admin'), updateQuestion);
router.delete('/:id', protect, authorize('admin'), deleteQuestion);

module.exports = router;
