const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Quiz = require("./Quiz");

const QuizQuestion = sequelize.define(
  "QuizQuestion",
  {
    quizId: { type: DataTypes.INTEGER, allowNull: false },
    question: { type: DataTypes.TEXT, allowNull: false },
    options: { type: DataTypes.JSON, allowNull: false },
    correctIndex: { type: DataTypes.INTEGER, allowNull: false },
    explanation: { type: DataTypes.TEXT, defaultValue: "" },
    order: { type: DataTypes.INTEGER, defaultValue: 0 },
  },
  { timestamps: true },
);

Quiz.hasMany(QuizQuestion, { foreignKey: "quizId", as: "questions" });
QuizQuestion.belongsTo(Quiz, { foreignKey: "quizId" });

module.exports = QuizQuestion;
