document.addEventListener("DOMContentLoaded", () => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskList = document.getElementById("taskList");

    savedTasks.forEach(task => {
        addTaskToList(task, false);
    });
});

function addTaskToList(taskText, completed) {
    const taskList = document.getElementById("taskList");
    const listItem = document.createElement("li");
    if (completed) {
        listItem.classList.add("completed");
    }
    listItem.innerHTML = `
        <input type="checkbox" onchange="toggleTaskCompletion(this.parentElement)">
        <span>${taskText}</span>
        <button class="delete-button" onclick="deleteTask(this.parentElement)">Delete</button>
    `;
    taskList.appendChild(listItem);
    updateLocalStorage();
}

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        addTaskToList(taskText, false);
        taskInput.value = "";
    }
}

function toggleTaskCompletion(taskItem) {
    taskItem.classList.toggle("completed");
    updateLocalStorage();
}

function deleteTask(taskItem) {
    taskItem.remove();
    updateLocalStorage();
}

function clearCompleted() {
    const completedTasks = document.querySelectorAll(".completed");
    completedTasks.forEach(taskItem => {
        taskItem.remove();
    });
    updateLocalStorage();
}

function updateLocalStorage() {
    const tasks = Array.from(document.querySelectorAll("#taskList span")).map(span => {
        return {
            text: span.textContent,
            completed: span.parentElement.classList.contains("completed")
        };
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}