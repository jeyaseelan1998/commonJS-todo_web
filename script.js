let todoArray = [
  { key: 1, text: "Learn HTML" },
  { key: 2, text: "Learn COMMONJS" },
  { key: 3, text: "Learn PYTHON" },
];

function createTodoElement(todo) {
  let todoItemsContainer = document.getElementById("todoItemsContainer");

  let todoItemContainer = document.createElement("li");
  todoItemContainer.classList.add("todo-item-container", "d-flex", "flex-row");
  todoItemsContainer.appendChild(todoItemContainer);

  let checkboxInput = document.createElement("input");
  checkboxInput.classList.add("checkbox-input");
  checkboxInput.type = "checkbox";
  checkboxInput.id = `myCheckboxInput${todo.key}`;
  todoItemContainer.appendChild(checkboxInput);

  let labelContainer = document.createElement("div");
  labelContainer.classList.add("label-container", "d-flex", "flex-row");
  todoItemContainer.appendChild(labelContainer);

  let labelEle = document.createElement("label");
  labelEle.classList.add("checkbox-label");
  labelEle.setAttribute("for", `myCheckboxInput${todo.key}`);
  labelEle.textContent = todo.text;
  labelContainer.appendChild(labelEle);

  let delIconContainer = document.createElement("div");
  delIconContainer.classList.add("delete-icon-container");
  labelContainer.appendChild(delIconContainer);

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("far", "fa-trash-can", "fa-light", "delete-icon");
  deleteIcon.onclick = () => {
    console.log(todo.key);
    todoArray = todoArray.filter((ele) => ele.key != todo.key);
    iterator(todoArray);
  };
  delIconContainer.appendChild(deleteIcon);
}

function iterator(array) {
  todoItemsContainer.innerHTML = "";
  for (let todo of array) {
    createTodoElement(todo);
  }
}

iterator(todoArray);

function addTask() {
  let textInputEle = document.getElementById("todoUserInput");
  let todo = { key: todoArray.length, text: textInputEle.value };
  todoArray.push(todo);
  iterator(todoArray);
}
