import Task from "./TaskModel.js";

class AllTasks {
    constructor(allTasks) {
        this.allTasks = allTasks;
        this.counter = 0;
        this.taskMap = new Map()
        if (this.allTasks && this.allTasks.length > 0) {
            this.allTasks.foreach((t1) => {
                this.taskMap.set(this.counter++, t1);
            })
        }
    }

    removeTask(id) {
        this.allTasks.filter(task => task.id !== id);
    }

    addTask(name, createdBy, createdAt, description = '') {
        let task = new Task(this.counter, name, description, createdBy, createdAt);
        this.allTasks.push(task);
        this.taskMap.set(this.counter, task);
        return this.counter++;
    }

    addSubTasks(id, subTaskName, description, createdAt) {
        let t = this.taskMap.get(id)
        if (t) {
            t.addSubTask(subTaskName, description, createdAt);
        }
    }
}