let countValue = document.getElementById("countingValue")
let celebration = document.getElementById("celebration")
const completedTask = []
const searchParams = new URLSearchParams(window.location.search)

// Needed help with some parts of this
async function getCount(callback) {
    console.log("sending username to query")
    let username = searchParams.get("username")
    const response = await fetch('/numTasks', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"username": username})
    })
    const json = await response.json()
    console.log(JSON.stringify(json))
    callback(json)
}
getCount((countDb) => {
    let count = countDb;
    setCount(count)
    if (Number(count) === 0){
        celebrate(count).then(null)
    } else{
        celebrate(count).then(null)
        console.log("UwU")
        displayTasks((taskArray) => {
            taskArray.forEach(x => {
                display(x).then(null)
            })
        }).then(null)
    }
}).then(null)

async function setCount(count) {
    countValue = await(document.getElementById("countingValue"))
    countValue.textContent = await ("Task Count: " + count);
}

async function display(x){
    console.log(x.task)
    const taskValue = x.task;
    const checkbox = await(document.createElement("input"))
    checkbox.type = await("checkbox")

    const taskText = await(document.createTextNode(taskValue))
    const taskList = await(document.getElementById("list"))
    const lineBreak = await(document.createElement("br"))
    const taskItems = await(document.createElement("div"))
    taskItems.className = await("taskLists")

    await (taskItems.appendChild(checkbox))
    await (taskItems.appendChild(taskText))
    await (taskItems.appendChild(lineBreak))

    // Adds all the tasks in a list to show the full tasks
    await (taskList.appendChild(taskItems))
    await (
        checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            celebration.style.display = "block";
            celebration.textContent = "Marked tasks will be removed upon reload";
            completeTask(taskValue, x-1)
        }
        else {
            taskIncrement()
        }
    })
    )
}

async function celebrate(count){
    if (count === 0) {
        celebration = document.getElementById("celebration")
        celebration.style.display = await ("block");
        celebration.textContent = await ("Tasks Completed!");
    } else{
        celebration.style.display = await ("none");
    }
}



//Tasks saved in db must be loaded
async function displayTasks(callback){
    console.log("displaying tasks")
    let username = searchParams.get("username")
    const response = await fetch('/tasks', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"username": username})
    })
    const json = await response.json()
    console.log(JSON.stringify(json))
    callback(json)
}

function addTask() {

    const taskValue = document.getElementById("taskName").value
    const checkbox = document.createElement("input")
    checkbox.type = "checkbox"

    const taskText = document.createTextNode(taskValue)
    const taskList = document.getElementById("list")
    const lineBreak = document.createElement("br")

    if (taskValue !== "") {
        //Creating a div tag to store the tasks in and assigning it a class to store the tasks
        const taskItems = document.createElement("div")
        taskItems.className = "taskLists"

        taskItems.appendChild(checkbox)
        taskItems.appendChild(taskText)
        taskItems.appendChild(lineBreak)

        // Adds all the tasks in a list to show the full tasks
        taskList.appendChild(taskItems)

        taskIncrement()
        celebration.textContent = "";
        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                celebration.style.display = "block";
                celebration.textContent = "Marked tasks will be removed upon reload";
                completeTask(taskValue, taskText.value)
            }
            else {
                taskIncrement()
            }
        })
        getCount((countDb) => {
            let count = countDb;
            Do().then(null)
            async function Do(){
                await (submitTask(searchParams.get("username"), count + 1, taskValue).then(null))
            }


        }).then(null)
    }
    else {
        alert("Please add a task!")
    }
}



async function submitTask(username, count, task) {
    console.log("submitting task")
    const response = await fetch('/createTask', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"username": username, "task_number": count, "task": task})
    })
    const json = await response.json()
    console.log(JSON.stringify(json))
}

function taskIncrement() {
    getCount((countDb) => {
        let count = countDb;
        count +=1
        console.log(count)
        setCount(count).then()
        if (count === 0){
            celebration.textContent = "Tasks Completed!"
        } else{
            displayTasks((taskArray) => {
                taskArray.forEach(task => {
                    console.log(task)
                })
            }).then(null)
        }
    }).then(null)
}

function completeTask(taskValue) {
    console.log(taskValue)
    getCount((countDb) => {
        let count = countDb;
        if (count > 0) {
            count -= 1
            setCount(count).then()
            console.log(taskValue)
            completedTask.push(taskValue)
            removeTask((taskNum) => {
                const deleteNum = taskNum.task_number;
                console.log(deleteNum)
                findUpdates((taskNums) => {
                    for (let i = 0; i < taskNums.length; i++) {
                        setNumber(deleteNum + i, taskNums[i].task_number);
                    }
                }, deleteNum)
            }, taskValue)
        }
        else {
            celebration.textContent = "Tasks Completed!"
        }
    }).then(null)
}

async function removeTask(callback, task){
    console.log("remove task")
    const username = searchParams.get("username")
    const response = await fetch('/removeTask', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"username": username, "task": task})
    })
    const json = await response.json()
    console.log(JSON.stringify(json))
    callback(json)
}

async function setNumber(newNumber, currentNumber){
    console.log("setNumber")
    const username = searchParams.get("username")
    const response = await fetch('/updateTask', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"username": username, "task_number": newNumber, "currentNum": currentNumber})
    })
    const json = await response.json()
    console.log(JSON.stringify(json))
}

async function findUpdates(callback, deletedNum){
    console.log("find updates")
    const username = searchParams.get("username")
    const response = await fetch('/findUpdate', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"username": username, "task_number": deletedNum})
    })
    const json = await response.json()
    console.log(JSON.stringify(json))
    callback(json)
}

function clearTasks() {
    let text = confirm("Are you sure you want to clear all tasks?")
    if (confirm(text) === true){
    taskList = document.getElementById("list")
    taskList.textContent = ""
    let count = 0
    dbClear().then(null)
    setCount(count).then(null)
    document.getElementById("taskName").value = ""
    }
}

async function dbClear(){
    const username = searchParams.get("username")
    const response = await fetch('/clearTasks', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"username": username})
    })
    const json = await response.json()
    console.log(JSON.stringify(json))
}