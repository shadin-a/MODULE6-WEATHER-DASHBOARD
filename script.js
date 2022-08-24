const TEMP_CITY = "Kirkland"; // Replace me later with user input from form
const API_KEY = "c2647d1123d8569a6d9fce9c4ea94398";
const CURRENT_WEATHER_ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather?';
const FORECAST_ENDPOINT = 'api.openweathermap.org/data/2.5/forecast?'

// 1. Translate the city into latitude and longitude
// 2. Send lat and long to api to get weather data back

function onClickSubmit() {
    var cityName = TEMP_CITY; // plaeholder for getting data from form
    var latAndLong = getLatAndLongFromCityName(cityName);
    var weatherData = getWeatherDataFromApi(lat, long);
}

function getLatAndLongFromCityName(cityname) {
    return ["47.6769", "122.2060"];
}

function getWeatherDataFromApi(lat, lon) {
    let api_call = CURRENT_WEATHER_ENDPOINT + "lat=" + lat + "lon=" + lon + "?key=" + API_KEY;
    console.log(api_call);
    let api_response = fetch(api_call);
    console.log(api_response);
    return [];
}
console.log("hello");
var latAndLong = getLatAndLongFromCityName(TEMP_CITY);
getWeatherDataFromApi(latAndLong[0], latAndLong[1]);
