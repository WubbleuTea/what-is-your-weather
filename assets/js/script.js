var cityName = "";
var clickedCity = document.getElementById("city-submit");
var typedCity = document.getElementById("city-submit");
var formEl = document.getElementById("city-form")
var pastCitiesEl = document.getElementById("past-cities");
var currentWeatherEl = document.getElementById("current-weather")




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
    var currentWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=880297035eb22848e2ca9e450c64066f";
    var fiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=880297035eb22848e2ca9e450c64066f";

    // do the check here for city name!
        // clear out input
    fetch(currentWeather).then(function(response){
        if (response.ok) {
            currentWeatherEl.innerHTML = "";
            var currentCard = document.createElement("div");
            currentCard.className = "card current";            
            response.json().then(function(data) {
                //creates name h2
                var cardName = document.createElement("div");
                // cardName.className = "breadcrumb-item current";
                cardName.innerHTML = "<div class='breadcrumb-item current'><h3>" + data.name + "</h3>" + 
                    //why is data.weather.icon coming up undefined?
                    "<img src='http://openweathermap.org/img/wn/10d" + data.weather.icon + "@4x.png' /></div>" +
                    "<p>Temperature: " + data.main.temp.toFixed(1) + "°F</p>" +
                    "<p>Humidity: " + data.main.humidity + "%</p>" +
                    "<p>Wind Speed: " + data.wind.speed.toFixed(1) + " MPH</p>" +
                    //where is UV index?
                    currentCard.appendChild(cardName)
                var cardUv = document.createElement("p");
                cardUv.textContent=
                console.log(data.weather.icon);
                // console.log("lat=" + data.coord.lat + ", lon=" + data.coord.lon)
                return fetch("https://api.openweathermap.org/data/2.5/uvi?appid=880297035eb22848e2ca9e450c64066f&lat=" data.coord.lat + "&lon=" + data.coord.lon)

             //below is the way I did it were I gave each item a variable then appended which way is better?       

                // var cardName = document.createElement("h3");
                // var weatherIcon = "";
                // weatherIcon.innerHTML = "<img src='http://openweathermap.org/img/wn/10d' + data.weather.icon.value + 'xpng'/ >"
                // cardName.textContent = data.name 
                // cardName.appendChild(weatherIcon)


                // console.log(cardName);
                // console.log("Your weather icon is " + data.weather.icon)

                // //creates temp
                // var cardTemp =document.createElement("p");
                // cardTemp.textContent = "Temperature: " + data.main.temp.toFixed(1) + "°F";
                // currentCard.appendChild(cardTemp);
                // console.log(cardTemp)
                // console.log(data.main.temp)

                // // creates humidity
                // var cardHumidity =document.createElement("p");
                // cardHumidity.textContent = "Humidity: " + data.main.humidity + "%"
                // currentCard.appendChild(cardHumidity);
                // console.log(cardHumidity);

                // // creates wind speed
                // var cardWind =document.createElement("p");
                // cardWind.textContent = "Wind Speed: " + data.wind.speed.toFixed(1) + " MPH"
                // currentCard.appendChild(cardWind);
                // console.log(cardWind);


            });
            console.log(currentWeather);

        } else {
            alert("Error: " + response.message)
            formEl.reset();
            return
        }
        currentWeatherEl.appendChild(currentCard);
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
