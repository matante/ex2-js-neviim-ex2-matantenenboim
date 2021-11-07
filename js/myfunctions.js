"use strict"

// /* holds information regarding a task, such as: priority, text, completed (should appear)*/
class Todo {
    constructor() {
        this.title = "";
        this.description = ""
        this.priority = false;
        this.completed = false;
    }

    addText() {
        let title = document.getElementById("todoTitle");
        this.title = title.value;

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

    getTaskTitle() {
        return this.title;
    }

    getTaskDesc() {
        return this.description;
    }

    setPriority(priority) {
        this.priority = priority;
    }

    isPrioritized() {
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
    const currTask = tasks[tasks.length - 1]
    currTask.addText();

    const list = document.getElementById("todosList")
    const div1 = document.createElement("div")
    const div2 = document.createElement("div")
    const h5 = document.createElement("h5")
    const para = document.createElement("p")

    div1.classList.add("card")
    if (currTask.isPrioritized()) {
        div1.classList.add("bg-danger")
        div1.classList.add("bg-opacity-25")
        // div1.style.background.opacity = "0.25"
    }


    h5.classList.add("card-title")
    h5.textContent = currTask.getTaskTitle()

    para.classList.add("card-text")
    para.textContent = currTask.getTaskDesc()

    div2.append(h5)
    div2.append(para)

    div1.append(div2)
    list.append(div1)


}


document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("addSubmit").addEventListener('click', function () {
        addNewTodo()
    });
    let prioBtn = document.getElementById("priorityBtn");
    prioBtn.addEventListener('click', function () {
        //prioBtn.classList.toggle("btn-Success");

    })


});

function displayTodos() {

    document.getElementById("list").value = tasks[0].text
}

console.log("dddddddddddd")
//displayTodos()