const TEMP_CITY = "KIRKLAND"; // Replace me later with user input from form
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
    var weatherData = getWeatherDataFromApi(cityLatandLong[0], cityLatandLong[1]);
    console.log(weatherData.list[0]);
    var todayWeather = weatherData.list[0];
    var temp = todayWeather.main.temp;
    var wind = todayWeather.wind.speed;
    var humidity = todayWeather.main.humidity;

    document.getElementById('currentTemp').innerText = temp;
    document.getElementById('currentWind').innerText = wind;
    document.getElementById('currentHumidity').innerText = humidity;
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

//var latAndLong = getLatAndLongFromCityName(TEMP_CITY);
//getWeatherDataFromApi(latAndLong[0], latAndLong[1]);
