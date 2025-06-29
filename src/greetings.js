const loginForm = document.querySelector(".login-form");
const loginInput = document.querySelector(".login-form input");
const greeting = document.querySelector(".greeting");
const todoContainer = document.querySelector(".todo-form__container");
const todoDoneContainer = document.querySelector(".todo-form__done-container");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function onLoginSubmit(event) {
  event.preventDefault();
  const username = loginInput.value;
  loginForm.classList.add(HIDDEN_CLASSNAME);
  localStorage.setItem(USERNAME_KEY, username);
  paintGreeting(username);
}

function paintGreeting(username) {
  greeting.innerText = `안녕하세요. ${username}`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
  if (todoContainer) {
    todoContainer.classList.remove(HIDDEN_CLASSNAME);
  }
  if (todoDoneContainer) {
    todoDoneContainer.classList.remove(HIDDEN_CLASSNAME);
  }
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", onLoginSubmit);
} else {
  paintGreeting(savedUsername);
}
