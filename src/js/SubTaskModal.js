import React, { useState } from "react";
import "../css/WelcomePage.css";

const SubTaskModal = ({ onClose, onAddSubTask }) => {
  const [newSubTaskName, setSubNewTaskName] = useState("");
  const [newSubTaskDate, setSubNewTaskDate] = useState("");
  const [newSubTaskDescription, setSubTaskDescription] = useState('');
  const [isCompleted, setIsCompleted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newSubTaskName || !newSubTaskDate) return;

    // Pass the new task data to the parent component via onAddTask
    onAddSubTask({
      id: Math.random(), // Use a better method for unique ids in real applications
      name: newSubTaskName,
      createdDate: newSubTaskDate,
      description: newSubTaskDescription
    });

    // Clear the input fields and close the modal
    setSubNewTaskName("");
    setSubNewTaskDate("");
    setIsCompleted(false)
    setSubTaskDescription('');
    onClose();
  };

  return (
    <div className="modal-background">
      <div className="modal">
        <h3>Add New Sub-Task</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="SubTask name"
            value={newSubTaskName}
            onChange={(e) => setSubNewTaskName(e.target.value)}
          />
          <textarea
            className="subtask-textarea"
            placeholder="Enter sub task details..."
            value={newSubTaskDescription}
            onChange={(e) => setSubTaskDescription(e.target.value)}
          />
          <input
            type="date"
            value={newSubTaskDate}
            onChange={(e) => setSubNewTaskDate(e.target.value)}
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

export default SubTaskModal;
