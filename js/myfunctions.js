"use strict"

// /* holds information regarding a task, such as: priority, text, completed (should appear)*/
class Todo {
    constructor() {
        this.text = "";
        this.priority = false;
        this.completed = false;
    }

    addText(string) {
        this.text = string;
    }

    setPriority(priority) {
        this.priority = priority;
    }

    getPriority() {
        return this.priority;
    }

    setCompleted() {
        this.completed = true;
    }

    isCompleted() {
        return this.completed
    }
}

console.log("dddddddddddd")