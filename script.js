const TEMP_CITY = "Kirkland"; // Replace me later with user input from form


// 1. Translate the city into latitude and longitude
// 2. Send lat and long to api to get weather data back

function onClickSubmit() {
    var cityName = TEMP_CITY; // plaeholder for getting data from form
    var latAndLong = getLatAndLongFromCityName(cityName);
    var weatherData = getWeatherDataFromApi(lat, long);
}

function getLatAndLongFromCityName(cityname) {
    return [];
}

function getWeatherDataFromApi(lat, long) {
    return [];
}

