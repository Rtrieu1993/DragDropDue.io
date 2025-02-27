import React from 'react';
import '../styles/KanbanColumn.css';

const KanbanColumn = ({ status, tasks, handleDrop }) => {
  
  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onDrop = (event) => {
    const taskId = event.dataTransfer.getData("taskId");
    handleDrop(parseInt(taskId), status);
  };

  return (
    <div className="kanban-column" onDragOver={onDragOver} onDrop={onDrop}>
      <h3>{status}</h3>
      {tasks.map(task => (
        <div 
          key={task.id} 
          className="task-card"
          draggable
          onDragStart={(e) => e.dataTransfer.setData("taskId", task.id)}
        >
          {task.title}
        </div>
      ))}
    </div>
  );
};

export default KanbanColumn;
