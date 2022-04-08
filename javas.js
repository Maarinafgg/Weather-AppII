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

celsiusTemp = Math.round (response.data.main.temp);

temperature.innerHTML = Math.round (response.data.main.temp);
cityElem.innerHTML = response.data.name;
description.innerHTML = response.data.weather[0].main;
feelslike.innerHTML = Math.round (response.data.main.feels_like);
humidity.innerHTML = response.data.main.humidity;
wind.innerHTML = Math.round (response.data.wind.speed);
iconElem.setAttribute ("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
}



function search (event){
event.preventDefault();
let city = document.querySelector("#search-input").value;
searchLocation(city);
}

function searchLocation(city) {
let apiKey = "9078bdda44af2b0743ddeae89e1d419b";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get (apiUrl).then(displayTemperature);
}

function getCurrentLocation(event){
event.preventDefault();
navigator.geolocation.getCurrentPosition (searchLocation);}

function convertFahrenheit(event){
  event.preventDefault();
 let temperatureElement = document.querySelector ("#temperature");
 celsiusLink.classList.remove("active");
 fahrenheitLink.classList.add("active");
let fahrenheitElement = (celsiusTemp * 9)/5+32;
temperatureElement.innerHTML = Math.round(fahrenheitElement);

 //temperatureElement.innerHTML = ();
}

function convertCelsius(event){
event.preventDefault();
let temperatureElement = document.querySelector ("#temperature");
celsiusLink.classList.add("active");
fahrenheitLink.classList.remove("active");
temperatureElement.innerHTML = celsiusTemp;

}

let celsiusTemp = null;

let form = document.querySelector("#form-search");
form.addEventListener("submit", search);

let currentLocation = document.querySelector("#currentlocation");
currentLocation.addEventListener("click",getCurrentLocation);
searchLocation("Sydney");

let fahrenheitLink = document.querySelector ("#fahrenheit-temp");
fahrenheitLink.addEventListener("click", convertFahrenheit);


let celsiusLink = document.querySelector ("#celsius-temp");
celsiusLink.addEventListener("click", convertCelsius);