const clock = document.querySelector("h2#date__time");
const dateElement = document.querySelector("h3#date__date");

function getDate() {
  const today = new Date();
  const years = today.getFullYear();
  const month = today.getMonth();
  const months = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");

  const stringMonths = months[month];
  const date = today.getDate();
  const day = today.getDay();
  const days = "Sun Mon Tue Wed Thu Fri Sat".split(" ");
  const stringDays = days[day];
  dateElement.innerText = `${stringDays} ${date} ${stringMonths} ${years}`;
}

function getClock() {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  clock.innerText = `${hours}:${minutes}:${seconds}`;
}
getDate();
getClock();
setInterval(getClock, 1000);
