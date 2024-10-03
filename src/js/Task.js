import React, { useState, useEffect } from "react";
import Subtask from "./Subtask.js"; // Assuming Subtask component is imported
import '../css/task.css';
import SubTaskModal from "./SubTaskModal.js";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


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
    const [selectedColor, setSelectedColor] = useState(task.colorCode); // Default color is white
    const [textArea, setTextArea] = useState(task.description);
    console.log("Selected task " + task.id + "\t" + task.name + "\t" + task.createdBy + "\t" + subTasks +"\t"+ JSON.stringify(task));

    useEffect(() => {
        console.log("About to set subtasks again " + JSON.stringify(task.subtasks));
        setSubTasks(task.subtasks);
        setSelectedColor(task.colorCode); 
        setTextArea(task.textArea);
    }, [task]);

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const handleAddSubTask = (newSubTask) => {
        setSubTasks([...subTasks, newSubTask]);
    }

    // Function to handle color change
    const handleColorChange = (event) => {
        setSelectedColor(event.target.value); // Update selected color
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                closeModal(); // Close modal when Escape key is pressed
            }
        };

        if (isModalOpen) {
            // Add event listener if modal is open
            window.addEventListener("keydown", handleKeyDown);
        } else {
            // Remove event listener when modal is closed
            window.removeEventListener("keydown", handleKeyDown);
        }

        // Cleanup event listener when component unmounts
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isModalOpen]); // Dependency array includes isModalOpen to trigger effect when modal opens/closes

    // Handle drag end
    const handleOnDragEnd = (result) => {
        if (!result.destination) return; // Dropped outside the list

        const items = Array.from(subTasks);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setSubTasks(items); // Update state with new order
    };

    const handleOnblur = (e) => {
        console.log("Handling on blurring");
        setTextArea(e.target.value);
    }

    return (
        <div className="task"
            style={{
                borderLeft: `5px solid`,
                backgroundColor: selectedColor, // Apply the selected color
                borderRadius: "8px",
                color: "#fff",
            }}
        >
            <div className="task-header">
                <h3 className="task-title">{task.name}</h3>
                <select className="color-selection" onChange={handleColorChange}>
                    <option value="#ffffff">White</option>
                    <option value="#000000">Black</option>
                </select>
                <button className="delete-task-btn" onClick={() => onDeleteTask(task.id)}>
                    Delete Task
                </button>
            </div>

            <p className="task-meta">
                Created by: {task.createdBy} | Created on: {new Date(task.createdDate).toLocaleDateString()}
            </p>
            <h5 style={{ borderLeft: `0px solid #f34566`, margin: 0, padding: 10, color: '#4a90e2' }}> Task description</h5>
            <div className="task-description">
                <textarea className="custom-textarea"
                    type="text"
                    value={textArea}
                    onChange={handleOnblur}
                    onBlur={handleOnblur}
                />
            </div>
            {/* Rendering subtasks */}
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
            <div>
                {isModalOpen && <SubTaskModal onClose={closeModal} onAddSubTask={handleAddSubTask} />}
                {!isModalOpen &&
                    <button className="add-sub-task" onClick={() => setIsModalOpen(true)}>
                        Add SubTask
                    </button>}
            </div>
        </div>
    );
}
