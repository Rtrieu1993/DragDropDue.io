import React, { useState } from 'react';
import KanbanColumn from './KanbanColumn';
import '../styles/KanbanBoard.css';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Design UI', status: 'To Do' },
    { id: 2, title: 'Develop Backend', status: 'In Progress' },
    { id: 3, title: 'Write Tests', status: 'Review' },
    { id: 4, title: 'Deploy to Production', status: 'Done' },
  ]);

  const statuses = ['To Do', 'In Progress', 'Review', 'Done'];

  const handleDrop = (taskId, newStatus) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const addTask = (title) => {
    const newTask = { id: tasks.length + 1, title, status: 'To Do' };
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="kanban-container">
      <h2>Project Management Board</h2>
      <button className="add-task-btn" onClick={() => addTask(prompt("Enter Task Name"))}>
        + Add Task
      </button>
      
      <div className="kanban-board">
        {statuses.map(status => (
          <KanbanColumn
            key={status}
            status={status}
            tasks={tasks.filter(task => task.status === status)}
            handleDrop={handleDrop}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
