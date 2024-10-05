import React, { createContext, useReducer } from 'react';

export const TaskContext = createContext();

const initialState = {
    tasks: [
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
    ]
};


const ActionTypes = {
    AddTask: "AddTask",
    RemoteTask: "RemoveTask",
    ModifyTask: "ModifyTask",
    AddSubtask: "AddSubTask",
    RemoteSubTask: "RemoveSubTask",
    ModifySubTask: "ModifySubTask"
}

let taskId = initialState.tasks.length;

function taskReducer(state, action){
    switch(action.type){
        case ActionTypes.AddTask:
            return  {
                ...state, 
                tasks: [...state.tasks, action.payload]

            }

            
    }
}