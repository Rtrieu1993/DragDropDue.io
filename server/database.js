const { MongoClient } = require("mongodb");

// Connection URL
const uri = "mongodb://127.0.0.1:27017"; // Same as in MongoDB Compass
const client = new MongoClient(uri);

// Database Name
const dbName = "mernDB"; // Replace with your database name

async function connectDB() {
  try {
    await client.connect(); // Connect to MongoDB
    console.log("✅ Connected to MongoDB");
    return client.db(dbName); // Return the database instance
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
}

module.exports = connectDB;