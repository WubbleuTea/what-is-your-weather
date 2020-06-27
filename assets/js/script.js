var cityName = "";
var clickedCity = document.getElementById("city-submit");
var typedCity = document.getElementById("city-submit");
var formEl = document.getElementById("city-form")
var pastCitiesEl = document.getElementById("past-cities");
var currentWeatherEl = document.getElementById("current-weather")
var currentDate = moment().format("MMMM do, YYYY");



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
    addingCity.addEventListener("click", function(event) {
        event.preventDefault();
        cityName = event.target.textContent
        runData(cityName)
    });
}



var runData = function(){
    var currentWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=880297035eb22848e2ca9e450c64066f";
    var fiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=880297035eb22848e2ca9e450c64066f";

    fetch(currentWeather).then(function(response){
        if (response.ok) {
            currentWeatherEl.innerHTML = "";
            var currentCard = document.createElement("div");
            currentCard.className = "card align-center card-style";            
            response.json().then(function(data) {
                //creates name h2
                var cardName = document.createElement("div");
                // cardName.className = "breadcrumb-item align-center";
                cardName.innerHTML = "<h2 class='card-title'>Current Weather</h2><div class='breadcrumb-item justify-center'><h3>" + data.name + ":<span> " + currentDate + "</span>" +"</h3>" + 
                    //why is data.weather.icon coming up undefined?
                    "<img class='shadow' src='http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png' /></div>" +
                    "<p>Temperature: " + data.main.temp.toFixed(1) + "°F</p>" +
                    "<p>Humidity: " + data.main.humidity + "%</p>" +
                    "<p>Wind Speed: " + data.wind.speed.toFixed(1) + " MPH</p>";
                    //where is UV index?
                    currentCard.appendChild(cardName)
                // var cardUv = document.createElement("p");
                // cardUv.textContent=
                console.log(data.weather[0].icon);
                // console.log("lat=" + data.coord.lat + ", lon=" + data.coord.lon)
                return fetch("https://api.openweathermap.org/data/2.5/uvi?appid=880297035eb22848e2ca9e450c64066f&lat=" + data.coord.lat + "&lon=" + data.coord.lon);
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

                    return fetch(fiveDay)
                }) 
                .then(function(forcastresponse){
                    forcastresponse.json().then(function(forcastdata){
                        console.log(forcastdata);

                    })
                })
            });
        } else {
            alert("Error: " + response.message)
            formEl.reset();
            return
        }
        currentWeatherEl.appendChild(currentCard);
        // });
        // need to grab Name, todays date, an emoji, tempurature = to weather, humidity, wind speed, uv index (uv index color codes)

        fetch(fiveDay).then(function(response){
            if (response.ok) {
                console.log(fiveDay);
            } else {
                return
            }
            // need to grab date, emoji = to weather, temp and humidity
        
        });
    });
}
//localStorage

//eventTarget

