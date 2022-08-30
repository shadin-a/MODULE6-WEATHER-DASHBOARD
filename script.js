const TEMP_CITY = document.getElementById('userInput').value; // Replace me later with user input from form
const API_KEY = "c2647d1123d8569a6d9fce9c4ea94398";
const CURRENT_WEATHER_ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather?';
const FORECAST_ENDPOINT = 'https://api.openweathermap.org/data/2.5/forecast?'
const SEARCH_BUTTON = document.getElementById("searchButton");

// 1. Translate the city into latitude and longitude
// 2. Send lat and long to api to get weather data back

$("#searchButton").click(function(event){
    event.preventDefault();
    var cityName = TEMP_CITY;
    var cityLatandLong = getLatAndLongFromCityName(cityName);
    console.log(cityLatandLong);
    var weatherData = getWeatherDataFromApi(cityLatandLong[0], cityLatandLong[1]);
    console.log(weatherData.list[0]);
    var todayWeather = weatherData.list[0];
    var temp = todayWeather.main.temp;
    var wind = todayWeather.wind.speed;
    var humidity = todayWeather.main.humidity;
    var icon = todayWeather.weather[0].icon;

    document.getElementById('cityName').innerText = cityName;
    document.getElementById('currentTemp').append(temp);
    document.getElementById('currentWind').append(wind);
    document.getElementById('currentHumidity').append(humidity);
    document.getElementById('icon').innerText = icon;
    
})

function getLatAndLongFromCityName(cityname) {
    var api_call = `http://api.openweathermap.org/geo/1.0/direct?q=${cityname}&limit=5&appid=${API_KEY}`
    var latAndLong =  null;
    $.ajax({
        type: "GET",
        url: api_call,
        dataType: 'JSON',
        async: false,
        success: function(data){
            latAndLong = data;
        }
    });
    //return latandlong and format in nbs.
    return [47.6062, 122.3321];   
}

function getWeatherDataFromApi(lat, lon) {
    let api_call = FORECAST_ENDPOINT + "lat=" + lat + "&lon=" + lon + "&appid=" + API_KEY;
    var weather_data = null;

    $.ajax({
        type: "GET",
        url: api_call,
        dataType: 'JSON',
        async: false,
        success: function(data){
            weather_data = data;
        }
    });

    return weather_data;
}
function get5DayForecast (lat, lon) {
    for (var i= 0; i < 5; i++) {
        
    }
}

//var latAndLong = getLatAndLongFromCityName(TEMP_CITY);
//getWeatherDataFromApi(latAndLong[0], latAndLong[1]);
