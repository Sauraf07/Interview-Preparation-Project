const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Question = sequelize.define(
  "Question",
  {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, defaultValue: "" },
    category: { type: DataTypes.STRING, defaultValue: "general" },
    difficulty: {
      type: DataTypes.ENUM("easy", "medium", "hard"),
      defaultValue: "easy",
    },
    tags: { type: DataTypes.JSON, defaultValue: [] },
    company: { type: DataTypes.STRING, defaultValue: "general" },
    answer: { type: DataTypes.TEXT, defaultValue: "" },
    isPublished: { type: DataTypes.BOOLEAN, defaultValue: true },
    createdBy: { type: DataTypes.INTEGER },
  },
  { timestamps: true },
);

module.exports = Question;
