import React, { useState } from 'react';

function TaskList({ tasks, onEdit, onDelete, onToggleComplete, loading }) {
  const [expandedTasks, setExpandedTasks] = useState(new Set());
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading tasks...</p>
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📝</div>
        <h3>No tasks yet!</h3>
        <p>Add your first task to get started</p>
      </div>
    );
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'HIGH': return 'priority-high';
      case 'MEDIUM': return 'priority-medium';
      case 'LOW': return 'priority-low';
      default: return 'priority-medium';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'HIGH': return '🔴';
      case 'MEDIUM': return '🟡';
      case 'LOW': return '🟢';
      default: return '🟡';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'PERSONAL': return '👤';
      case 'WORK': return '💼';
      case 'SHOPPING': return '🛒';
      case 'HEALTH': return '🏥';
      case 'STUDY': return '📚';
      default: return '📋';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDueDate = (dueDate, dueTime) => {
    if (!dueDate) return '';
    const date = new Date(dueDate);
    if (dueTime) {
      const [hours, minutes] = dueTime.split(':');
      date.setHours(parseInt(hours), parseInt(minutes));
    }
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      ...(dueTime && { hour: '2-digit', minute: '2-digit' })
    });
  };

  const isOverdue = (dueDate, dueTime) => {
    if (!dueDate) return false;
    const now = new Date();
    const due = new Date(dueDate);
    if (dueTime) {
      const [hours, minutes] = dueTime.split(':');
      due.setHours(parseInt(hours), parseInt(minutes));
    }
    return due < now;
  };

  const toggleExpanded = (taskId) => {
    const newExpanded = new Set(expandedTasks);
    if (newExpanded.has(taskId)) {
      newExpanded.delete(taskId);
    } else {
      newExpanded.add(taskId);
    }
    setExpandedTasks(newExpanded);
  };

  const addSubtask = (taskId) => {
    // This would be implemented with proper state management
    console.log('Add subtask to task:', taskId);
  };

  return (
    <div className="task-list">
      {tasks.map(task => (
        <div 
          key={task.id} 
          className={`task-item ${task.completed ? 'completed' : ''} ${getPriorityColor(task.priority)} ${isOverdue(task.dueDate, task.dueTime) ? 'overdue' : ''}`}
        >
          <div className="task-header">
            <div className="task-title-section">
              <h3 className="task-title">
                {task.completed ? '✅' : '⏳'} {task.title}
                {task.subtasks && task.subtasks.length > 0 && (
                  <span className="subtask-count">
                    ({task.subtasks.filter(st => st.completed).length}/{task.subtasks.length})
                  </span>
                )}
              </h3>
              <div className="task-meta">
                <span className={`priority-badge priority-${task.priority.toLowerCase()}`}>
                  {getPriorityIcon(task.priority)} {task.priority}
                </span>
                <span className={`category-badge category-${task.category.toLowerCase()}`}>
                  {getCategoryIcon(task.category)} {task.category}
                </span>
                {task.dueDate && (
                  <span className={`due-date-badge ${isOverdue(task.dueDate, task.dueTime) ? 'overdue' : ''}`}>
                    {isOverdue(task.dueDate, task.dueTime) ? '🚨' : '📅'} Due: {formatDueDate(task.dueDate, task.dueTime)}
                  </span>
                )}
                {task.createdAt && (
                  <span className="date-badge">
                    📅 {formatDate(task.createdAt)}
                  </span>
                )}
              </div>
            </div>
            <div className="task-actions">
              <button 
                className="action-btn toggle-btn"
                onClick={() => onToggleComplete(task)}
                title={task.completed ? 'Mark as pending' : 'Mark as completed'}
              >
                {task.completed ? '↩️ Undo' : '✅ Complete'}
              </button>
              <button 
                className="action-btn edit-btn"
                onClick={() => onEdit(task)}
                title="Edit task"
              >
                ✏️ Edit
              </button>
              <button 
                className="action-btn subtask-btn"
                onClick={() => toggleExpanded(task.id)}
                title="Toggle subtasks"
              >
                📋 Subtasks
              </button>
              <button 
                className="action-btn delete-btn"
                onClick={() => onDelete(task.id)}
                title="Delete task"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
          
          {task.description && (
            <div className="task-description">
              <p>{task.description}</p>
            </div>
          )}

          {expandedTasks.has(task.id) && (
            <div className="subtasks-section">
              <div className="subtasks-header">
                <h4>📋 Subtasks</h4>
                <button 
                  className="add-subtask-btn"
                  onClick={() => addSubtask(task.id)}
                  title="Add subtask"
                >
                  ➕ Add Subtask
                </button>
              </div>
              {task.subtasks && task.subtasks.length > 0 ? (
                <div className="subtasks-list">
                  {task.subtasks.map((subtask, index) => (
                    <div key={index} className="subtask-item">
                      <input 
                        type="checkbox" 
                        checked={subtask.completed}
                        onChange={() => console.log('Toggle subtask:', index)}
                      />
                      <span className={subtask.completed ? 'completed' : ''}>
                        {subtask.text}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-subtasks">No subtasks yet. Click "Add Subtask" to create one.</p>
              )}
            </div>
          )}
          
          {task.updatedAt && task.updatedAt !== task.createdAt && (
            <div className="task-footer">
              <small className="updated-info">
                Last updated: {formatDate(task.updatedAt)}
              </small>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default TaskList;
