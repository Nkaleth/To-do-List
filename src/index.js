/* import _, { add } from 'lodash'; */
import './style.css';

let tasks = [];

class Task {
  constructor(description, index, completed = false) {
    this.description = description;
    this.index = index;
    this.completed = completed;
  }

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
      index++;
    });
    return arr;
  };
}
const addContainer = document.querySelector('.addContainer');

const todolist = document.querySelector('.list');

const LoadList = () => {
  let string = '';
  tasks.forEach((element) => {
    string += `<li class="taskContainer">
    <input type="checkbox" class="checkbox" id="${element.index}">
    <input type="text" name="" id="${element.index}" class="task" value="${element.description}">
    <button id="${element.index}" class="delete"></button>
  </li>`;
  });
  todolist.innerHTML = string;
};
LoadList();

/* Add new tasks */
const Addtask = (e) => {
  e.preventDefault();
  const description = addContainer.elements[0].value;
  const count = tasks.length;
  const task = new Task(description, count);
  tasks.push(task);
  LoadList();
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
    LoadList();
  }
});

section.addEventListener('click', (event) => {
  const { target } = event;
  console.log(target.id);
});