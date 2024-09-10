// Load tasks from localStorage when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    storedTasks.forEach(task => addTaskToList(task.text, task.completed));
});

// Event listener for the "Add Task" button
document.getElementById('addTaskButton').addEventListener('click', function(event) {
    event.preventDefault();  // Prevent default button behavior

    const taskInput = document.getElementById('taskInput');
    const taskValue = taskInput.value.trim();  // Get the value of the input
    if (taskValue === '') {
        alert("Please enter a task.");
        return;
    }

    // Add the task to the list and save it to localStorage
    addTaskToList(taskValue, false);
    saveTask(taskValue, false);

    // Clear the input field after adding the task
    taskInput.value = '';
});

// Function to add a task to the task list in the UI
function addTaskToList(taskText, isCompleted) {
    const taskList = document.getElementById('taskList');

    // Create a list item
    const li = document.createElement('li');

    // Create checkbox for marking task as complete
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = isCompleted;  // Set checkbox based on task completion status

    // Create task text
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;

    if (isCompleted) {
        taskSpan.classList.add('completed');  // Add strikethrough to text if completed
    }

    checkbox.onclick = function() {
        taskSpan.classList.toggle('completed');  // Toggle strikethrough on text
        updateTask(taskText, checkbox.checked);  // Update task completion status in localStorage
    };

    // Create a div to wrap the edit and delete buttons
    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('button-container'); // Add class for styling

    // Add a button to edit the task
    const editButton = document.createElement('button');
    editButton.textContent = "Edit";
    editButton.classList.add('edit-btn');  // Add class for styling
    editButton.onclick = function() {
        const newTaskText = prompt("Edit task:", taskText);
        if (newTaskText) {
            taskSpan.textContent = newTaskText;
            updateTaskText(taskText, newTaskText);  // Update the task text in localStorage
            taskText = newTaskText;  // Update the local variable
        }
    };

    // Add a button to delete the task
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function() {
        taskList.removeChild(li);
        deleteTask(taskText);
    };

    // Append edit and delete buttons to the button div
    buttonDiv.appendChild(editButton);
    buttonDiv.appendChild(deleteButton);

    // Append checkbox, task text, and the button div to the list item
    li.appendChild(checkbox);
    li.appendChild(taskSpan);
    li.appendChild(buttonDiv);

    // Add the list item to the task list
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

// Function to update the task text in localStorage
function updateTaskText(oldText, newText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task => {
        if (task.text === oldText) {
            task.text = newText;
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
