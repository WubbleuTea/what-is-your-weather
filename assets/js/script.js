var cityName = "";
var cityLong = "";
var cityLat = "";
var citiesUsed = [];
var clickedCityEl = document.getElementById("city-submit");
var formEl = document.getElementById("city-form")
var pastCitiesEl = document.getElementById("past-cities");
var currentWeatherEl = document.getElementById("current-weather")
var forecastEl = document.getElementById("five-day")
var currentDate = moment().format("MMMM Do, YYYY");
var deleteStorageEl = document.getElementById("delete-storage")
var checkStorage = JSON.parse(localStorage.getItem("used cities"));

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
    //Passes true to the argument
    runData(true);

});
// deletes local storage and delete any information on the page
deleteStorageEl.addEventListener("click", function(event){
    event.preventDefault();
    citiesUsed = [];
    localStorage.setItem("used cities", "[]");
    formEl.reset();
    pastCitiesEl.innerHTML = "";
    currentWeatherEl.innerHTML = "";
    forecastEl.innerHTML = "";
});


//creates item for previously submitted items.
var createCity = function() {
    // turns any name into first letter capital example: "el paso" ="El Paso"
    cityName = cityName.replace(/(^\w|\s\w)/g, m => m.toUpperCase());
    // create list item to append to ul
    var addingCity = document.createElement("li");
        addingCity.className = "card previous";
        addingCity.id = cityName.toLowerCase();
        addingCity.textContent = cityName;
    pastCitiesEl.appendChild(addingCity);
    // creates an event listener to populate that information to current and forecast weather
    addingCity.addEventListener("click", function(event) {
        event.preventDefault();
        cityName = event.target.textContent
        //Passes false to the argument so it does not create a new <li>
        runData(false)
        
    });
}
//main functon that displays information the user input or clicked
var runData = function(card){
    var currentWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=880297035eb22848e2ca9e450c64066f";
    
    fetch(currentWeather).then(function(response){
        if (response.ok) {
            if (card==true && !citiesUsed.includes(cityName)) {
                // push name into an array and then into local storage
                citiesUsed.push(cityName);
                localStorage.setItem("used cities", JSON.stringify(citiesUsed));
                createCity();
            } 
            // reset both the current weather and forecast divs
            currentWeatherEl.innerHTML = "";
            forecastEl.innerHTML = ""
            // create div current weather and append it with info to page
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
                //other fetches need latitude and longitude
                cityLat = data.coord.lat;
                cityLong = data.coord.lon
                // fetch to grab UV information
                return fetch("https://api.openweathermap.org/data/2.5/uvi?appid=880297035eb22848e2ca9e450c64066f&lat=" + cityLat + "&lon=" + cityLong);
            })
            .then(function(UVresponse){
                UVresponse.json().then(function(UVdata) {
                    //create UV item and give the text a color depending on the UV index
                    var cardUv = document.createElement("p")
                    cardUv.textContent = "UV Index: "
                    var cardUvNumber = document.createElement("span")
                    var uvValue = UVdata.value
                        cardUvNumber.textContent = uvValue
                        cardUvNumber.className =""
                        if (uvValue < 3) {
                            cardUvNumber.className = "bg-primary text-white uv-number"
                        } else if (uvValue >=3 && uvValue < 6) {
                            cardUvNumber.className = "bg-success text-white uv-number"
                        } else if (uvValue >= 6 && uvValue < 7) {
                            cardUvNumber.className = "bg-warning text-dark uv-number"
                        } else if (uvValue >= 8 && uvValue < 11) {
                            cardUvNumber.className = "bg-danger text-white uv-number"
                        } else if (uvValue >=11) {
                            cardUvNumber.className = "bg-danger text-warning uv-number"
                        }
                    // append UV (number styling) text then that to current card div then append card to page
                    cardUv.appendChild(cardUvNumber);
                    currentCard.appendChild(cardUv);
                    currentWeatherEl.appendChild(currentCard);
                    // append Five Day Forcast title to page before the cards creates the ul needed for cards
                    forecastEl.innerHTML ="<div class='card card-style'>" +
                        "<h2 class='card-title align-center'>Five Day Forecast</h2>"+
                        "<ul id='forecast-list' class='row'><ul>" +
                        "</div>"
                        //fetch 5 day forcast data
                    return fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLong + "&exclude=currently,minutely,hourly&units=imperial&appid=880297035eb22848e2ca9e450c64066f")
                }) 
                .then(function(forcastresponse){
                    forcastresponse.json().then(function(forecastdata){
                        var forecastDaily = forecastdata.daily;
                        // 0 is today so start at 1 for the next day
                        for (var i = 1; i < 6; i++) {
                            //use dt (unix time) to populate the date
                        var forecastDateDay = moment.unix(forecastdata.daily[i].dt).format("MM/DD/YYYY")
                        //create each days weather forecast
                           var forecast = document.createElement("li")
                            forecast.className = "card col-12 col-xl-2 bg-primary forecast padding-bottom" 
                            forecast.innerHTML = "<p class='text-light'>" + forecastDateDay + "</p>" +
                                    "<img class='shadow forecast-image mx-auto d-block' src='http://openweathermap.org/img/wn/" + forecastDaily[i].weather[0].icon + "@2x.png' />" +
                                    "<p class='text-light'>Temp: " + forecastDaily[i].temp.max.toFixed(2) +"°F</p>" +
                                    "<p class='text-light'> Humidity: " + Math.round(forecastDaily[i].humidity) + "%</p>";
                            document.getElementById("forecast-list").appendChild(forecast);
                        }
                    })
                })
            });
            //alert user that input they gave does not return any weather.
        } else { 
            alert("Name not found. \nPlease try again.");
            formEl.reset();
            return false;
        }
    });
}
// function to grab items from localStorage and populate them on past search history
var oldSearchHistory = function() {
    if (!checkStorage) {
        return; 
    } else {
        localStorage.clear();
        for (var i =0; i < checkStorage.length; i++) {
            citiesUsed.push(checkStorage[i]);  
            cityName = checkStorage[i].replace(/(^\w|\s\w)/g, m => m.toUpperCase());
            createCity(cityName);
        }  
        // puts all items made in for loop into localStorage
        localStorage.setItem("used cities", JSON.stringify(citiesUsed));
    }   
}
oldSearchHistory();