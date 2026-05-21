const express = require('express');
const { getCompanies, getCompanyBySlug, updateCompany } = require('../controllers/companyController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getCompanies);
router.get('/:slug', getCompanyBySlug);
router.put('/:slug', protect, authorize('admin'), updateCompany);

module.exports = router;
