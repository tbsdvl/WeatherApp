// Call openweathermap API
// API key - adfd291a73cb793a96b747e8e6006e24
// var openWeatherAPI = "https://api.openweathermap.org/data/2.5/weather?q=Tucson&appid=adfd291a73cb793a96b747e8e6006e24";

var city = document.getElementById("cityheader");
var date = document.querySelector("#date");
var temp = document.querySelector("#temp");
var humid = document.querySelector("#humidity");
var wind = document.querySelector("#windspeed");
var uvi = document.querySelector("#uvi")
var uviText = document.querySelector("#uvitext");
var weatherType = document.querySelector("#icon");

function getAPI(){

    // will present historical data. Need to collect current date information
apiURL = "https://api.openweathermap.org/data/2.5/forecast?q=";
citySearch = document.querySelector("#city").value;
apiKey = "&appid=adfd291a73cb793a96b747e8e6006e24";
tempUnits = "&units=imperial"
apiURL = apiURL + citySearch + tempUnits + apiKey;

    fetch(apiURL)
        .then(function (response){
            return response.json();
        })
        .then(function (data){
            // reference to data
            console.log(data)

            
            // get city name and the date
            cityName = (data["city"]["name"]);
            city.innerHTML = "City: " + cityName;
            // for(i = 0; i <= 5; i++){
            currentDate = moment((data["list"][0]["dt"])).format("MMM Do, YYYY");
            date.innerHTML = "Date: " + currentDate;

            // get weather conditions, weather icon, wind speed
            weatherConditions = (data["list"][0]["weather"][0]["main"]);
            weatherIcon = (data["list"][0]["weather"][0]["icon"]);
            windSpeed = (data["list"][0]["wind"]["speed"]);
            wind.innerHTML = "Wind Speed: " + windSpeed + " MPH";
            weatherType.setAttribute("src", "http://openweathermap.org/img/wn/" + weatherIcon + ".png");
            weatherType.setAttribute("alt", "Weather Icon");

            // get temp + humidity
            temperature = (data["list"][0]["main"]["temp"]);
            temp.innerHTML = "Temperature: " + temperature + " °F";
            humidity = (data["list"][0]["main"]["humidity"]);
            humid.innerHTML = "Humidity: " + humidity + "%";

            // get UV index
            lattitude = (data["city"]["coord"]["lat"])
            longitude = (data["city"]["coord"]["lon"])
            lonPrefix = "&lon="
            apiURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat="
            apiURL = apiURL + lattitude + lonPrefix + longitude + apiKey;

            fetch(apiURL)
                .then(function (response){
                    return response.json();
                })
                .then(function (data){
                    for(i = 0; i <= 5; i++){
                        uvIndex = data[i]["value"]
                        uvi.textContent = "UV Index: " + uvIndex;
                    }
                })
        // }
        });
};

var submitCity = document.querySelector("#submit");
submitCity.addEventListener("click", function(){
    getAPI();
});

