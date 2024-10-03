class Subtask {
    constructor(id, name, completed = false) {
      this.id = id;
      this.name = name;
      this.completed = completed;
    }
  
    toggleCompletion() {
      this.completed = !this.completed;
    }
  
    toJSON() {
      return {
        id: this.id,
        name: this.name,
        completed: this.completed
      };
    }
  
    static fromJSON(json) {
      return new Subtask(json.id, json.name, json.completed);
    }
  }
  