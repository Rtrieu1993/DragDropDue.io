const express = require('express');
const axios = require('axios');
const { MongoClient } = require('mongodb');

// App setup
const app = express();
const port = 5000;

// MongoDB connection details
const uri = "mongodb+srv://richardtrieu1993:6YTji21rDQ6rbBOi@dragdropdue.o9qrx.mongodb.net/?retryWrites=true&w=majority&appName=DragDropDue";
let db;

// Trello API credentials
const API_KEY = '14c8de960542408ba7f720e3f419b2a1';
const TOKEN = 'ATTAfe870c63097de977c07f528837dceebf33788cbfc0cd069efba594d58d7ef7da087A7565';
const BOARD_ID = 'ChVgKPZt';
const TODO_LIST_ID = '67d0d83fe3451d80f519eacf';
const IN_PROGRESS_LIST_ID = '67d0d83f25d4768e6dec0ca4';
const DONE_LIST_ID = '67d0d83f112e7bbdc90183f7';

const mongoose = require('mongoose');

// Mongoose package
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });


// MongoDB connection function
const connectDB = async () => {
  try {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    db = client.db('mernDB');
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Error connecting to MongoDB', error);
    throw error;
  }
};

// Helper function to get MongoDB collection
const getCollection = (collectionName) => {
  return db.collection(collectionName);
};

// Middleware to parse JSON
app.use(express.json());

// Trello API Routes
app.get('/trello/cards', async (req, res) => {
  try {
    const response = await axios.get(`https://api.trello.com/1/boards/${BOARD_ID}/cards`, {
      params: { key: API_KEY, token: TOKEN },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/trello/cards', async (req, res) => {
  const cardName = req.body.name;
  try {
    const response = await axios.post('https://api.trello.com/1/cards', null, {
      params: {
        key: API_KEY,
        token: TOKEN,
        idList: TODO_LIST_ID, // Example, adjust accordingly
        name: cardName
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// MongoDB Routes
app.post('/boards', async (req, res) => {
  const { name } = req.body;
  try {
    const boardCollection = getCollection('boards');
    const result = await boardCollection.insertOne({ name, lists: [] });
    res.json({ success: true, board: result.ops[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create board', error });
  }
});

app.get('/boards', async (req, res) => {
  try {
    const boardCollection = getCollection('boards');
    const boards = await boardCollection.find().toArray();
    res.json({ boards });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch boards', error });
  }
});

app.post('/lists', async (req, res) => {
  const { boardId, name } = req.body;
  try {
    const listCollection = getCollection('lists');
    const result = await listCollection.insertOne({ boardId, name, tasks: [] });
    res.json({ success: true, list: result.ops[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create list', error });
  }
});

app.get('/lists/:boardId', async (req, res) => {
  const { boardId } = req.params;
  try {
    const listCollection = getCollection('lists');
    const lists = await listCollection.find({ boardId }).toArray();
    res.json({ lists });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch lists', error });
  }
});

app.post('/tasks', async (req, res) => {
  const { listId, name } = req.body;
  try {
    const taskCollection = getCollection('tasks');
    const result = await taskCollection.insertOne({ listId, name, completed: false });
    res.json({ success: true, task: result.ops[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create task', error });
  }
});

app.get('/tasks/:listId', async (req, res) => {
  const { listId } = req.params;
  try {
    const taskCollection = getCollection('tasks');
    const tasks = await taskCollection.find({ listId }).toArray();
    res.json({ tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch tasks', error });
  }
});

app.put('/tasks/:taskId', async (req, res) => {
  const { taskId } = req.params;
  const { name, completed } = req.body;
  try {
    const taskCollection = getCollection('tasks');
    const result = await taskCollection.updateOne(
      { _id: taskId },
      { $set: { name, completed } }
    );
    res.json({ success: true, updatedTask: result });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update task', error });
  }
});

app.delete('/tasks/:taskId', async (req, res) => {
  const { taskId } = req.params;
  try {
    const taskCollection = getCollection('tasks');
    const result = await taskCollection.deleteOne({ _id: taskId });
    res.json({ success: true, message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete task', error });
  }
});

// Start the server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error('❌ Error starting the server:', err);
  }
};

startServer();
