const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const CodingProblem = sequelize.define(
  "CodingProblem",
  {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    difficulty: {
      type: DataTypes.ENUM("easy", "medium", "hard"),
      defaultValue: "easy",
    },
    tags: { type: DataTypes.JSON, defaultValue: [] },
    testCases: { type: DataTypes.JSON, defaultValue: [] },
    starterCode: { type: DataTypes.JSON, defaultValue: {} },
    isPublished: { type: DataTypes.BOOLEAN, defaultValue: true },
    createdBy: { type: DataTypes.INTEGER },
  },
  { timestamps: true },
);

module.exports = CodingProblem;
