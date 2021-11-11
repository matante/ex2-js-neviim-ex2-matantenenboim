/** in this i implemented a page to build a tasks list.
 * i made this by using javascript and DOM manipulations.
* */


/** this is the private scope, which holds functions and members*/
let TodoList = (() => {
    let publicData = {}; // this object will be returned

    let todos = []; // my primary data structure which holds all of the todos

    // function: add a new task to the array
    publicData.addTodo = function (newTodo) {
        todos.push(newTodo);
    };

    // class which hold information regarding a task
    publicData.Todo = class Todo {
        constructor(title, description, priority) {
            this.title = title;
            this.description = description;
            this.priority = priority;
        }

        // getters
        getTaskTitle() { // as name indicates
            return this.title;
        }
        getTaskDesc() { // as name indicates
            return this.description;
        }
        isPrioritized() { // returns whether this task is prioritized
            return this.priority;
        }
    }; // end of class


    // function: used to build text which will be returned into object's innerHTML
    publicData.buildHTMLTodoList = function (showPrioritizeOnly) {

        let result = ""; // return value, empty by default
        for (let t of todos) { // for each task,
            if (showPrioritizeOnly && !t.priority) // used for the "show high priority" - if the button is pressed,
                // and the task is not important, don't add it to the result
                continue;
            result += `<div class="card ${t.isPrioritized() ? "bg-danger bg-opacity-25" : ""}"> <div class="card-body">
            <h5 class="card-title>">${t.getTaskTitle()}</h5>
            <p class="card-text">${t.getTaskDesc()}</p>
            <button type="button" name="deleteBtn" class="btn btn-danger btn-outline-dark" >Delete Todo</button>
            </div> </div> <br>` ;
        } // add the information and the design for the task
        return result;
    };

    // function: used for the validation part, checks if a task with the same title already appears in the array
    publicData.titleAlreadyAppears = function (otherTitle) {
        for (const t of todos) {
            if (t.title === otherTitle)
                return true;
        }
        return false;
    };

    publicData.sortTodos = function () {
        todos.sort(function (a, b) {
            const [A, B] = [a.title, b.title];
            return (A < B) ? -1 : (A > B) ? 1 : 0;
        });
    };

    // function: used to hide everything but the picture and title, and show only high priority tasks
    publicData.emphasize = function () {
        const hide = document.getElementById("belowTitle"); // the part of the html i want to hide
        hide.classList.add("d-none"); // hide

        let back = document.getElementById("back"); // the part of the page where the "back" btn will be at
        let btn = document.createElement("button");
        let area = document.getElementById("highPriorityArea"); // the area under the button which will
                            // contain the important tasks

        btn.setAttribute("type", "button");
        btn.setAttribute("id", "backBtn");
        btn.setAttribute("class", "btn btn-success btn-outline-dark");
        btn.classList.add("col-3"); // make it shorter
        btn.textContent = "Back";

        // inner function: add listener for the "back" btn
        btn.addEventListener("click", function () {
            area.innerHTML = ""; // remove the html of the important tasks
            hide.classList.remove("d-none"); // un-hide
            btn.remove(); // the "back" button
            document.getElementById("todosList").innerHTML = publicData.buildHTMLTodoList(false);
            // to restore only the todos which not deleted while emphasised
        }); // end of listener

        back.append(btn);
        area.innerHTML = "<br>" + TodoList.buildHTMLTodoList(true); // show all of the tasks in the right
        // place

    }; // end of emphasize function

    // function: go over all of the delete buttons and connect each task in the html to the corresponding cell in the array
    publicData.addDeleteButtonsListeners = function () {
        const buttons = document.getElementsByName("deleteBtn");
        for (let b of buttons) { // for each delete btn
            b.addEventListener("click", function () { // add a listener
                const title = b.parentElement.firstElementChild.innerHTML; // get the title
                for (let t of todos) { // for each task in the array
                    if (t.getTaskTitle() === title) { // found
                        todos.splice(todos.indexOf(t), 1); // remove task
                        break;
                    }
                }
                b.parentElement.parentElement.nextElementSibling.remove(); // the <br>
                b.parentElement.parentElement.remove(); // the card
            }); // end of listener
        } // end of for
    };// end of function

    return publicData; // which now contains all of the functions
})(); // end of the TodoList private scope


// function: used to get a string, and print this as an error in the right place
function printError(givenError) {
    const errors = document.getElementById("inputErrors");  //locate the right place to add
    if (errors.hasChildNodes()) { // in case an error already appears, skip
        return;
    }
    errors.innerHTML = `<div class="card bg-danger bg-opacity-25" id="inputError"> <div class="card-body"
 <p class="card-text"> ${givenError} </p></div> </div> <br>` ; // add the design and text into the html
} // end


// function: used to clear old errors, if there are any previous errors, so new one can be shown
function clearOldErrors() {
    let list = document.getElementById("inputErrors");
    while (list.firstChild) { // still have a child
        list.removeChild(list.lastChild); // remove and proceed
    }
} // end



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

    if (TodoList.titleAlreadyAppears(titleStr)) {
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
} // end of validation


// add listeners for events
document.addEventListener('DOMContentLoaded', (event) => { // wait for page to load

    // function: used to build the html list as described above, and show it in the right place in the page
    const refreshList = function () {
        document.getElementById("todosList").innerHTML = TodoList.buildHTMLTodoList(false);
        TodoList.addDeleteButtonsListeners();
    };



    // listener for Add btn
    document.getElementById("addSubmit").addEventListener('click', function () {
        if (!isValidInput()) {  // if input is bad, no need to make new task. the function will print the error
            return;
        }

        TodoList.addTodo(new TodoList.Todo(document.getElementById("todoTitle").value.trim(),
            document.getElementById("todoDescription").value.trim(),
            document.getElementById("priorityCheckbox").checked));
        // ↑ delivering new TodoList object


        document.getElementById("todoTitle").value = // both the title and the description
            document.getElementById("todoDescription").value = ""; // make them empty strings
        document.getElementById("priorityCheckbox").checked = false; // reset check box

        refreshList();
    }); // end of listener add

    // listener for Sort btn
    document.getElementById("sortBtn").addEventListener("click", function () {
        TodoList.sortTodos();
        refreshList();
    }); // end of listener sort

    // listener for High Priority btn
    document.getElementById("priorityBtn").addEventListener("click", function () {
        TodoList.emphasize();
        refreshList();
    }); // end of listener show high

}); // end of listeners
