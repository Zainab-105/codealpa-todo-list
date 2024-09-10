
document.addEventListener('DOMContentLoaded', function() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    storedTasks.forEach(task => addTaskToList(task.text, task.completed));
});
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
function addTaskToList(taskText, isCompleted) {
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = isCompleted; 
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;

    if (isCompleted) {
        taskSpan.classList.add('completed');  
    }

    checkbox.onclick = function() {
        taskSpan.classList.toggle('completed');  
        updateTask(taskText, checkbox.checked);  
    };
    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('button-container'); 
    const editButton = document.createElement('button');
    editButton.textContent = "Edit";
    editButton.classList.add('edit-btn');
    editButton.onclick = function() {
        const newTaskText = prompt("Edit task:", taskText);
        if (newTaskText) {
            taskSpan.textContent = newTaskText;
            updateTaskText(taskText, newTaskText);  
            taskText = newTaskText; 
        }
    };
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function() {
        taskList.removeChild(li);
        deleteTask(taskText);
    };
    buttonDiv.appendChild(editButton);
    buttonDiv.appendChild(deleteButton);
    li.appendChild(checkbox);
    li.appendChild(taskSpan);
    li.appendChild(buttonDiv);
    taskList.appendChild(li);
}
function saveTask(taskText, isCompleted) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: taskText, completed: isCompleted });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
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
function deleteTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
