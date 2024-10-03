import Subtask  from "./SubTaskModel.js";

class Task {
    constructor(id, name, description='', createdBy, createdAt, subtasks = [], colorCode = '#ffffff') {
        this.id = id;
        this.name = name;
        this.description = description;
        this.createdAt = createdAt;
        this.createdBy = createdBy;
        this.subtasks = subtasks;
        this.colorCode = colorCode;
    }

    addSubTask(name) {
        const id = this.subtasks.length + 1;
        this.subtasks.push(new Subtask(id, name));
    }

    removeSubtask(subtaskId) {
        this.subtasks = this.subtasks.filter(st => st.id !== subtaskId);
    }

    toggleSubtaskCompletion(subtaskId) {
        const subtask = this.subtasks.find(st => st.id === subtaskId);
        if (subtask) {
            subtask.toggleCompletion();
        }
    }

    updateName(newName) {
        this.name = newName;
    }

    updateDescription(newDescription) {
        this.description = newDescription;
    }

    updateColorCode(newColorCode) {
        this.colorCode = newColorCode;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            createdDate: this.createdDate.toISOString(),
            subtasks: this.subtasks.map(st => st.toJSON()),
            colorCode: this.colorCode
        };
    }

    static fromJSON(json) {
        return new Task(
            json.id,
            json.name,
            json.description,
            json.createdDate,
            json.subtasks.map(st => Subtask.fromJSON(st)),
            json.colorCode
        );
    }
}
