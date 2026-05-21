const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Quiz = sequelize.define(
  "Quiz",
  {
    title: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.TEXT, defaultValue: "" },
    category: { type: DataTypes.STRING, defaultValue: "general" },
    difficulty: {
      type: DataTypes.ENUM("easy", "medium", "hard"),
      defaultValue: "medium",
    },
    timePerQuestion: { type: DataTypes.INTEGER, defaultValue: 45 },
    icon: { type: DataTypes.STRING, defaultValue: "📝" },
    color: { type: DataTypes.STRING, defaultValue: "#6366f1" },
    isPublished: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  { timestamps: true },
);

module.exports = Quiz;
