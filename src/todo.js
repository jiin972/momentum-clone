const todoForm = document.querySelector(".todo-form");
const todoInput = todoForm.querySelector("input");
const todoList = document.querySelector(".todo-form__list");
const todoDoneList = document.querySelector(".todo-form__done-list");
const toggleDoneListButton = document.querySelector(".toggle-done-list");
const TODOS_KEY = "todos";
const DONE_TODOS_KEY = "doneTodos";

let toDos = [];
let doneTodos = [];

//-----유틸함수-----//
function saveDoneTodos() {
  localStorage.setItem(DONE_TODOS_KEY, JSON.stringify(doneTodos));
}

function saveTodos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

//-----렌더함수----//
function paintTodo(newTodo, listType = "todo") {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  span.innerText = newTodo.text;

  if (listType === "done") {
    span.style.textDecoration = "line-through";
    span.style.opacity = "0.7";
  }

  const deleteButton = document.createElement("button"); //공통버튼
  deleteButton.innerText = "X";
  deleteButton.type = "button";
  deleteButton.addEventListener("click", deleteTodo);

  if (listType === "done") {
    const returnButton = document.createElement("button");
    returnButton.innerText = "↩";
    returnButton.type = "button";
    returnButton.addEventListener("click", toggleCompleteTodo);

    li.appendChild(span);
    li.appendChild(returnButton);
    li.appendChild(deleteButton);
  } else {
    const completeButton = document.createElement("button");
    completeButton.innerText = "✅";
    completeButton.type = "button";
    completeButton.addEventListener("click", toggleCompleteTodo);

    li.appendChild(span);
    li.appendChild(completeButton);
    li.appendChild(deleteButton);
  }

  if (listType === "done") {
    todoDoneList.appendChild(li);
  } else {
    todoList.appendChild(li);
  }
}
function paintGreeting() {}
//-----Todo 관리 로직-----//
function handleDoneListButton(event) {
  todoDoneList.classList.toggle("show");
  if (todoDoneList.classList.contains("show")) {
    toggleDoneListButton.textContent = "완료된 목록 숨기기";
  } else {
    toggleDoneListButton.textContent = "완료된 목록 보기";
  }
}

function toggleCompleteTodo(event) {
  const li = event.target.parentElement;
  const idToComplete = parseInt(li.id);
  const todoToMove = toDos.find((toDo) => toDo.id === idToComplete);

  if (todoToMove) {
    toDos = toDos.filter((toDo) => toDo.id !== idToComplete);
    saveTodos();
    doneTodos.push(todoToMove);
    saveDoneTodos();
    li.remove();
    paintTodo(todoToMove, "done");
  } else {
    const doneTodoToMove = doneTodos.find((toDo) => toDo.id === idToComplete);
    if (doneTodoToMove) {
      doneTodos = doneTodos.filter((toDo) => toDo.id !== idToComplete);
      saveDoneTodos();

      toDos.push(doneTodoToMove);
      saveTodos();

      li.remove();
      paintTodo(doneTodoToMove, "todo");
    }
  }
}

function deleteTodo(event) {
  const li = event.target.parentElement;
  li.remove();
  const idToDelete = parseInt(li.id);
  toDos = toDos.filter((toDo) => toDo.id !== idToDelete);
  saveTodos();
  doneTodos = doneTodos.filter((toDo) => toDo.id !== idToDelete);
  saveDoneTodos();
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = todoInput.value;
  todoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintTodo(newTodoObj);
  saveTodos();
}

//-----초기화-----//
todoForm.addEventListener("submit", handleToDoSubmit);
toggleDoneListButton.addEventListener("click", handleDoneListButton);

const savedTodos = localStorage.getItem(TODOS_KEY);
const loadedDoneTodos = localStorage.getItem(DONE_TODOS_KEY);

if (savedTodos !== null) {
  const parseTodos = JSON.parse(savedTodos);
  toDos = parseTodos;
  parseTodos.forEach((todo) => paintTodo(todo, "todo"));
}

if (loadedDoneTodos !== null) {
  const parseDoneTodos = JSON.parse(loadedDoneTodos);
  doneTodos = parseDoneTodos;
  parseDoneTodos.forEach((todo) => paintTodo(todo, "done"));
}
