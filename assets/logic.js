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
var cityList = document.querySelector("#citylist")

function getAPI(){

// will present historical data. Need to collect current date information
var apiURL = "https://api.openweathermap.org/data/2.5/forecast/?q=";
var citySearch = document.querySelector("#city").value;
var dayCount = "&cnt=5"
var apiKey = "&appid=adfd291a73cb793a96b747e8e6006e24";
var tempUnits = "&units=imperial"
apiURL = apiURL + citySearch + dayCount + tempUnits + apiKey;

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
            currentDate = moment((data["list"][1]["dt_txt"])).format("MMM Do, YYYY");
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
                    // for(i = 0; i <= 5; i++){
                        //get UV index
                        uvIndex = data[0]["value"]
                        uvi.innerHTML = "UV Index: " + uvIndex;
                    // }
                })
        // }
        });
};

// Get API info with submit button
// Add input city value to an array
var submitCity = document.querySelector("#submit");
var cityArray = [];
submitCity.addEventListener("click", function(event){
    event.preventDefault();
    getAPI();
    var citySearch = document.querySelector("#city").value;
    cityArray.push(citySearch);
    if(cityArray.length = 1){
        for(i = 0; i <= cityArray.length; i++){
        var newCity = document.createElement("option");
        newCity.innerHTML = cityArray;
        cityArray.pop(i);
        cityList.append(newCity);
        console.log(newCity);
        };
    };
});

