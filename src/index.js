/* import _, { add } from 'lodash'; */
import './style.css';
import { loadDataLs, saveDataLs } from './modules/localStorage.js';
import Task from './modules/Tasks.js';
import { ChangeTaskStatus, clearList } from './modules/Interactive.js';

let tasks = loadDataLs();
Task.LoadList(tasks);

const addContainer = document.querySelector('.addContainer');

/* Add new tasks */
const Addtask = (e) => {
  e.preventDefault();
  const description = addContainer.elements[0].value;
  const count = tasks.length + 1;
  const task = new Task(description, count);
  tasks.push(task);
  Task.LoadList(tasks);
  saveDataLs(tasks);
  addContainer.reset();
};

addContainer.addEventListener('submit', Addtask);

const section = document.querySelector('.list');

/* Remove task */
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
  const change = Task.editTask(editTask, tasks, idEdit);
  if (change !== 0) {
    Task.LoadList(tasks);
    saveDataLs(tasks);
  }
});

/* Complete tasks */
section.addEventListener('click', (event) => {
  const { target } = event;
  if (target.type === 'checkbox') {
    const id = target.id.replace(/\D/g, '');
    const textTask = section.querySelector(`[name=i${id}]`);
    if (target.checked === true) {
      textTask.style.cssText += 'text-decoration: line-through';
      ChangeTaskStatus(tasks, id);
      saveDataLs(tasks);
    } else {
      textTask.style.cssText += 'text-decoration: none';
      ChangeTaskStatus(tasks, id);
      saveDataLs(tasks);
    }
  }
});

/* Clear all completed tasks */
const buttonClear = document.querySelector('.buttonClear');
buttonClear.addEventListener('click', () => {
  tasks = clearList(tasks);
  Task.renewIndex(tasks);
  saveDataLs(tasks);
  Task.LoadList(tasks);
});