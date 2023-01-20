/* import _, { add } from 'lodash'; */
import './style.css';
import { loadDataLs, saveDataLs } from './modules/localStorage.js';
import Task from './modules/Tasks.js';

const tasks = loadDataLs();
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