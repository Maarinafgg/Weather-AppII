let now = new Date();
let date = document.querySelector("#dateTime");

let weekDays = ["Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"];
  let day = weekDays[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
  hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
  minutes = `0${minutes}`;
  }
  date.innerHTML = `${day} ${hours}:${minutes}`;

function displayTemperature (response){
let temperature = document.querySelector("#temperature");
let cityElem = document.querySelector("#city");
let description = document.querySelector("#weatherDiscription");
let feelslike = document.querySelector("#feelsLike");
let humidity = document.querySelector("#humidity");
let wind = document.querySelector("#wind");
let iconElem = document.querySelector("#currentIcon");

temperature.innerHTML = Math.round (response.data.main.temp);
cityElem.innerHTML = response.data.name;
description.innerHTML = response.data.weather[0].main;
feelslike.innerHTML = Math.round (response.data.main.feels_like);
humidity.innerHTML = response.data.main.humidity;
wind.innerHTML = Math.round (response.data.wind.speed);
iconElem.setAttribute ("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
}

let apiKey = "9078bdda44af2b0743ddeae89e1d419b";
let city = "Pyrmont";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


axios.get (apiUrl).then(displayTemperature);