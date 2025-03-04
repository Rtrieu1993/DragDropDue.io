const { MongoClient } = require('mongodb');

const connectDB = async () => {
  try {
    const client = new MongoClient('mongodb://localhost:27017');
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db('your_database_name'); // Replace with your actual database name
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);  // Exit the process if the connection fails
  }
};

module.exports = connectDB;
