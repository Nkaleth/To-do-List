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
    if (textEdit === data.description || textEdit === '') {
      // Don't change anything
    } else {
      arr[id].description = textEdit;
    }
    return arr;
  };
}

export default Task;