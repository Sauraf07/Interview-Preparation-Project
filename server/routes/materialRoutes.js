const express = require('express');
const {
  getMaterials,
  getMaterial,
  createMaterial,
  deleteMaterial,
  uploadMaterialFile,
} = require('../controllers/materialController');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.get('/', getMaterials);
router.get('/:id', getMaterial);
router.post('/upload', protect, authorize('admin'), upload.single('file'), uploadMaterialFile);
router.post('/', protect, authorize('admin'), createMaterial);
router.delete('/:id', protect, authorize('admin'), deleteMaterial);

module.exports = router;
