import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const API_URL = 'http://localhost:5000';

function App() {
  const [tasks, setTasks] = useState({ todo: [], inProgress: [], done: [] });
  const [newTask, setNewTask] = useState('');

  // Fetch tasks from MongoDB
  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/boards`);
      const boards = response.data.boards;
      const board = boards[0];
      const tasksData = { todo: [], inProgress: [], done: [] };

      for (const list of board.lists) {
        const listTasksResponse = await axios.get(`${API_URL}/tasks/${list._id}`);
        const tasks = listTasksResponse.data.tasks;

        if (list.name === 'To Do') tasksData.todo = tasks;
        if (list.name === 'In Progress') tasksData.inProgress = tasks;
        if (list.name === 'Done') tasksData.done = tasks;
      }

      setTasks(tasksData);
    } catch (error) {
      console.error('Error fetching data from MongoDB:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const moveTask = async (taskId, from, to) => {
    const taskToMove = tasks[from]?.find((task) => task._id === taskId);
    if (!taskToMove) return;

    try {
      await axios.put(`${API_URL}/tasks/${taskToMove._id}`, {
        name: taskToMove.name,
        completed: taskToMove.completed,
        listId: to,
      });

      fetchData();
    } catch (error) {
      console.error('Error moving task:', error);
    }
  };

  const handleAddTask = async (listId) => {
    if (newTask.trim()) {
      try {
        // Dynamically send the listId when creating the task
        await axios.post(`${API_URL}/tasks`, { name: newTask, listId });
  
        setNewTask(''); // Reset input field
        fetchData(); // Refresh tasks after adding
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const handleEditTask = async (taskId, currentName) => {
    const newName = prompt('Edit task name:', currentName);
    if (!newName || newName.trim() === currentName) return;

    try {
      await axios.put(`${API_URL}/tasks/${taskId}`, { name: newName, completed: false });
      fetchData();
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      await axios.delete(`${API_URL}/tasks/${taskId}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;
    moveTask(result.draggableId, source.droppableId, destination.droppableId);
  };

  return (
    <div>
      {/* Header */}
      <header className="header">
        <h1>DragDropDue - Kanban Board</h1>
      </header>

      {/* Main Body */}
      <main className="kanban-board">
        <DragDropContext onDragEnd={handleDragEnd}>
          {['todo', 'inProgress', 'done'].map((column) => (
            <div key={column} className="kanban-column">
              <h2>{column === 'todo' ? 'To Do' : column === 'inProgress' ? 'In Progress' : 'Done'}</h2>
              <Droppable droppableId={column}>
                {(provided) => (
                  <div className="task-list" ref={provided.innerRef} {...provided.droppableProps}>
                    {tasks[column].map((task, index) => (
                      <Draggable key={task._id} draggableId={task._id} index={index}>
                        {(provided) => (
                          <div
                            className="task"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <span>{task.name}</span>
                            <div className="task-buttons">
                              <button onClick={() => handleEditTask(task._id, task.name)}>✏️</button>
                              <button onClick={() => handleDeleteTask(task._id)}>🗑️</button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}

          <div className="new-task">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task"
            />
            <button onClick={handleAddTask}>Add Task</button>
          </div>
        </DragDropContext>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>Created with ❤️ by your Kanban Board Team</p>
      </footer>
    </div>
  );
}

export default App;
