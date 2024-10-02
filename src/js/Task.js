import React, { useState } from "react";
import Subtask from "./Subtask.js"; // Assuming Subtask component is imported
import '../css/task.css';
import SubTaskModal from "./SubTaskModal.js";

/**
 * Task component 
 * createdBy
 * createdDate
 * color coding
 * sub tasks. 
 */

export default function Task({ task, onDeleteTask, onDeleteSubtask, onToggleSubtaskComplete }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [subTasks, setSubTasks] = useState(task.subtasks);

    const closeModal = (flag) => {
        setIsModalOpen(flag);
    }

    const handleAddSubTask = (newSubTask) => {
        setSubTasks([...subTasks, newSubTask]);
    };

    return (
        <div className="task" style={{ borderLeft: `5px solid ${task.colorCode}` }}>
            <div className="task-header">
                <h3 className="task-title">{task.name}</h3>
                <button className="delete-task-btn" onClick={() => onDeleteTask(task.id)}>
                    Delete Task
                </button>
            </div>

            <p className="task-meta">
                Created by: {task.createdBy} | Created on: {new Date(task.createdDate).toLocaleDateString()}
            </p>
            <div className="task-description">
                <h5 style={{ borderLeft: `0px solid #f34566`, margin: 0, padding: 10, color: '#4a90e2' }}> Task description</h5>
                <textarea className="custom-textarea" type="text"></textarea>
            </div>
            {/* Rendering subtasks */}
            {subTasks && subTasks.length > 0 && (
                <div className="subtask-list">
                    {subTasks.map((subtask) => (
                        <Subtask
                            key={subtask.id}
                            subtask={subtask}
                            onDelete={onDeleteSubtask}
                            onToggleComplete={onToggleSubtaskComplete}
                        />
                    ))}
                </div>
            )}
            <div>
                {isModalOpen && <SubTaskModal onClose={closeModal} onAddSubTask={handleAddSubTask} />}
                {!isModalOpen &&
                    <button className="addSubTask" onClick={() => setIsModalOpen(true)}>
                        Add SubTask
                    </button>}
            </div>
        </div>
    );
}
