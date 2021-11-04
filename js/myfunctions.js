"use strict"

// /* holds information regarding a task, such as: priority, text, completed (should appear)*/
class Todo {
    constructor() {
        this.text = "";
        this.description = ""
        this.priority = false;
        this.completed = false;
    }

    addText() {
        let title = document.getElementById("todoTitle");
        this.text = title.value;

        let description = document.getElementById("todoDescription");
        this.description = description.value

        let checkbox = document.getElementById("priorityCheckbox");
        if (checkbox.checked) {
            this.priority = true;
        }

        title.value = "";
        description.value = ""
        checkbox.checked = false;

    }

    getTask() {
        return this.text;
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
        return this.completed;
    }
}

const tasks = [];

function addNewTodo() {
    tasks.push(new Todo());
    tasks[tasks.length - 1].addText();
}


document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("addSubmit").addEventListener('click', function () {
        addNewTodo()
    });
    let prioBtn = document.getElementById("priorityBtn");
    prioBtn.addEventListener('click', function (){
        //prioBtn.classList.toggle("btn-Success");

    })


});


console.log("dddddddddddd")