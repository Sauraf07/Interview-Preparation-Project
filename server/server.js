require("dotenv").config();

const app = require("./app");
const { connectDB } = require("./config/db");
const seedDatabase = require("./config/seedData");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // Require either MongoDB URI (existing code) or DB_NAME/DB_USER for SQL
  if (
    !process.env.MONGO_URI &&
    (!process.env.DB_NAME || !process.env.DB_USER)
  ) {
    console.error(
      "Please set either MONGO_URI or DB_NAME and DB_USER (and optionally DB_PASS/DB_HOST) in your .env file",
    );
    process.exit(1);
  }

  if (!process.env.JWT_SECRET || process.env.JWT_SECRET === "your_secret_key") {
    console.error("Please set a valid JWT_SECRET in your .env file");
    process.exit(1);
  }

  await connectDB();
  if (process.env.SEED_DB === "true") {
    await seedDatabase();
  } else {
    console.log("Database seeding skipped (set SEED_DB=true to enable)");
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer().catch((err) => {
  console.error("Failed to start server:", err.message);
  process.exit(1);
});
