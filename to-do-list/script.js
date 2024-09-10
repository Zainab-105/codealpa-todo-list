// Load tasks from localStorage when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    storedTasks.forEach(task => addTaskToList(task.text, task.completed));
});

// Event listener for the "Add Task" button
document.getElementById('addTaskButton').addEventListener('click', function(event) {
    event.preventDefault(); 
    const taskInput = document.getElementById('taskInput');
    const taskValue = taskInput.value.trim();  
    if (taskValue === '') {
        alert("Please enter a task.");
        return;
    }
    addTaskToList(taskValue, false);
    saveTask(taskValue, false);
    taskInput.value = '';
});

// Function to add a task to the task list in the UI
function addTaskToList(taskText, isCompleted) {
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = isCompleted; 

    // Create task text
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;

    if (isCompleted) {
        taskSpan.classList.add('completed');  
    }

    checkbox.onclick = function() {
        taskSpan.classList.toggle('completed');
        updateTask(taskText, checkbox.checked);  
    };

    // Add a button to delete the task
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function() {
        taskList.removeChild(li);
        deleteTask(taskText);
    };

    // Append checkbox, task text, and delete button to the list item
    li.appendChild(checkbox);
    li.appendChild(taskSpan);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
}

// Function to save a task in localStorage
function saveTask(taskText, isCompleted) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: taskText, completed: isCompleted });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to update the task status in localStorage
function updateTask(taskText, isCompleted) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task => {
        if (task.text === taskText) {
            task.completed = isCompleted;
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to delete a task from localStorage
function deleteTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
