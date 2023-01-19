/* import _, { add } from 'lodash'; */
import './style.css';

const tasks = [
  {
    description: 'Go for a walk',
    completed: false,
    index: 0,
  },
  {
    description: 'Take the dog out',
    completed: true,
    index: 1,
  },
  {
    description: 'Reading a book',
    completed: false,
    index: 2,
  },
  {
    description: 'Coding challenge',
    completed: true,
    index: 3,
  },
];

const todolist = document.querySelector('.list');

const LoadList = () => {
  let string = '';
  tasks.forEach((element) => {
    string += `<li class="taskContainer">
    <button class="checkbox" type="submit"></button>
    <span class="task">${element.description}</span>
    <button class="dots"></button>
  </li>`;
  });
  todolist.innerHTML = string;
};

LoadList();