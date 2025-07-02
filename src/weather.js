const API_KEY = "9ce72f66b259976e4507f0a43d9e61d6";
const weatherIconMap = {
  "01d": "fa-sun", // Clear sky (day)
  "01n": "fa-moon", // Clear sky (night)
  "02d": "fa-cloud-sun", // Few clouds (day)
  "02n": "fa-cloud-moon", // Few clouds (night)
  "03d": "fa-cloud", // Scattered clouds
  "03n": "fa-cloud",
  "04d": "fa-cloud-meatball", // Broken clouds / Overcast clouds
  "04n": "fa-cloud-meatball",
  "09d": "fa-cloud-showers-heavy", // Shower rain
  "09n": "fa-cloud-showers-heavy",
  "10d": "fa-cloud-sun-rain", // Rain (day)
  "10n": "fa-cloud-moon-rain", // Rain (night)
  "11d": "fa-bolt", // Thunderstorm
  "11n": "fa-bolt",
  "13d": "fa-snowflake",
  "13n": "fa-snowflake",
  "50d": "fa-smog",
  "50n": "fa-smog",
};

function onGeoSuccess(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const city = document.querySelector(".weather span:first-child");
      const iconContiner = document.querySelector(".weather span:nth-child(2)");
      const weather = document.querySelector(".weather span:last-child");
      //---도시이름--//
      city.innerText = data.name;
      //---날씨 아이콘 적용--//
      const weatherIconCode = data.weather[0].icon;
      const faIconClass =
        weatherIconMap[weatherIconCode] || "fa-question-circle";

      if (iconContiner) {
        const iconElement = document.createElement("i");
        iconElement.classList.add("fas", faIconClass);
        iconContiner.innerHTML = "";
        iconContiner.appendChild(iconElement);
      } else {
        console.warn(
          "Weather icon container (.weather__icon) not found in HTML."
        );
      }
      weather.innerText = `${data.weather[0].main} / ${Math.round(
        data.main.temp
      )}℃`;
    })
    .catch((error) => {
      console.error("날씨 데이터를 가져오는 중 오류 발생:", error);
      alert("날씨 정보를 가져올 수 없습니다. 위치 권한을 확인해 주세요.");
    });
}
function onGeoError() {
  alert("Can`t find you. No weather service for you.");
}

navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
