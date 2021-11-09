/*
*
*
*
* */

let TodoList = (() => {
    let publicData = {}; // this object will be returned

    let todos = []; // my primary data structure which holds all of the todos

    publicData.addTodo = function (newTodo) {
        todos.push(newTodo)
    }

    publicData.Todo = class Todo {
        constructor(title, description, priority) {
            this.title = title;
            this.description = description;
            this.priority = priority;
        }

        getTaskTitle() { // as name indicates
            return this.title;
        }

        // ********************************************
        getTaskDesc() { // as name indicates
            return this.description;
        }

        // ********************************************
        isPrioritized() { // returns whether this task is prioritized
            return this.priority;
        }
    }

    publicData.buildHTMLTodoList = function (showPrioritizeOnly) {

        let result = ""
        for (let t of todos) {
            if (showPrioritizeOnly && !t.priority)
                continue;
            result += `<div class="card ${t.isPrioritized() ? "bg-danger bg-opacity-25" : ""}"> <div class="card-body">
            <h5 class="card-title>">${t.getTaskTitle()}</h5>
            <p class="card-text">${t.getTaskDesc()}</p>
            <button type="button" name="deleteBtn" class="btn btn-danger btn-outline-dark" >Delete Todo</button>
            </div> </div> <br>`
        }
        return result
    }

    publicData.titleAlreadyAppears = function (otherTitle){
        for (const t of todos){
            if (t.title === otherTitle)
                return true;
        }
        return false;
    }

    publicData.sortTodos = function () {
        todos.sort(function (a, b) {
            [A, B] = [a.title, b.title];
            return (A < B) ? -1 : (A > B) ? 1 : 0;
        })
    }

    publicData.emphasize = function () {
        const hide = document.getElementById("belowTitle")
        hide.classList.add("d-none")

        let back = document.getElementById("back")
        let btn = document.createElement("button");
        let area = document.getElementById("highPriorityArea")

        btn.setAttribute("type", "button");
        btn.setAttribute("id", "backBtn");
        btn.setAttribute("class", "btn btn-success btn-outline-dark");
        btn.classList.add("col-3"); // make it shorter
        btn.textContent = "Back";


        btn.addEventListener("click", function (){
            area.innerHTML = ""
            hide.classList.remove("d-none")
            btn.remove()
            document.getElementById("todosList").innerHTML = publicData.buildHTMLTodoList(false) // to restore only the todos which not deleted while emphasised
        })

        back.append(btn)
        area.innerHTML = "<br>" + TodoList.buildHTMLTodoList(true)



    }

    publicData.print = function () {
        console.log(todos)
        for (let t of todos)
            console.log(t)
    }



    publicData.addDeleteButtonsListeners = function () {
        const buttons = document.getElementsByName("deleteBtn")

        for (let b of buttons) {

            b.addEventListener("click", function () {

                const title = b.parentElement.firstElementChild.innerHTML
                for (let t of todos) {
                    if (t.getTaskTitle() === title) {
                        todos.splice(todos.indexOf(t), 1)
                        break
                    }
                }
                b.parentElement.parentElement.nextElementSibling.remove() // the <br>
                b.parentElement.parentElement.remove() // the card
            })
        }

    }
    return publicData;
})();

function printError(givenError) {
    const errors = document.getElementById("inputErrors");  //locate the right place to add
    if (errors.hasChildNodes()) {
        // in case an error already appears, skip
        return;
    }
    errors.innerHTML = `<div class="card bg-danger bg-opacity-25" id="inputError"> <div class="card-body"
 <p class="card-text"> ${givenError} </p></div> </div> <br>`
}

function clearOldErrors() {
    let list = document.getElementById("inputErrors");
    while (list.firstChild) { // still have a child
        list.removeChild(list.lastChild);
    }
}

function isValidInput() {
    //first, check for valid title
    const title = document.getElementById("todoTitle");
    const titleStr = title.value.trim(); // remove white spaces
    if (titleStr === "") { // empty
        printError("please enter a non empty title with letters and digits only");
        // call function with this text
        return false; // and no need of more checks
    }

    // reached here ==> title is not empty, can remove old alert (if exists)
    clearOldErrors();

    if (TodoList.titleAlreadyAppears(titleStr)){
        printError("please enter a title which not already appears in the list");
        // call function with this text
        return false; // and no need of more checks
    }
    clearOldErrors();

    // now need to check for valid description
    const desc = document.getElementById("todoDescription");
    const descStr = desc.value.trim();
    if (descStr === "") {
        printError("please enter a non empty description");
        return false;
    }
    clearOldErrors();

    //reached here ==> valid.
    return true;
}

document.addEventListener('DOMContentLoaded', (event) => {

    const refreshList = function () {
        document.getElementById("todosList").innerHTML = TodoList.buildHTMLTodoList(false);
        TodoList.addDeleteButtonsListeners();

    }
    document.getElementById("addSubmit").addEventListener('click', function () {
        if (!isValidInput()) {  // if input is bad, no need to make new task. the function will print the error
            return;
        }
        TodoList.addTodo(new TodoList.Todo(document.getElementById("todoTitle").value.trim(),
            document.getElementById("todoDescription").value.trim(),
            document.getElementById("priorityCheckbox").checked));


        document.getElementById("todoTitle").value =
            document.getElementById("todoDescription").value = "";
        document.getElementById("priorityCheckbox").checked = false;

        refreshList()

    }); // end of listener add

    document.getElementById("sortBtn").addEventListener("click", function () {
        TodoList.sortTodos();
        refreshList()

    }); // end of listener sort

    document.getElementById("priorityBtn").addEventListener("click", function (){
        TodoList.emphasize();
        refreshList()

    })




});

//
//
// ///*********/
//
// (function () {
//     "use strict";
//
//     /*
//     Class Todo:
//     holds information regarding a task, such as: priority, title and description.
//
//     members:
//     title - holds the title
//     description - holds the description
//     priority - tells whether this todo is prioritized
//
//     functions:
//     addText, which inserts text to both title and description fields.
//     getter for each member
//     */
//     class Todo {
//         constructor() {
//             this.title = "";
//             this.description = "";
//             this.priority = false;
//         }
//
//         addText() { // insert data from web to the class
//             let title = document.getElementById("todoTitle");
//             this.title = title.value;
//
//             let description = document.getElementById("todoDescription");
//             this.description = description.value;
//
//             let checkbox = document.getElementById("priorityCheckbox");
//             if (checkbox.checked) { // if user chose to prioritize this todo
//                 this.priority = true;
//             }
//
//             // reset html input boxes for the next read
//             title.value = "";
//             description.value = "";
//             checkbox.checked = false;
//         }
//
//         // ********************************************
//         getTaskTitle() { // as name indicates
//             return this.title;
//         }
//         // ********************************************
//         getTaskDesc() { // as name indicates
//             return this.description;
//         }
//         // ********************************************
//         isPrioritized() { // returns whether this todo is prioritized
//             return this.priority;
//         }
//
//     } // end of class
//
//     // ********************************************
//
//     /* utilities functions: used to make html elements */
//     // make h5 element for the title
//     function makeTitle(givenTitle) {
//         const title = document.createElement("h5");
//         title.classList.add("card-title");
//         title.textContent = givenTitle; // insert the title of the new task to the card
//         return title;
//     }
//     // ********************************************
//     // make p element for the description
//     function makeParagraph(givenDesc) {
//         const para = document.createElement("p");
//         para.classList.add("card-text");
//         para.textContent = givenDesc; // insert the description of the new task to the card
//         return para;
//     }
//     // ********************************************
//     // make btn element for the delete button
//     function makeButton() {
// <button
//<button type="button" id="deleteBtn" class="btn btn-danger btn-outline-dark" col-3>Delete Todo</button>

//         const button = document.createElement("button");
//         // make the right settings for the delete button
//         button.setAttribute("type", "button");
//         button.setAttribute("id", "deleteBtn");
//         button.setAttribute("class", "btn btn-danger btn-outline-dark");
//         button.classList.add("col-3"); // make it shorter
//         button.textContent = "Delete Todo";
//         return button;
//     }
//
//     // ********************************************
//     /*errors handling functions*/
//     //prints an error according to the type (missing title or missing description)
//     function printError(givenError) {
//         const errors = document.getElementById("inputErrors");  //locate the right place to add
//
//         if (errors.hasChildNodes()) { // in case an error already appears, skip
//             return;
//         }
//
//         const div = document.createElement("div"); // make a new div
//         const para = makeParagraph(givenError);
//
//         div.classList.add("card");// add class "card" which will contain the paragraph ↑
//         div.classList.add("bg-danger");
//         div.classList.add("bg-opacity-25");
//         div.classList.add("mb-3");// to separate between cards
//
//         div.append(para);
//         errors.append(div);
//
//     }
//
//     // ********************************************
//     // remove all the elements add by the printError function
//     function clearOldErrors() {
//         let list = document.getElementById("inputErrors");
//         console.log(list)
//         while (list.firstChild) { // still have a child
//             list.removeChild(list.lastChild);
//         }
//     }
//
//     // ********************************************
//     // used to tell if the input is valid
//     function isValidInput() {
//         //first, check for valid title
//         const title = document.getElementById("todoTitle");
//         const titleStr = title.value.trim(); // remove white spaces
//         if (titleStr === "") { // empty
//             printError("please enter a non empty title with letters and digits only");
//             // call function with this text
//             return false; // and no need of more checks
//         }
//
//
//         // reached here ==> title is ok, can remove old alert (if exists)
//         clearOldErrors();
//
//         // now need to check for valid description
//         const desc = document.getElementById("todoDescription");
//         const descStr = desc.value.trim();
//         if (descStr === "") {
//             printError("please enter a non empty description");
//             return false;
//         }
//
//         clearOldErrors();
//
//         //reached here ==> valid.
//         return true;
//     }
//     // ********************************************
//     /* functions affecting the way the site is shown*/
//     // used to sort the todos by their title, alphabet, descending
//     function sortTodos() {
//         let list = document.getElementById("todosList");  // clear old todos
//         while (list.firstChild) {
//             list.removeChild(list.lastChild);
//         }
//
//         tasks.sort(function (a, b) { // a sorting function for titles
//             let A = a.title;
//             let B = b.title;
//             return (A < B) ? -1 : (A > B) ? 1 : 0;
//         });
//
//         for (const todo of tasks) {
//             styleAndAddTodo(todo);
//         }
//     }
//     // ********************************************
//     // used to hide the not prioritized todos
//     function highlightPrioritized() {
//         // const list = document.querySelectorAll("body");
//         // console.log(list)
//         const list = document.getElementsByClassName("regular");  //locate the right place to add
//         for (let regular of list) {
//             regular.classList.toggle("d-none"); // toggle hiding
//         }
//     }
//
//     // ********************************************
//     // used to add a new todo to the array and to the html
//     function addNewTodo() {
//         // insert the new todo to the array
//         if (!isValidInput()) {  // if input is bad, no need to make new todo. the function will print the error
//             return;
//         }
//
//         tasks.push(new Todo());
//         const currTask = tasks[tasks.length - 1]; // last added
//         currTask.addText(); // insert the values
//
//         styleAndAddTodo(currTask);
//     }
//
//     // ********************************************
//     // this function used to set all the html elements of a todo
//     function styleAndAddTodo(todo) {
//         /* make the properties for the html file */
//         const list = document.getElementById("todosList");  //locate the right place to add
//         const div = document.createElement("div"); // make a new div
//
//         const title = makeTitle(todo.getTaskTitle());// make a new title
//         const para = makeParagraph(todo.getTaskDesc()); // make a new description
//         const btn = makeButton(); // make a new delete button
//
//         div.classList.add("card"); // add class "card" which will contain all of these ↑
//
//         if (todo.isPrioritized()) { // make the background more dominant
//             div.classList.add("bg-danger");
//             div.classList.add("bg-opacity-25");
//         } else { // not
//             div.classList.add("regular"); // so we can find it later to hide it
//
//             let priorityBtn = document.getElementById("priorityBtn");//***********************************************************
//             if (priorityBtn.classList.contains("active")) { // if site is on "priority only" mode -> hide new todo
//                 div.classList.add("d-none");
//             }
//         }
//
//         div.classList.add("mb-3"); // to separate between cards
//
//         // listener for click
//         btn.addEventListener('click', function () {
//             const currTitle = this.previousSibling.previousSibling.textContent; // the way i built it, the title is always
//             // 2 "brothers" before the delete button in the html file
//
//             for (let task of tasks) { // go over the tasks array
//                 if (task.getTaskTitle() === currTitle) { // found the task need to be deleted
//                     tasks.splice(tasks.indexOf(task), 1); // remove it
//                     break;
//                 }
//             }
//             div.remove(); // from html
//         }); // end of listener
//
//         // all elements ready, insert title, description and button to the card, and add the card to html
//         div.append(title);
//         div.append(para);
//         div.append(btn);
//         list.append(div);
//     }
//     // ********************************************
//
//
//
//     // events listeners:
//     document.addEventListener("DOMContentLoaded", function () {
//
//         document.getElementById("addSubmit").addEventListener('click', function () {
//             addNewTodo();
//         });
//         document.getElementById("sortBtn").addEventListener('click', function () {
//             sortTodos();
//         });
//         document.getElementById("priorityBtn").addEventListener('click', function () {
//             highlightPrioritized();
//         });
//
//     }); // end of listeners
//
// })(); // end of closure
//
//
// let tasks = []; // my primary data structure which holds all of the todos