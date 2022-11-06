 // Replace me later with user input from form
const API_KEY = "c2647d1123d8569a6d9fce9c4ea94398";
const CURRENT_WEATHER_ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather?';
//https://api.openweathermap.org/data/2.5/onecall?lat=47.3075369&lon=-122.2301808&appid=f077831005b0a99879525b916f58d7b5&units=imperial
const FORECAST_ENDPOINT = 'https://api.openweathermap.org/data/2.5/forecast?'
const SEARCH_BUTTON = document.getElementById("searchButton");
var cityHistoryEl = document.querySelector('#history');
let history = [];

$("#searchButton").click(function(event){
    event.preventDefault();
    const cityName = document.getElementById('userInput').value;
    //console.log(cityName);

    // 1. Get lat and Long
    var cityLatandLong = getLatAndLongFromCityName(cityName);
   // console.log('lat and long: ', cityLatandLong);
    history.push(cityName);
    localStorage.setItem("Searched Cities", JSON.stringify(history));
    putLocalStorageinButton(cityName);
    // 2. Pass lat and long into api to get weather data
    // data = getWeatherDataFromApi(cityLatandLong);

    // 3. Render weather data on page
    //putDataInDivs(data);
})

function putDataInDivs(weatherData) {
    get5DayForecast(weatherData.list)
    //console.log(weatherData);
    var todayWeather = weatherData.list[0];
    var temp = todayWeather.main.temp;
    var wind = todayWeather.wind.speed;
    var humidity = todayWeather.main.humidity;
    var icon = todayWeather.weather.icon;
    document.getElementById('currentTemp').innerText = ('Temp: ' + temp + ' F');
    document.getElementById('currentWind').innerText = ('Wind: ' + wind + ' MPH');
    document.getElementById('currentHumidity').innerText = ('Humidity: ' + humidity + ' %');
    document.getElementById('icon').innerText = icon;
} 

function getLatAndLongFromCityName(cityName) {
    var api_call = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${API_KEY}`
    const stuff = fetch(api_call) // using variable name to grab coordinates
    .then((response) => {
        return response.json();
    }).then((data) => {   
       getWeatherDataFromApi(data[0].lat, data[0].lon)
    });
}
function getWeatherDataFromApi(lat, lon) {

    let api_call = FORECAST_ENDPOINT + "lat=" + lat + "&lon=" + lon + "&appid=" + API_KEY + "&units=imperial";
    var weather_data = [];

    fetch(api_call) // using variable name to grab coordinates
    .then((response) => {
        if (response.ok){
        return response.json()};
    }).then((data) => {
        //console.log(data)
        putDataInDivs(data)
    })
   
}

function get5DayForecast (array) {
    
    for (var i= 0; i < 5; i++) {
        var weatherdataforday = array[i]
        //console.log(array[i])
        var elementID = 'day' + i.toString()
        const DayDiv = document.getElementById(elementID);
        DayDiv.innerHTML = weatherdataforday.main.temp;
    }
   
}


function saveCityInLocalStorage(cityName) {
   
   
}

function putLocalStorageinButton(){
    var savedCities = localStorage.getItem(cityName);
    if (savedCities) {
        savedCities = JSON.parse(savedCities);
        cityHistoryEl.innerHTML = '';
    for (var i = savedCities.length - 1; i >= 0; i--) {
        var btn = document.createElement('button');
        btn.setAttribute('type', 'button',);        
        btn.textContent = savedCities[i];
        btn.setAttribute('data-search', savedCities[i]);
        cityHistoryEl.append(btn);
    }
    } else return;
}


// 2. fix the bug for local Storage
// 3. console log local Storage