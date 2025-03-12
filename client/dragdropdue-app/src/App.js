import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Replace these with your actual API key, token, and board/list IDs
const API_KEY = 'your_trello_api_key';
const TOKEN = 'your_trello_token';
const BOARD_ID = 'your_board_id'; // Replace with your Trello board ID
const TODO_LIST_ID = 'your_trello_todo_list_id';
const IN_PROGRESS_LIST_ID = 'your_trello_in_progress_list_id';
const DONE_LIST_ID = 'your_trello_done_list_id';

function App() {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: []
  });

  const [newTask, setNewTask] = useState('');

  // Function to fetch tasks from Trello
  const fetchData = async () => {
    try {
      const listsResponse = await axios.get(
        `https://api.trello.com/1/boards/${BOARD_ID}/lists?key=${API_KEY}&token=${TOKEN}`
      );

      const lists = listsResponse.data;
      const tasksData = { todo: [], inProgress: [], done: [] };

      for (const list of lists) {
        const cardsResponse = await axios.get(
          `https://api.trello.com/1/lists/${list.id}/cards?key=${API_KEY}&token=${TOKEN}`
        );
        const cards = cardsResponse.data;

        if (list.id === TODO_LIST_ID) tasksData.todo = cards;
        if (list.id === IN_PROGRESS_LIST_ID) tasksData.inProgress = cards;
        if (list.id === DONE_LIST_ID) tasksData.done = cards;
      }

      setTasks(tasksData);
    } catch (error) {
      console.error('Error fetching data from Trello:', error);
    }
  };

  // Fetch tasks when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Function to move task between columns
  const moveTask = (taskId, from, to) => {
    const taskToMove = tasks[from].find(task => task.id === taskId);
    if (taskToMove) {
      const newFromColumn = tasks[from].filter(task => task.id !== taskId);
      const newToColumn = [...tasks[to], taskToMove];

      setTasks({
        ...tasks,
        [from]: newFromColumn,
        [to]: newToColumn
      });

      axios.put(
        `https://api.trello.com/1/cards/${taskToMove.id}?idList=${getListIdByName(to)}&key=${API_KEY}&token=${TOKEN}`
      );
    }
  };

  // Get the list ID for a column (To Do, In Progress, Done)
  const getListIdByName = (name) => {
    if (name === 'todo') return TODO_LIST_ID;
    if (name === 'inProgress') return IN_PROGRESS_LIST_ID;
    if (name === 'done') return DONE_LIST_ID;
    return '';
  };

  // Function to handle new task submission
  const handleAddTask = async () => {
    if (newTask.trim()) {
      console.log('Adding task:', newTask); // Debugging line
  
      try {
        const response = await axios.post(
          `https://api.trello.com/1/cards?name=${newTask}&idList=${TODO_LIST_ID}&key=${API_KEY}&token=${TOKEN}`
        );
        
        console.log('Task added successfully:', response); // Debugging line
  
        setNewTask(''); // Clear input field after adding
        fetchData();  // Re-fetch the tasks from Trello
      } catch (error) {
        console.error('Error adding task to Trello:', error); // Error logging
      }
    } else {
      console.log('Task input is empty'); // Debugging line when input is empty
    }
  };
  // Handle drag end event
  const handleDragEnd = (result) => {
    const { destination, source } = result;

    // If dropped outside the list, do nothing
    if (!destination) {
      return;
    }

    // Moving tasks between columns
    const from = source.droppableId;
    const to = destination.droppableId;

    if (from !== to) {
      moveTask(result.draggableId, from, to);
    }
  };

  return (
    <div className="kanban-board">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="kanban-column">
          <h2>To Do</h2>
          <Droppable droppableId="todo">
            {(provided) => (
              <div
                className="task-list"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {tasks.todo.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        className="task"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {task.name}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        <div className="kanban-column">
          <h2>In Progress</h2>
          <Droppable droppableId="inProgress">
            {(provided) => (
              <div
                className="task-list"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {tasks.inProgress.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        className="task"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {task.name}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        <div className="kanban-column">
          <h2>Done</h2>
          <Droppable droppableId="done">
            {(provided) => (
              <div
                className="task-list"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {tasks.done.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        className="task"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {task.name}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

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
    </div>
  );
}

export default App;
