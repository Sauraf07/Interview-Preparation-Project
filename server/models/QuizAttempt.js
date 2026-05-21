const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Quiz = require("./Quiz");
const User = require("./User");

const QuizAttempt = sequelize.define(
  "QuizAttempt",
  {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    quizId: { type: DataTypes.INTEGER, allowNull: false },
    score: { type: DataTypes.INTEGER, defaultValue: 0 },
    total: { type: DataTypes.INTEGER, defaultValue: 0 },
    percentage: { type: DataTypes.FLOAT, defaultValue: 0 },
    answers: { type: DataTypes.JSON, defaultValue: [] },
    timeTaken: { type: DataTypes.INTEGER, defaultValue: 0 },
  },
  { timestamps: true },
);

Quiz.hasMany(QuizAttempt, { foreignKey: "quizId" });
QuizAttempt.belongsTo(Quiz, { foreignKey: "quizId" });
User.hasMany(QuizAttempt, { foreignKey: "userId" });
QuizAttempt.belongsTo(User, { foreignKey: "userId" });

module.exports = QuizAttempt;
