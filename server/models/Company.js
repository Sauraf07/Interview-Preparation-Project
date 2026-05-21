const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Company = sequelize.define(
  "Company",
  {
    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    name: { type: DataTypes.STRING, allowNull: false },
    logo: { type: DataTypes.STRING, defaultValue: "" },
    tagline: { type: DataTypes.STRING, defaultValue: "" },
    interviewProcess: { type: DataTypes.JSON, defaultValue: [] },
    questions: { type: DataTypes.JSON, defaultValue: [] },
    codingProblems: { type: DataTypes.JSON, defaultValue: [] },
    roadmap: { type: DataTypes.JSON, defaultValue: [] },
    resources: { type: DataTypes.JSON, defaultValue: [] },
  },
  { timestamps: true },
);

module.exports = Company;
