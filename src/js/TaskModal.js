import React, { useState } from "react";
import "../css/WelcomePage.css";

const TaskModal = ({ onClose, onAddTask }) => {
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDate, setNewTaskDate] = useState("");
  const [newCreatedBy, setNewCreatedBy] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTaskName || !newTaskDate) return;

    // Pass the new task data to the parent component via onAddTask
    onAddTask({
      id: Math.random(), // Use a better method for unique ids in real applications
      name: newTaskName,
      createdDate: newTaskDate,
      createdBy: newCreatedBy
    });

    // Clear the input fields and close the modal
    setNewTaskName("");
    setNewTaskDate("");
    setNewCreatedBy('');
    onClose();
  };

  return (
    <div className="modal-background">
      <div className="modal">
        <h3>Add New Task</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Task name"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
          />
          <input 
            type="text"
            placeholder="Pankaj bhardwaj"
            value={newCreatedBy}
            onChange={(e) => setNewCreatedBy(e.target.value)}
           />     
          <input
            type="date"
            value={newTaskDate}
            onChange={(e) => setNewTaskDate(e.target.value)}
          />
          <button type="submit">Add Task</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
