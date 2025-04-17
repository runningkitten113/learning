let count = 0
let countValue = document.getElementById("countingValue")
let celebration = document.getElementById("celebration")
const completedTask = []

// Needed help with some parts of this

function addTask(event) {
    event.preventDefault() //Prevents the refresh rate that typically happens

    const taskValue = document.getElementById("taskName").value
    const checkbox = document.createElement("input")
    checkbox.type = "checkbox"

    const taskText = document.createTextNode(taskValue)
    const taskList = document.getElementById("list")
    const lineBreak = document.createElement("br")

    if (taskValue !== "") {
        //Creating a div tag to store the tasks in and assigning it a class to store the tasks
        taskItems = document.createElement("div")
        taskItems.className = "taskLists"

        taskItems.appendChild(checkbox)
        taskItems.appendChild(taskText)
        taskItems.appendChild(lineBreak)

        // Adds all the tasks in a list to show the full tasks
        taskList.appendChild(taskItems)

        taskIncrement()

        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                completeTask()
            }
            else {
                taskIncrement()
            }
        })

        //Clears the value
        document.getElementById("taskName").value = ""
    }

    else {
        alert("Please add a task!")
    }
}

function taskIncrement() {
    count += 1
    countValue.textContent = "Task Count: " + count
}

function completeTask(taskValue, taskItem) {
    if (count > 0) {
        count -= 1
        countValue.textContent = "Task Count: " + count
        completedTask.push(taskValue)
        taskItem.remove()
    }

    else {
        celebration.textContent = "Tasks Completed!"
    }
}

function clearTasks(event) {
    event.preventDefault()

    taskList = document.getElementById("list")
    taskList.textContent = ""

    count = 0
    countValue.textContent = "Task Count: " + count
    document.getElementById("taskName").value = ""
}