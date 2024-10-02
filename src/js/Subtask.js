import React from "react";
import '../css/subtask.css';

/**
 * SubTasks component 
 * 
 * createdAt - Date
 * task name - String
 * task description - String
 * dueDate - Date
 * isCompleted - Boolean
 * 
 * @param {*} param0 
 * @returns 
 */

export default function Subtask({ subtask, onDelete, onToggleComplete }) {
  return (
    <div className={`subtask ${subtask.isCompleted ? 'completed' : ''}`}>
      <div className="subtask-header">
        <h3 className="subtask-title">{subtask.name}</h3>
        <button className="delete-btn" onClick={() => onDelete(subtask.id)}>
          Delete
        </button>
      </div>
      <p className="subtask-meta">
        Created at: {new Date(subtask.createdAt).toLocaleDateString()} | Due:{" "}
        {new Date(subtask.dueDate).toLocaleDateString()}
      </p>
      <p className="subtask-description">{subtask.description}</p>
      <div className="subtask-footer">
        <label className="subtask-status">
          <input
            type="checkbox"
            checked={subtask.isCompleted}
            onChange={() => onToggleComplete(subtask.id)}
          />
          Completed
        </label>
      </div>
    </div>
  );
}
