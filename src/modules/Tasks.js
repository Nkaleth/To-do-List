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
      <input type="checkbox" class="checkbox" id="c${element.index}">
      <input type="text" name="i${element.index}" id="${element.index}" class="task" value="${element.description}" data-type="task">
      <button id="${element.index}" class="delete"></button>
    </li>`;
    });
    todolist.innerHTML = string;
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const tasks = document.querySelectorAll('input[data-type="task"]');
    tasksList.forEach((element) => {
      checkboxes[element.index - 1].checked = element.completed;
      if (element.completed === true) {
        tasks[element.index - 1].style.cssText += 'text-decoration: line-through';
      }
    });
  };

  static removeObWithId = (arr, id) => {
    const ObToRemove = arr.findIndex((obj) => obj.index === id);
    if (ObToRemove > -1) {
      arr.splice(ObToRemove, 1);
    }
    return arr;
  };

  static renewIndex = (arr) => {
    let index = 1;
    arr.forEach((element) => {
      element.index = index;
      index += 1;
    });
    return arr;
  };

  static editTask = (textEdit, arr, id) => {
    const data = arr.find(({ index }) => index === id * 1);
    if (textEdit === data.description || textEdit === '') {
      arr = 0;
    } else {
      arr[id - 1].description = textEdit;
    }
    return arr;
  };
}

export default Task;