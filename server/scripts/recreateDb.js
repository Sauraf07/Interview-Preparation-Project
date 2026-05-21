const mysql = require("mysql2/promise");
require("dotenv").config();

async function recreateDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "root",
  });

  try {
    const dbName = process.env.DB_NAME || "interviewdb";
    console.log(`Dropping database if exists: ${dbName}...`);
    await connection.query(`DROP DATABASE IF EXISTS \`${dbName}\``);
    
    console.log(`Creating database: ${dbName}...`);
    await connection.query(`CREATE DATABASE \`${dbName}\``);
    
    console.log("Database recreated successfully!");
  } catch (error) {
    console.error("Error recreating database:", error);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

recreateDatabase();
