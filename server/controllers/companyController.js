const Company = require("../models/Company");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

const getCompanies = asyncHandler(async (req, res) => {
  const companies = await Company.findAll({
    attributes: ["slug", "name", "tagline", "logo"],
    order: [["name", "ASC"]],
  });
  res.json({ success: true, data: { companies } });
});

const getCompanyBySlug = asyncHandler(async (req, res) => {
  const company = await Company.findOne({ where: { slug: req.params.slug } });
  if (!company) throw new AppError("Company not found", 404);
  res.json({ success: true, data: { company } });
});

const updateCompany = asyncHandler(async (req, res) => {
  const company = await Company.findOne({ where: { slug: req.params.slug } });
  if (!company) throw new AppError("Company not found", 404);
  await company.update(req.body);
  res.json({ success: true, data: { company } });
});

module.exports = { getCompanies, getCompanyBySlug, updateCompany };
