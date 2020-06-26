var cityName = "";
var clickedCity = document.getElementById("city-submit");
var typedCity = document.getElementById("city-submit");
var formEl = document.getElementById("city-form")
var pastCitiesEl = document.getElementById("past-cities");


clickedCity.addEventListener("click", function(event){
    event.preventDefault();

    var submittedCity = document.querySelector("input[name='city']").value.trim().toLowerCase();
        //how to check if they put a real city.
        if (!submittedCity) {
        alert("Please enter a city name");
        formEl.reset();
        return false;
        }
    cityName = submittedCity;
    formEl.reset();
    createCityEl();
    runData();
});

var createCityEl = function() {
    cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
    var addingCity = document.createElement("li");
    addingCity.className = "card previous";
    addingCity.id = cityName;
    addingCity.textContent = cityName;
    pastCitiesEl.appendChild(addingCity);
}

var runData = function(){
    var currentWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=880297035eb22848e2ca9e450c64066f";
    var fiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=880297035eb22848e2ca9e450c64066f";
    // do the check here for city name!
        // clear out input
    fetch(currentWeather).then(function(response){
        if (response.ok) {
            console.log(currentWeather);

        } else {
            alert("Error: " + response.message)
            formEl.reset();
            return
        }
    });
    // need to grab Name, todays date, an emoji, tempurature = to weather, humidity, wind speed, uv index (uv index color codes)

    fetch(fiveDay).then(function(response){
        if (response.ok) {
            console.log(fiveDay);
        } else {
            return
        }
    // need to grab date, emoji = to weather, temp and humidity
    
    });
}

//localStorage

//
