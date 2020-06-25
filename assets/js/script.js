var cityName = "";
var clickedCity = document.getElementById("city-submit");
var typedCity = document.getElementById("city-submit");
var formEl = document.getElementById("city-form")
var pastCitiesEl = document.getElementById("past-cities");


document.getElementById("city-submit").addEventListener("click", function(event){
    event.preventDefault();

    var submittedCity = document.querySelector("input[name='city']").value.trim().toLowerCase();
        if (!submittedCity) {
        alert("Please enter a city name");
            formEl.reset();
        return false;
        }
    cityName = submittedCity;

    createCityEl();
    //new function? to create  
    // runData();


});

var createCityEl = function() {
    // var citiesList = document.createElement("ul")
    // citiesList.className = "container"

    cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
    var addingCity = document.createElement("li");
    addingCity.className = "card previous";
    addingCity.id = cityName;
    addingCity.textContent = cityName;
    console.log(addingCity)

    pastCitiesEl.appendChild(addingCity);
}

var runData = function(){
    var currentWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=880297035eb22848e2ca9e450c64066f";
    var fiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=880297035eb22848e2ca9e450c64066f";

    fetch(fiveDay)
    fetch(currentWeather)
}


