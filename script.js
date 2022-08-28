const TEMP_CITY = "KIRKLAND"; // Replace me later with user input from form
const API_KEY = "c2647d1123d8569a6d9fce9c4ea94398";
const CURRENT_WEATHER_ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather?';
const FORECAST_ENDPOINT = 'https://api.openweathermap.org/data/2.5/forecast?'
const SEARCH_BUTTON = document.getElementById("searchButton");

// 1. Translate the city into latitude and longitude
// 2. Send lat and long to api to get weather data back

$("#searchButton").click(function(event){
    event.preventDefault();
    var cityName = TEMP_CITY.val();
    getLatAndLongFromCityName(cityName);
})

function getLatAndLongFromCityName(cityname) {
    var api_call = `http://api.openweathermap.org/geo/1.0/direct?q=${cityname}&limit=5&appid=${API_KEY}`
    fetch(api_call)
        .then((response) => response.json())
        .then((data) => {console.log(data)});
    
    return [47.6062, 122.3321];   
}

function getWeatherDataFromApi(lat, lon) {
    let api_call = FORECAST_ENDPOINT + "lat=" + lat + "&lon=" + lon + "&appid=" + API_KEY;
    console.log(api_call);

    fetch(api_call).then((response) => response.json())
    .then((data) => {console.log(data)});
    return [];
}


var latAndLong = getLatAndLongFromCityName(TEMP_CITY);
getWeatherDataFromApi(latAndLong[0], latAndLong[1]);
