 // Replace me later with user input from form
const API_KEY = "c2647d1123d8569a6d9fce9c4ea94398";
const CURRENT_WEATHER_ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather?';
const FORECAST_ENDPOINT = 'https://api.openweathermap.org/data/2.5/forecast?'
const SEARCH_BUTTON = document.getElementById("searchButton");
var cityLatAndLong =  null;
// 1. Translate the city into latitude and longitude
// 2. Send lat and long to api to get weather data back

$("#searchButton").click(function(event){
    event.preventDefault();
    const cityName = document.getElementById('userInput').value;
    console.log(cityName);

    // 1. Get lat and Long
    var cityLatandLong = getLatAndLongFromCityName(cityName);
    console.log('lat and long: ', cityLatAndLong);

    // 2. Pass lat and long into api to get weather data
    data = getWeatherDataFromApi(cityLatandLong);

    // 3. Render weather data on page
    putDataInDivs(data);
})

function putDataInDivs(weatherData) {

    console.log(weatherData);
    var todayWeather = weatherData
    var temp = todayWeather.main.temp;
    var wind = todayWeather.wind.speed;
    var humidity = todayWeather.main.humidity;
    var icon = todayWeather.weather[0].icon;
    document.getElementById('currentTemp').innerText = ('Temp: ' + temp);
    document.getElementById('currentWind').append(wind);
    document.getElementById('currentHumidity').append(humidity);
    document.getElementById('icon').innerText = icon;
} 

function getLatAndLongFromCityName(cityName) {
    var api_call = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
    const stuff = fetch(api_call) // using variable name to grab coordinates
    .then((response) => {
        return response.json();
    }).then((data) => {   
        putDataInDivs(data)
    });
}
function getWeatherDataFromApi(lat, lon) {

    let api_call = FORECAST_ENDPOINT + "lat=" + lat + "&lon=" + lon + "&appid=" + API_KEY;
    var weather_data = null;

    fetch(api_call) // using variable name to grab coordinates
    .then((response) => {
        console.log(response)
        if (response.ok){
        return response.json()};
    }).then((data) => {
        console.log(data);
    })
    return weather_data;
}
function get5DayForecast (lat, lon) {
    /*for (var i= 0; i < 5; i++) {
        
    }*/
}

function saveCityInLocalStorage(cityName) {
    let allCities = JSON.parse(localStorage.getItem(“all-cities”)) || [];
    //prompted when search
   // 
}

function putLocalStorageinButton(){
    //for each city in array, create button
}

