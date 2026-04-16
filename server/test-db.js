require("dotenv").config();
const mongoose = require("mongoose");

// Grab the URL from your .env file
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error("❌ No MONGO_URI found in your .env file!");
  process.exit(1);
}

console.log("Attempting to connect to MongoDB...");

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("✅ SUCCESS: Connected to MongoDB Atlas!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ FAILED: Could not connect to MongoDB Atlas.");
    console.error(err);
    process.exit(1);
  });
