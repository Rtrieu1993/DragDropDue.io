import React from 'react';
import '../styles/KanbanBoard.css';

const KanbanCard = ({ task }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'high-priority';
      case 'Medium': return 'medium-priority';
      case 'Low': return 'low-priority';
      default: return '';
    }
  };

  return (
    <div className={`kanban-card ${getPriorityColor(task.priority)}`} draggable>
      <div className="card-header">
        <span className={`priority-tag ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </span>
        <span className="due-date">📅 {task.dueDate}</span>
      </div>

      <p className="task-title">{task.title}</p>

      <div className="card-footer">
        <div className="assigned-to">
          <img src={task.assignedTo.avatar} alt={task.assignedTo.name} />
          <span>{task.assignedTo.name}</span>
        </div>
      </div>
    </div>
  );
};

export default KanbanCard;
