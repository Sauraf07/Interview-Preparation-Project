const LearningMaterial = require("../models/LearningMaterial");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");
const { configureCloudinary, uploadBuffer } = require("../utils/cloudinary");

const getMaterials = asyncHandler(async (req, res) => {
  const where = { isPublished: true };
  if (req.query.type) where.type = req.query.type;
  if (req.query.category) where.category = req.query.category;

  const materials = await LearningMaterial.findAll({
    where,
    order: [["createdAt", "DESC"]],
  });
  res.json({ success: true, data: { materials } });
});

const getMaterial = asyncHandler(async (req, res) => {
  const material = await LearningMaterial.findByPk(req.params.id);
  if (!material) throw new AppError("Material not found", 404);
  res.json({ success: true, data: { material } });
});

const createMaterial = asyncHandler(async (req, res) => {
  const material = await LearningMaterial.create({
    ...req.body,
    uploadedBy: req.user.id,
  });
  res.status(201).json({ success: true, data: { material } });
});

const deleteMaterial = asyncHandler(async (req, res) => {
  const material = await LearningMaterial.findByPk(req.params.id);
  if (!material) throw new AppError("Material not found", 404);
  await material.destroy();
  res.json({ success: true, message: "Material deleted" });
});

const uploadMaterialFile = asyncHandler(async (req, res) => {
  if (!req.file) throw new AppError("No file uploaded", 400);

  if (!configureCloudinary()) {
    throw new AppError(
      "Cloudinary is not configured. Add credentials to .env",
      503,
    );
  }

  const result = await uploadBuffer(
    req.file.buffer,
    "interview-prep/materials",
  );

  res.json({
    success: true,
    data: {
      fileUrl: result.secure_url,
      cloudinaryPublicId: result.public_id,
    },
  });
});

module.exports = {
  getMaterials,
  getMaterial,
  createMaterial,
  deleteMaterial,
  uploadMaterialFile,
};
