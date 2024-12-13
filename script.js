// Select elements
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

// Add task event listener
addTaskButton.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  const task = { text: taskText, completed: false };
  tasks.push(task);
  saveTasks();
  renderTasks();
  taskInput.value = ""; // Clear input field
});

// Render tasks
function renderTasks() {
  taskList.innerHTML = ""; // Clear the list

  tasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.className = `task ${task.completed ? "completed" : ""}`;

    taskItem.innerHTML = `
      <span>${task.text}</span>
      <div>
        <button onclick="toggleTask(${index})">✔</button>
        <button onclick="deleteTask(${index})">✖</button>
      </div>
    `;

    taskList.appendChild(taskItem);
  });
}

// Toggle task completion
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
