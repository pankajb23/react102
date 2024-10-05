import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tasks: [
        {
            id: 1,
            name: "Sprint 71",
            description: "Omega delta gamma",
            createdBy: "John Doe",
            createdDate: "2024-05-01",
            colorCode: "#ff6347",
            subtasks: [
                { id: 1, name: "DBT gem changes", description: "Update the gem versions", createdAt: "2024-05-01", dueDate: "2024-05-10", status: "In Progress" },
                { id: 2, name: "Testing", description: "Run integration tests", createdAt: "2024-05-02", dueDate: "2024-05-09", status: "Not Started" },
            ],
        },
        {
            id: 2,
            name: "Diagnostics incrementally",
            description: "Ergo sum",
            createdBy: "Jane Smith",
            createdDate: "2024-04-29",
            colorCode: "#4caf50",
            subtasks: [
                { id: 3, name: "Fix navigation issues", description: "Handle onChange in forms", createdAt: "2024-04-29", dueDate: "2024-05-03", status: "Not Started" },
            ],
        },
    ],
    selectedTask: 1 // only attach taskId here. 
};

const ActionTypes = {
    AddTask: "AddTask",
    RemoteTask: "RemoveTask",
    ModifyTask: "ModifyTask",
    AddSubtask: "AddSubTask",
    RemoteSubTask: "RemoveSubTask",
    ModifySubTask: "ModifySubTask"
}

let IdGenerator = 3;

const nestedDataSlice = createSlice({
    name: 'nestedData',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push({
                id: IdGenerator++,
                name: action.payload.name,
                description: action.payload.description,
                createdBy: action.payload.createdBy,
                createdDate: action.payload.createdDate
            });
        },
        addSubTask: (state, action) => {
            const { taskId, subTaskName, description, startDate, dueDate } = action.payload;
            const task = state.tasks.find(task => task.id === taskId);
            if (task) {
                let subTaskId;
                if (!task.subtasks || task.subtasks.length === 0) {
                    subTaskId = 1;
                    task.subtasks.push([]);    // pushing empty array.
                } else {
                    subTaskId = task.subtasks.reduce((max, obj) => obj.id > max.id ? obj : max, task.subtasks[0]) + 1;
                }
                task.subtasks.push({
                    id: subTaskId,
                    name: subTaskName,
                    description: description,
                    startDate: startDate,
                    endDate: dueDate
                });
            }
        },
        updateSubTaskAttribute: (state, action) => {
            const { taskId, subTaskId, attribute, value } = action.payload;
            console.log("Payload " + JSON.stringify(action.payload));
            console.log("Updating subtask attribute " + taskId + " " + subTaskId + " " + attribute + " " + value);
            const task = state.tasks.find(task => task.id === taskId);
            if (task) {
                const subtask = task.subtasks.find(subTask => subTaskId == subTask.id);
                if (subtask) {
                    subtask[attribute] = value;
                }
            }
        },
        removeTask: (state, action) => {
            const { id } = action.payload;
            state.tasks = state.tasks.filter(task => task.id !== id);
        },
        removeSubTask: (state, action) => {
            const { taskId, subTaskId } = action.payload;
            const task = state.tasks.find(task => task.id === taskId);
            if (task) {
                task.subtasks = task.subtasks.filter(subtask => subtask.id !== subTaskId);
            }
        },
        updateTaskAttribute: (state, action) => {
            const { taskId, attribute, value } = action.payload;
            const task = state.tasks.find(task => task.id === taskId);
            if (task) {
                task[attribute] = value;
            }
        },
        selectTask: (state, action) => {
            const { task } = action.payload;
            const selectedTask = state.tasks.find(taskI => taskI.id === task.id);
            if (task) {
                state.selectedTask = task.id;
            }
        }
    },
});

export const { addTask, addSubtask, updateSubTaskAttribute, removeTask, removeSubtask, selectTask } = nestedDataSlice.actions;

// Selectors
export const selectAllTasks = state => state.nestedData.tasks;
export const selectTaskById = (state, taskId) => state.nestedData.tasks.find(task => task.id === taskId);
export const getSelectedTask = state => state.nestedData.tasks.find(task => task.id === state.nestedData.selectedTask);
export const getSelectedSubTask = (state, taskId, subTaskId) => {
    const task = state.nestedData.tasks.find(task => task.id === taskId);
    if (task) {
        const subtask = task.subtasks.find(subtask => subtask.id === subTaskId);
        console.log("Subtask " + JSON.stringify(subtask));
        return subtask;
    }
    return null;
}


export default nestedDataSlice.reducer;