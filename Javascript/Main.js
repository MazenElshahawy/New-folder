/*Variables*/
const input = document.querySelector(".input");
const submit = document.querySelector(".add")
const tasksdiv = document.querySelector(".tasks")
const remove = document.querySelector(".remove")

// Empty array

let arrayOfTasks = [];


//check if there is tasks in local storage

if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

//triger
getDataFromLocalStorage();

/*  Functions of adding task */

submit.addEventListener("click", (eo) => {
    if (input.value !== "") {
        addTaskToArray(input.value);
        input.value = "";
    }
})

//click on task element
tasksdiv.addEventListener("click", (e) => {
    //delete button
    if (e.target.classList.contains("del")) {
        //delete task from local storage 
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
        //delete task from page
        e.target.parentElement.remove();
    }

    // task element
    if (e.target.classList.contains("task")) {
        //toggle completed for the task 
        toggleStatusTaskWith(e.target.getAttribute("data-id"))
        //toggle done class 
        e.target.classList.toggle("done")
    }
})


/*  Functions of adding task to Array */

function addTaskToArray(tasktext) {
    //Task Data 
    const task = {
        id: Date.now(),
        title: tasktext,
        completed: false,
    }

    //push task to array of tasks
    arrayOfTasks.push(task);



    //add tasks to page 
    addElementsToPageFrom(arrayOfTasks);

    // add tasks to local storage
    addDataToLocalStorageFrom(arrayOfTasks);

}

// function of earase all tasks 

remove.addEventListener("click", (e) => {
    window.localStorage.removeItem("tasks")
    tasksdiv.innerHTML = ""
    location.reload()
})

function addElementsToPageFrom(arrayOfTasks) {
    //empty the tasks Div
    tasksdiv.innerHTML = ""; 
    //loobing array of tasks 
    arrayOfTasks.forEach((task) => {
        //create main Div
        let div = document.createElement("div");
        div.className = "task";
        //check if task is done or not
        if (task.completed == true) {
            div.className = "task done"
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));
        //create Delete button 
        const span = document.createElement("span")
        span.className = "del"
        span.appendChild(document.createTextNode("Delete"))
        div.appendChild(span)
        // add tasks div to the page 
        tasksdiv.appendChild(div)
    });
}


function addDataToLocalStorageFrom(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("tasks")
    if (data) {
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks);
    }
}


function deleteTaskWith(taskId) {
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId)
    addDataToLocalStorageFrom(arrayOfTasks);
}


function toggleStatusTaskWith(taskId) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
        arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false)
    }
    }
addDataToLocalStorageFrom(arrayOfTasks);
} 
