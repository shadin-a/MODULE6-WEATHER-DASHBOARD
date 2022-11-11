 // Replace me later with user input from form
const API_KEY = "c2647d1123d8569a6d9fce9c4ea94398";
const CURRENT_WEATHER_ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather?';
//https://api.openweathermap.org/data/2.5/onecall?lat=47.3075369&lon=-122.2301808&appid=f077831005b0a99879525b916f58d7b5&units=imperial
const FORECAST_ENDPOINT = 'https://api.openweathermap.org/data/2.5/forecast?'
const SEARCH_BUTTON = document.getElementById("searchButton");
var cityHistoryEl = document.querySelector('#history');
let history 
var cityLatandLong 
var cityName

//FUNCTION FOR SERAHCING A CITY. IT WILL SEND THE DATA TO START THE API CALL DOMINO EFFECT
$("#searchButton").click(function(event){
    event.preventDefault();
    const cityName = document.getElementById('userInput').value;
    console.log(cityName);

    //check to see if search city already in local storage
    if (!history.includes(cityName)) {
        console.log('CITY IS NOT IN LOCAL STORGE')
        history.push(cityName);
        localStorage.setItem("Searched Cities", JSON.stringify(history));
    } else {
        console.log('FOUND CITY IN LS')
    }
    console.log(history);
    getLatAndLongFromCityName(cityName);
    putLocalStorageinButton(cityName);
})
//FUNCTION TO TAKE INFO FROM API AND PUTTING IT INTO DIV FOR CURRENT WEATHER
function putDataInDivs(weatherData) {
  
    console.log(weatherData);
    var todayWeather = weatherData.list[0];
    var dt = todayWeather.dt;
    var timezone = weatherData.city.timezone;
    var adjustedTime = timezone / 60;
    
    var name = weatherData.city.name
    var date = moment.unix(dt).utc().utcOffset(adjustedTime).format('MM/DD/YYYY');
    var temp = todayWeather.main.temp;
    var wind = todayWeather.wind.speed;
    var humidity = todayWeather.main.humidity;
    var icon = todayWeather.weather[0].icon;
    document.getElementById('cityName').innerText = name;
    document.getElementById('currentDate').innerText = date;
    document.getElementById('currentTemp').innerText = ('Temp: ' + temp + ' F');
    document.getElementById('currentWind').innerText = ('Wind: ' + wind + ' MPH');
    document.getElementById('currentHumidity').innerText = ('Humidity: ' + humidity + ' %');
    $('#icon').attr("src",'https://openweathermap.org/img/wn/'+ icon +'.png') ;   
    get5DayForecast(weatherData.list)
} 
//FUNCTION FOR GETTING LAT AND LONG FOR THE API CALL
function getLatAndLongFromCityName(cityName) {
    var api_call = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${API_KEY}`
    const stuff = fetch(api_call) // using variable name to grab coordinates
    .then((response) => {
        return response.json();
    }).then((data) => {   
       getWeatherDataFromApi(data[0].lat, data[0].lon)
    });
}
//THE ACTUAL API CALL
function getWeatherDataFromApi(lat, lon) {

    let api_call = FORECAST_ENDPOINT + "lat=" + lat + "&lon=" + lon + "&appid=" + API_KEY + "&units=imperial";
    var weather_data = [];

    fetch(api_call) // using variable name to grab coordinates
    .then((response) => {
        if (response.ok){
        return response.json()};
    }).then((data) => {
        putDataInDivs(data)
    })
   
}
//FUNCTION FOR POPULATING THE FORECAST VIA LOOP
function get5DayForecast (array) {
    
    for (var i= 0; i < 5; i++) {
        var weatherdataforday = array[i]
        console.log(array[i])
       var icon = weatherdataforday.weather[0].icon;
        var tempID = 'day' + i.toString() +'Temp'
        var windID = 'day' + i.toString() + 'Wind';
        var HumidityID = 'day' + i.toString() + 'Humidity';
        var IconID = 'day' + i.toString() + 'WeatherIcon';
        const DayDiv = document.getElementById(tempID);
        const WindDiv = document.getElementById(windID);
        const HumidityDiv = document.getElementById(HumidityID);
       const IconDiv = document.getElementById(IconID);
        DayDiv.innerHTML = ('Temp: ' + weatherdataforday.main.temp + ' F');
        WindDiv.innerHTML = ('Wind: ' + weatherdataforday.wind.speed + ' MPH');
        HumidityDiv.innerHTML = ('Humidity: ' + weatherdataforday.main.humidity + ' %');
        $(IconDiv).attr("src",'https://openweathermap.org/img/wn/'+ icon +'.png') ;  
    }
   
}

//FUNCTION FOR LOADING LS BUTTONS IMMEDIATELY
function getLocalStorage(){
  // check to see if there is any search history in local storage.
  if (localStorage.getItem("Searched Cities")) {
    console.log('THERE IS SEARCH HISTORY!')
    history = JSON.parse(localStorage.getItem("Searched Cities"));
} else {
    console.log('NO SEARCH HISTORY LOL')
    history = []
};
}
getLocalStorage();
function putLocalStorageinButton(){
    if (history) {
        cityHistoryEl.innerHTML = '';
    for (var i = history.length - 1; i >= 0; i--) {
        var btn = document.createElement('button');
        //console.log(history[i])
        btn.setAttribute('type', 'button',);        
        btn.textContent = history[i];
        btn.setAttribute('data-search', history[i]);
        btn.classList.add('btn', 'btn-primary', 'btn-lg', 'btn-block')
        btn.addEventListener('click', searchHistory)
        cityHistoryEl.append(btn);
    }
    } else return;
} 
putLocalStorageinButton();


function searchHistory(event){
  console.log('SEARCH HISTORY WAS REQUESTED')  
  event.preventDefault();
    const cityName = event.target.dataset.search;
    console.log(cityName);
    //check to see if search city already in local storage
    if (!history.includes(cityName)) {
        console.log('CITY IS NOT IN LOCAL STORGE')
        history.push(cityName);
        localStorage.setItem("Searched Cities", JSON.stringify(history));
    } else {
        console.log('FOUND CITY IN LS')
    }
    //  cityLatandLong = getLatAndLongFromCityName(cityName);
    // console.log(cityLatandLong);
    console.log(history);
    putLocalStorageinButton(cityName);
    getLatAndLongFromCityName(cityName)
}
