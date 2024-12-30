"use strict";

$(document).ready(function () {
  var $form = $('.js--form');
  var $taskInput = $('.js--form__input');
  var $taskList = $('.js--todos-wrapper');
  var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(function (task) {
    return createTaskElement(task);
  });
  $form.on('submit', function (event) {
    event.preventDefault();
    var taskText = $taskInput.val().trim();
    if (taskText === '') return;
    var task = {
      id: Date.now(),
      text: taskText,
      completed: false
    };
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    createTaskElement(task);
    $taskInput.val('');
  });
  $taskList.on('click', '.todo-item__delete', function () {
    var $taskItem = $(this).closest('li');
    var taskId = $taskItem.data('id');
    deleteTask(taskId);
  });
  $taskList.on('click', '.todo-item input[type="checkbox"]', function () {
    var $taskItem = $(this).closest('li');
    var taskId = $taskItem.data('id');
    toggleComplete(taskId);
  });
  $taskList.on('click', '.todo-item__description', function () {
    var taskText = $(this).text();
    $('#modal-task-text').text(taskText);
    $('#taskModal').modal('show');
  });
  function createTaskElement(task) {
    var taskElement = "\n            <li class=\"todo-item list-group-item ".concat(task.completed ? 'todo-item--checked' : '', "\" data-id=\"").concat(task.id, "\">\n                <input type=\"checkbox\" ").concat(task.completed ? 'checked' : '', ">\n                <span class=\"todo-item__description\">").concat(task.text, "</span>\n                <button class=\"todo-item__delete btn btn-danger btn-sm\">\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438</button>\n            </li>\n        ");
    $taskList.append(taskElement);
  }
  function toggleComplete(taskId) {
    tasks = tasks.map(function (task) {
      if (task.id == taskId) {
        task.completed = !task.completed;
      }
      return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }
  function deleteTask(taskId) {
    tasks = tasks.filter(function (task) {
      return task.id != taskId;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }
  function renderTasks() {
    $taskList.empty();
    tasks.forEach(function (task) {
      return createTaskElement(task);
    });
  }
});
document.addEventListener('DOMContentLoaded', function () {
  var form = document.querySelector('.js--form');
  var taskInput = document.querySelector('.js--form__input');
  var taskList = document.querySelector('.js--todos-wrapper');

  // Load tasks from localStorage
  var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(function (task) {
    createTaskElement(task);
  });
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', handleTaskAction);
  function addTask(event) {
    event.preventDefault();
    var taskText = taskInput.value.trim();
    if (taskText === '') return;
    var task = {
      id: Date.now(),
      text: taskText,
      completed: false
    };
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    createTaskElement(task);
    taskInput.value = '';
  }
  function handleTaskAction(event) {
    var target = event.target;
    var taskId = target.closest('li').dataset.id;
    if (target.classList.contains('todo-item__delete')) {
      deleteTask(taskId);
    } else if (target.type === 'checkbox') {
      toggleComplete(taskId);
    }
  }
  function toggleComplete(taskId) {
    tasks = tasks.map(function (task) {
      if (task.id == taskId) {
        task.completed = !task.completed;
      }
      return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }
  function deleteTask(taskId) {
    tasks = tasks.filter(function (task) {
      return task.id != taskId;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }
  function createTaskElement(task) {
    var taskElement = document.createElement('li');
    taskElement.className = "todo-item ".concat(task.completed ? 'todo-item--checked' : '');
    taskElement.dataset.id = task.id;
    taskElement.innerHTML = "\n            <input type=\"checkbox\" ".concat(task.completed ? 'checked' : '', ">\n            <span class=\"todo-item__description\">").concat(task.text, "</span>\n            <button class=\"todo-item__delete\">\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438</button>\n        ");
    taskList.appendChild(taskElement);
  }
  function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(function (task) {
      createTaskElement(task);
    });
  }
});