let now = new Date();
let date = document.querySelector("#dateTime");

let weekDays = ["Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"];



function displayTemperature (response){
console.log(response.data);
let temperature = document.querySelector("#temperature");
let city = document.querySelector("#city");
let description = document.querySelector("#weatherDiscription");
let feelslike = document.querySelector("#feelsLike");
let humidity = document.querySelector("#humidity");
let wind = document.querySelector("#wind");
temperature.innerHTML = Math.round (response.data.main.temp);
city.innerHTML = response.data.name;
description.innerHTML = response.data.weather[0].main;
feelslike.innerHTML = Math.round (response.data.main.feels_like);
humidity.innerHTML = response.data.main.humidity;
wind.innerHTML = Math.round (response.data.wind.speed);
}


let apiKey = "9078bdda44af2b0743ddeae89e1d419b";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Pyrmont&appid=${apiKey}&units=metric`;


axios.get (apiUrl).then(displayTemperature);