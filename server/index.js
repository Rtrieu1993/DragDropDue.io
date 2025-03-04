const express = require('express');
const connectDB = require('./connectDB');  // Import the connectDB function

const app = express();
const port = 5000;

const startServer = async () => {
  try {
    const db = await connectDB();  // Connect to the database
    console.log('Database connected successfully');
    
    // Your Express server setup code below
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

  } catch (err) {
    console.error('Error starting the server:', err);
  }
};

startServer();