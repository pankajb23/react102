import React, { useState, useEffect } from "react";
import Task from "./Task"; // Assuming the Task component from earlier
import '../css/WelcomePage.css';
import TaskModal from "./TaskModal";
import plusImage from "../img/plus_image.jpg"

const taskList = [
    {
        id: 1,
        name: "Sprint 71",
        description: "",
        createdBy: "John Doe",
        createdDate: "2024-05-01",
        colorCode: "#ff6347",
        subtasks: [
            { id: 1, name: "DBT gem changes", description: "Update the gem versions", createdAt: "2024-05-01", dueDate: "2024-05-10", isCompleted: false },
            { id: 2, name: "Testing", description: "Run integration tests", createdAt: "2024-05-02", dueDate: "2024-05-09", isCompleted: true },
        ],
    },
    {
        id: 2,
        name: "Diagnostics incrementally",
        description: "",
        createdBy: "Jane Smith",
        createdDate: "2024-04-29",
        colorCode: "#4caf50",
        subtasks: [
            { id: 3, name: "Fix navigation issues", description: "Handle onChange in forms", createdAt: "2024-04-29", dueDate: "2024-05-03", isCompleted: false },
        ],
    },
];

export default function TaskLayout() {
    const [selectedTask, setSelectedTask] = useState(null);
    const [showWelcomePage, setShowWelcomePage] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [allTasks, setTasks] = useState(taskList);

    const handleTaskClick = (task) => {
        setSelectedTask(task);
        console.log("Updating selected task " + JSON.stringify(task));
        setShowWelcomePage(false); // Hide the welcome page when a task is selected
    };

    const handleDeleteTask = (taskId) => {
        // Implement task delete logic here
        const updatedTasks = allTasks.filter(task => task.id !== taskId);

        // Update the state with the filtered tasks
        setTasks([...updatedTasks]);

        console.log("Deleted Task with ID:", taskId);
    };

    const handleDeleteSubtask = (taskId, subtaskId) => {
        // Implement subtask delete logic here

        const updatedTasks = allTasks.map(task => {
            if (task.id === taskId) {
                // Filter out the subTask with the matching subTaskId
                const updatedSubTasks = task.subtasks.filter(subTask => subTask.id !== subtaskId);
                const newTask = { ...task, subtasks: updatedSubTasks };
                if (selectedTask && selectedTask.id === taskId) {
                    handleTaskClick(newTask);
                }
                // Return a new task object with updated subTasks
                return newTask;
            } else {
                // Return the task as is if it doesn't match the taskId
                return task;
            }
        });
        console.log("Delete Subtask with ID:" + subtaskId + " and taskId " + taskId + " and json of the rest of the tasks " + JSON.stringify(updatedTasks));
        setTasks([...updatedTasks]);
    };

    const handleToggleSubtaskComplete = (taskId, subtaskId) => {
        // Implement subtask toggle logic here
        console.log("Toggle Subtask Complete with ID:" + subtaskId + "\t" + " taskID " + taskId);
        const updatedTasks = allTasks.map(task => {
            if (task.id === taskId) {
                const newTask = {
                    ...task, subtasks: task.subtasks.map((s) => {
                        if (s.id === subtaskId) {
                            return { ...s, isCompleted: !s.isCompleted };
                        } else {
                            return s;
                        }
                    })
                }
                if (selectedTask && selectedTask.id === taskId) {
                    handleTaskClick(newTask);
                }
                return newTask;
            } else {
                // Return the task as is if it doesn't match the taskId
                return task;
            }
        });
        console.log("toggle subtasks ");
        setTasks([...updatedTasks]);
    };

    const handleAddTask = (newTask) => {
        setTasks([...allTasks, newTask]);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
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


    if (showWelcomePage) {
        return (<div><WelcomePage onContinue={() => setShowWelcomePage(false)} /></div>);
    } else {
        return (
            <div className="container">
                <div className="heading">Welcome Delta, on your task manager</div>
                <div className="task-layout">
                    <div className="task-list">
                        {allTasks.length > 0 && allTasks.map((task) => (
                            <div
                                key={task.id}
                                className={`task-list-item ${selectedTask && selectedTask.id === task.id ? "selected" : ""}`}
                                onClick={() => handleTaskClick(task)}
                            >
                                <h4>{task.name}</h4>
                                <p>{new Date(task.createdDate).toLocaleDateString()}</p>
                            </div>
                        ))
                        }
                    </div>
                    {/* Right side - Welcome Page or Task description and subtasks */}
                    <div className="task-details">
                        {(selectedTask != null) ?
                            (<Task
                                task={selectedTask}
                                onDeleteTask={handleDeleteTask}
                                onDeleteSubtask={handleDeleteSubtask}
                                onToggleSubtaskComplete={handleToggleSubtaskComplete}
                            />) : <div className="details-placeholder"><p>    No task selected </p></div>
                        }
                    </div>
                </div>
                {/* Modal pop-up for adding a new task */}
                {isModalOpen && <TaskModal onClose={closeModal} onAddTask={handleAddTask} />}
                <div className="floating-plus-container">
                    <img src={plusImage} alt="Add Task"
                        className="floating-plus-sign"
                        onClick={openModal}
                        style={{ width: "50px", height: "50px", objectFit: "cover" }} />
                </div>
            </div>);
    }
}

function WelcomePage({ onContinue }) {
    return (
        <div className="welcome-page">
            <h1>Welcome to Task Manager</h1>
            <p>
                Manage your tasks efficiently. You can view your task list, manage subtasks, </p>
            <br />
            <p> and keep track of your progress.
                Click on a task from the list to get started.
            </p>
            <button className="continue-btn" onClick={onContinue}>
                Continue to Tasks
            </button>
        </div>
    );
}
