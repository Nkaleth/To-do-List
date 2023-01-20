/* import _, { add } from 'lodash'; */
import './style.css';
import { loadDataLs, saveDataLs } from './modules/localStorage.js';

class Task {
  constructor(description, index, completed = false) {
    this.description = description;
    this.index = index;
    this.completed = completed;
  }

  static LoadList = (tasksList) => {
    const todolist = document.querySelector('.list');
    let string = '';
    tasksList.forEach((element) => {
      string += `<li class="taskContainer">
      <input type="checkbox" class="checkbox" id="${element.index}">
      <input type="text" id="${element.index}" class="task" value="${element.description}">
      <button id="${element.index}" class="delete"></button>
    </li>`;
    });
    todolist.innerHTML = string;
  };

  static removeObWithId = (arr, id) => {
    const ObToRemove = arr.findIndex((obj) => obj.index === id);
    if (ObToRemove > -1) {
      arr.splice(ObToRemove, 1);
    }
    return arr;
  };

  static renewIndex = (arr) => {
    let index = 0;
    arr.forEach((element) => {
      element.index = index;
      index += 1;
    });
    return arr;
  };

  static editTask = (textEdit, arr, id) => {
    const data = arr.find(({ index }) => index === id * 1);
    if (textEdit === data.description) {
      // Don't change anything
    } else {
      arr[id].description = textEdit;
    }
    return arr;
  };
}

const tasks = loadDataLs();
Task.LoadList(tasks);

const addContainer = document.querySelector('.addContainer');

/* Add new tasks */
const Addtask = (e) => {
  e.preventDefault();
  const description = addContainer.elements[0].value;
  const count = tasks.length;
  const task = new Task(description, count);
  tasks.push(task);
  Task.LoadList(tasks);
  saveDataLs(tasks);
  addContainer.reset();
};

addContainer.addEventListener('submit', Addtask);

/* Remove task */

const section = document.querySelector('.list');

section.addEventListener('click', (event) => {
  const { target } = event;
  const NewId = target.id;
  if (target.type === 'submit') {
    Task.removeObWithId(tasks, NewId * 1);
    Task.renewIndex(tasks);
    Task.LoadList(tasks);
    saveDataLs(tasks);
  }
});

/* Edit tasks */
section.addEventListener('focusout', (event) => {
  const { target } = event;
  const editTask = target.value;
  const idEdit = target.id;
  Task.editTask(editTask, tasks, idEdit);
  Task.LoadList(tasks);
  saveDataLs(tasks);
});