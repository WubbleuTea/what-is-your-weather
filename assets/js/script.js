var cityName = "";
var cityLong = "";
var cityLat = "";
var clickedCityEl = document.getElementById("city-submit");
var formEl = document.getElementById("city-form")
var pastCitiesEl = document.getElementById("past-cities");
var currentWeatherEl = document.getElementById("current-weather")
var forecastEl = document.getElementById("five-day")
var currentDate = moment().format("MMMM Do, YYYY");

// function for clicking submit
clickedCityEl.addEventListener("click", function(event){
    event.preventDefault();
    // takes the text from the textarea
    var submittedCity = document.querySelector("input[name='city']").value.trim().toLowerCase();
        // checking if anything was submitted
        if (!submittedCity) {
        alert("Please enter a city name");
        formEl.reset();
        return false;
        } 
    cityName = submittedCity;
    formEl.reset();
    // createCity();
    runData();
});

// var createCity = function() {
//     cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
//     var addingCity = document.createElement("li");
//     addingCity.className = "card previous";
//     addingCity.id = cityName;
//     addingCity.textContent = cityName;
//     pastCitiesEl.appendChild(addingCity);
//     addingCity.addEventListener("click", function(event) {
//         event.preventDefault();
//         cityName = event.target.textContent
//         runData(cityName)
//     });
// }

var runData = function(){
    var currentWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=880297035eb22848e2ca9e450c64066f";
    
    fetch(currentWeather).then(function(response){
        if (response.ok) {
            cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
            var addingCity = document.createElement("li");
            addingCity.className = "card previous";
            addingCity.id = cityName;
            addingCity.textContent = cityName;
            pastCitiesEl.appendChild(addingCity);
            addingCity.addEventListener("click", function(event) {
                event.preventDefault();
                cityName = event.target.textContent
                addingCity.remove();
                runData(cityName)
            });
            currentWeatherEl.innerHTML = "";
            var currentCard = document.createElement("div");
            currentCard.className = "card align-center card-style";            
            response.json().then(function(data) {
                var cardName = document.createElement("div");
                cardName.innerHTML = "<h2 class='card-title'>Current Weather</h2><div class='breadcrumb-item justify-center'><h3>" + data.name + ":<span> " + currentDate + "</span>" +"</h3>" + 
                    "<img class='shadow' src='http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png' /></div>" +
                    "<p>Temperature: " + data.main.temp.toFixed(1) + "°F</p>" +
                    "<p>Humidity: " + data.main.humidity + "%</p>" +
                    "<p>Wind Speed: " + data.wind.speed.toFixed(1) + " MPH</p>";
                    currentCard.appendChild(cardName)
                cityLat = data.coord.lat;
                cityLong = data.coord.lon
                return fetch("https://api.openweathermap.org/data/2.5/uvi?appid=880297035eb22848e2ca9e450c64066f&lat=" + cityLat + "&lon=" + cityLong);
            })
            .then(function(UVresponse){
                UVresponse.json().then(function(UVdata) {
                    var cardUv = document.createElement("p")
                    cardUv.textContent = "UV Index: "
                    var cardUvNumber = document.createElement("span")
                    cardUvNumber.textContent = UVdata.value
                    cardUvNumber.className =""
                    if (UVdata.value < 3) {
                        cardUvNumber.className = "bg-primary text-white uv-number"
                    } else if (UVdata.value >=3 && UVdata.value < 6) {
                        cardUvNumber.className = "bg-success text-white uv-number"
                    } else if (UVdata.value >= 6 && UVdata.value < 7) {
                        cardUvNumber.className = "bg-warning text-dark uv-number"
                    } else if (UVdata.value >= 8 && UVdata.value < 11) {
                        cardUvNumber.className = "bg-danger text-white uv-number"
                    } else if (UVdata.value >=11) {
                        cardUvNumber.className = "bg-danger text-warning uv-number"
                    }
                    cardUv.appendChild(cardUvNumber);
                    currentCard.appendChild(cardUv);
                    forecastEl.innerHTML = ""
                    forecastEl.innerHTML ="<div class='card card-style'>" +
                        "<h2 class='card-title align-center'>Five Day Forecast</h2>"+
                        "<ul id='forecast-list' class='row'><ul>" +
                        "</div>"
                    return fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLong + "&exclude=currently,minutely,hourly&units=imperial&appid=880297035eb22848e2ca9e450c64066f")
                }) 
                .then(function(forcastresponse){
                    forcastresponse.json().then(function(forecastdata){
                        var forecastList = forecastdata.list 
                        for (var i = 1; i < 6; i++) {
                        var forecastDateDay = moment.unix(forecastdata.daily[i].dt).format("MM/DD/YYYY")
                           var forecast = document.createElement("li")
                           forecast.className = "card col-12 col-xl-2 bg-primary forecast padding-bottom" 
                           forecast.innerHTML = "<p class='text-light'>" + forecastDateDay + "</p>" +
                            "<img class='shadow forecast-image mx-auto d-block' src='http://openweathermap.org/img/wn/" + forecastdata.daily[i].weather[0].icon + "@2x.png' />" +
                            "<p class='text-light'>Temp: " + forecastdata.daily[i].temp.max.toFixed(2) +" °F</p>" +
                            "<p class='text-light'> Humidity: " + Math.round(forecastdata.daily[i].humidity) + "%</p>";
                            console.log(forecast)
                           document.getElementById("forecast-list").appendChild(forecast);
                        }
                    })
                })
            });
            currentWeatherEl.appendChild(currentCard);
        } else { 
            alert("Name not found. \nPlease try again.");
            formEl.reset();
            return false;
        }

    });
}


