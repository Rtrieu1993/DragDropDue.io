const express = require('express');
const axios = require('axios');  // Import Axios for HTTP requests
const connectDB = require('./connectDB');  // Import the connectDB function

const app = express();
const port = 5000;

// Middleware to parse JSON
app.use(express.json());

const apiKey = 'yourAPIKey'; // Replace with your Trello API Key
const apiToken = 'yourAPIToken'; // Replace with your Trello API Token

// Route to fetch cards from a Trello board
app.get('/trello/cards', async (req, res) => {
  const boardId = 'yourBoardId';  // Replace with your Trello Board ID
  
  try {
    const response = await axios.get(`https://api.trello.com/1/boards/${boardId}/cards`, {
      params: {
        key: apiKey,
        token: apiToken
      }
    });
    res.json(response.data); // Send the Trello cards as a response
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Example route to create a new card on Trello
app.post('/trello/cards', async (req, res) => {
  const cardName = req.body.name; // Card name passed in the request body
  const listId = 'yourListId';  // Replace with your Trello List ID

  try {
    const response = await axios.post('https://api.trello.com/1/cards', null, {
      params: {
        key: apiKey,
        token: apiToken,
        idList: listId,
        name: cardName
      }
    });
    res.json(response.data); // Send the created card data as response
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the Server
const startServer = async () => {
  try {
    await connectDB();  // Assuming you have MongoDB connected already
    console.log('Database connected successfully');

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error('Error starting the server:', err);
  }
};

startServer();