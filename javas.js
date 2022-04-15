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



  function formatDay(timestamp) {
    let date = new Date (timestamp *1000);
    let day = date.getDay();
    let days = ["Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat"];
    return days[day];

  }

  function displayForecast(response){
      let forecast = response.data.daily;
      let forecastElement = document.querySelector("#forecast");

//let days = ["Fri", "Sat", "Sun","Mon","Tue"];


let forecastHTML = `<div class="row">`;
forecast.forEach (function(forecastDay, index)
{
  if(index <5){
  forecastHTML = forecastHTML +
   `
    <div class="col-2">
    <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div> 
    <img class="wheatericons"
    src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt=""/> 
    <div class="weather-forecast-temperatures">
    <span class="maxTemperature">${Math.round(forecastDay.temp.max)}°</span>/<span class="minTemperature">${Math.round(forecastDay.temp.min)}°</span>
    </div>  
    </div>`;
    }
    }) ;
forecastHTML = forecastHTML +`</div>`;
        forecastElement.innerHTML = forecastHTML;
  }

  function getForcast(coordinates){
           let apiKey = "9078bdda44af2b0743ddeae89e1d419b";
      let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
 
  axios.get(apiUrl).then(displayForecast);
    }

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

getForcast(response.data.coord)

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

