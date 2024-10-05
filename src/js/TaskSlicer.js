import { createSlice } from '@reduxjs/toolkit';

function loadStateFromLocalStorage() {
    try {
        console.log("Loading state from local storage");
        const serializedState = localStorage.getItem('nestedDataState');
        if (serializedState === null) {
            return undefined; // No state saved in localStorage
        }
        return JSON.parse(serializedState);
    } catch (e) {
        console.warn('Failed to load state from localStorage:', e);
        return undefined;
    }
}

const initialState = loadStateFromLocalStorage() || {
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
            const { name, description, createdBy, createdAt } = action.payload;
            const task = {
                id: IdGenerator++,
                name: name,
                description: description,
                createdBy: createdBy,
                createdDate: createdAt,
                subtasks: []
            };
            console.log("Adding task " + JSON.stringify(task));
            state.tasks.push(task);
            state.selectedTask = task.id;

        },
        addSubTask: (state, action) => {
            const { taskId, subTaskName, description, startDate, dueDate } = action.payload;
            const task = state.tasks.find(task => task.id === taskId);
            if (task) {
                let subTaskId;
                if (!task.subtasks || task.subtasks.length === 0) {
                    subTaskId = 1;
                    // task.subtasks.push([]);    // pushing empty array.
                } else {
                    if (task.subtasks.length === 1) {
                        // If there is only one subtask, set the new ID as the current subtask ID + 1
                        subTaskId = task.subtasks[0].id + 1;
                    } else {
                        // If there are multiple subtasks, find the maximum ID and add 1
                        subTaskId = task.subtasks.reduce((max, obj) => (obj.id > max ? obj.id : max), 0) + 1;
                    }
                }
                const subtask = { id: subTaskId, name: subTaskName, description: description, createdAt: startDate, dueDate: dueDate, status: "Not Started" };
                task.subtasks.push(subtask);
            }
        },
        updateSubTaskAttribute: (state, action) => {
            const { taskId, subTaskId, attribute, value } = action.payload;
            console.log("Payload " + JSON.stringify(action.payload));
            console.log("Updating subtask attribute " + taskId + " " + subTaskId + " " + attribute + " " + value);
            const task = state.tasks.find(task => task.id === taskId);
            if (task) {
                const subtask = task.subtasks.find(subTask => subTaskId === subTask.id);
                if (subtask) {
                    subtask[attribute] = value;
                }
            }
        },
        removeTask: (state, action) => {
            const { taskId } = action.payload;
            console.log("Removing task " + taskId);
            state.tasks = state.tasks.filter(task => task.id !== taskId);
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

export const { addTask, addSubTask, updateSubTaskAttribute, removeTask, removeSubTask, selectTask } = nestedDataSlice.actions;

// Selectors
export const selectAllTasks = state => state.nestedData.tasks;
export const selectTaskById = (state, taskId) => state.nestedData.tasks.find(task => task.id === taskId);
export const getSelectedTask = state => {
    const task = state.nestedData.tasks.find(task => task.id === state.nestedData.selectedTask);
    if (task) {
        return task;
    } else {
        // task is deleleted. 
        if (state.nestedData.tasks.length > 0) {
            state.selectedTask = state.nestedData.tasks[0].id;
        }
        return state.nestedData.tasks[0];
    }
}
export const getSelectedSubTask = (state, taskId, subTaskId) => {
    const task = state.nestedData.tasks.find(task => task.id === taskId);
    if (task) {
        const subtask = task.subtasks.find(subtask => subtask.id === subTaskId);
        return subtask;
    }
    return null;
}


export default nestedDataSlice.reducer;