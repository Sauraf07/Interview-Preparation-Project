const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST || "localhost",
    dialect: process.env.DB_DIALECT || "mysql",
    logging: false,
  },
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL connected successfully");
    const shouldSync = process.env.DB_SYNC !== "false";
    if (shouldSync) {
      await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
      await sequelize.sync({ force: true });
      await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
      console.log("Database schemas synchronized (force)");
    }
  } catch (error) {
    console.error("Unable to connect to MySQL:", error);
    throw error;
  }
};

module.exports = { sequelize, connectDB };
