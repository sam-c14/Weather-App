const inputEl = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");
const temp = document.querySelector(".temp");
const app = document.getElementById("app");
const city = document.querySelector(".city");
const time = document.querySelector(".time");
const condition = document.getElementById("condition");
const cloudVal = document.getElementById("cloud-value");
const humidVal = document.getElementById("humid-value");
const windVal = document.getElementById("windy-value");
const weatherImg = document.getElementById("weather-img");
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
function setWeatherDetails(data) {
  let timeOfDay = "day";
  temp.innerHTML = `${Math.round(
    data.current.temp_c
  )} <sup><i class="far fa-circle"></i></sup>`;
  city.textContent = data.location.name;
  let timeArr = data.location.localtime.split(" ");
  const day = new Date(timeArr[0]);
  const newDay = days[day.getDay()];
  const date = timeArr[0].split("-");
  time.innerHTML = `<p>${timeArr[1]} - </p>
    <p><span></span> ${newDay} ${date[0] + "/" + date[1] + "/" + date[2]}</p>`;

  condition.textContent = data.current.condition.text;
  weatherImg.src = data.current.condition.icon;
  cloudVal.textContent = data.current.cloud + "%";
  humidVal.textContent = data.current.humidity + "%";
  windVal.textContent = data.current.wind_kph + "km/h";
  app.style.opacity = 1;
  inputEl.value = "";
  const code = data.current.condition.code;
  if (code === 1000) {
    app.style.cssText = `background:url("./assests/images/${timeOfDay}/clear.jpg")
    center/cover no-repeat;`;
    searchBtn.style.background = "#e5ba92";
    if (timeOfDay == "night") searchBtn.style.background = "#181e27";
  } else if (
    code === 1003 ||
    code === 1006 ||
    code === 1009 ||
    code === 1039 ||
    code === 1087 ||
    code === 1135 ||
    code === 1273 ||
    code === 1276 ||
    code === 1279 ||
    code === 1282
  ) {
    app.style.cssText = `background:url("./assests/images/${timeOfDay}/sunset.jpg")
    center/cover no-repeat;`;
    searchBtn.style.background = "#fa6d1b";
    if (timeOfDay == "night") searchBtn.style.background = "#181e27";
  } else if (
    code === 1063 ||
    code === 1069 ||
    code === 1072 ||
    code === 1150 ||
    code === 1153 ||
    code === 1180 ||
    code === 1183 ||
    code === 1186 ||
    code === 1189 ||
    code === 1192 ||
    code === 1195 ||
    code === 1204 ||
    code === 1207 ||
    code === 1240 ||
    code === 1243 ||
    code === 1249 ||
    code === 1252
  ) {
    app.style.cssText = `background:url("./assests/images/${timeOfDay}/rainy.jpg")
    center/cover no-repeat;`;
    searchBtn.style.background = "#647d75";
    if (timeOfDay == "night") searchBtn.style.background = "#325c80";
  } else {
    app.style.cssText = `background:url("./assests/images/${timeOfDay}/snowy.jpg")
    center/cover no-repeat;`;

    searchBtn.style.background = "#4d72aa";
    if (timeOfDay == "night") searchBtn.style.background = "#1b1b1b";
  }
}

function getWeatherDetails() {
  fetch("/weather-app", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: `{
     "city" : "${inputEl.value}"
    }`,
  })
    .then((res) => res.json())
    .then((data) => setWeatherDetails(data.data))
    .catch(() => {
      alert("Enter A Valid City");
      app.style.opacity = 1;
    });
}
searchBtn.addEventListener("click", () => {
  app.style.opacity = 0.5;
  getWeatherDetails();
});
window.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    app.style.opacity = 0.5;
    getWeatherDetails();
  }
});
const cities = document.querySelectorAll(".cities");
cities.forEach((city) => {
  city.addEventListener("click", () => {
    inputEl.value = city.textContent;
  });
});
