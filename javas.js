function displayTemperature (response){
console.log(response.data.main.temp)}



let apiKey = "9078bdda44af2b0743ddeae89e1d419b";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Pyrmont&appid=${apiKey}&units=metric`;


axios.get (apiUrl).then(displayTemperature);