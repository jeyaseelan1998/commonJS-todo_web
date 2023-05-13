// let todoArray = [
//   { key: 1, text: "Learn HTML" },
//   { key: 2, text: "Learn COMMONJS" },
//   { key: 3, text: "Learn PYTHON" },
// ];

// localstorage
let key = 'todoArray';

// localStorage.clear()

let todoArray = [];
let stringifiedTodoArray = localStorage.getItem(key);
if (stringifiedTodoArray) {
  todoArray = JSON.parse(stringifiedTodoArray);
}

function onSave() {
  localStorage.setItem(key, JSON.stringify(todoArray))
}


function deleteTodo(todoId, key) {
  let todoItem = document.getElementById(todoId);
  todoItemsContainer.removeChild(todoItem);

  // todoArray = todoArray.filter(todo => todo.key != key);

  let index = todoArray.findIndex(function(eachTodo){
    return eachTodo.key === key
  })

  todoArray.splice(index, 1);
}

function createAndAppendTodoElement(todo) {
  let todoId = "todo" + todo.key;
  let inputId = "input" + todo.key;
  let labelId = "label" + todo.key;
  
  
  let todoItemsContainer = document.getElementById("todoItemsContainer");
  
  let todoItemContainer = document.createElement("li");
  todoItemContainer.classList.add("todo-item-container", "d-flex", "flex-row");
  todoItemContainer.id = todoId;
  todoItemsContainer.appendChild(todoItemContainer);
  
  let checkboxInput = document.createElement("input");
  checkboxInput.classList.add("checkbox-input");
  checkboxInput.type = "checkbox";
  checkboxInput.id = inputId;
  checkboxInput.checked = todo.isChecked;
  checkboxInput.onclick = function () {
    onStatusChange(inputId, labelId, todo.key);
  }
  todoItemContainer.appendChild(checkboxInput);
  
  let labelContainer = document.createElement("div");
  labelContainer.classList.add("label-container", "d-flex", "flex-row");
  todoItemContainer.appendChild(labelContainer);

  let labelEle = document.createElement("label");
  labelEle.classList.add("checkbox-label");
  labelEle.setAttribute("for", inputId);
  labelEle.id = labelId;
  
  if (todo.isChecked) labelEle.classList.add('strike');

  labelEle.textContent = todo.text;
  labelContainer.appendChild(labelEle);
  
  let delIconContainer = document.createElement("div");
  delIconContainer.classList.add("delete-icon-container");
  labelContainer.appendChild(delIconContainer);

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("far", "fa-trash-can", "fa-light", "delete-icon");
  deleteIcon.onclick = () => {
    deleteTodo(todoId, todo.key);
  };
  delIconContainer.appendChild(deleteIcon);
}

function iterator(array) {
  for (let todo of array) {
    createAndAppendTodoElement(todo);
  }
}

iterator(todoArray);

function addTask() {
  let textInputEle = document.getElementById("todoUserInput");
  if (textInputEle.value === '') {
    alert('Enter a valid input!');
    return;
  }
  
  let newTodo = { key: todoArray.length, text: textInputEle.value, isChecked:false };
  todoArray.push(newTodo);
  createAndAppendTodoElement(newTodo);
  textInputEle.value = '';
}

function onStatusChange(inputId, labelId, key) {
  let checkboxInputElement = document.getElementById(inputId);
  let labelElement = document.getElementById(labelId);
  
  labelElement.classList.toggle('strike');

  // isChecked status changing
  // todoArray = todoArray.map(todo => todo.key === key ? {...todo, isChecked:checkboxInputElement.checked} : todo)

  let index = todoArray.findIndex(function(eachTodo){
    return eachTodo.key === key
  })

  todoArray[index]['isChecked'] = checkboxInputElement.checked;
}

let saveBtn = document.getElementById('saveButton');
saveBtn.onclick = onSave;
