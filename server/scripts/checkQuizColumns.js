require("dotenv").config();
const { sequelize } = require("../config/db");
const Quiz = require("../models/Quiz");
const QuizQuestion = require("../models/QuizQuestion");

async function checkColumns() {
  try {
    const tableDesc = await sequelize.getQueryInterface().describeTable("Quizzes");
    console.log("Columns of Quizzes:", Object.keys(tableDesc));
  } catch (error) {
    console.error("Error describing table Quizzes:", error);
  } finally {
    await sequelize.close();
  }
}

checkColumns();
