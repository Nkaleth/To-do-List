const ChangeTaskStatus = (arr, id) => {
  if (arr[id - 1].completed === true) {
    arr[id - 1].completed = false;
  } else {
    arr[id - 1].completed = true;
  }
  return arr;
};

const clearList = (arr) => {
  const filtered = arr.filter((element) => element.completed === false);
  return filtered;
};
export { ChangeTaskStatus, clearList };