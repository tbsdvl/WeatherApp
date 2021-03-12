// Call openweathermap API
// API key - adfd291a73cb793a96b747e8e6006e24
// var openWeatherAPI = "https://api.openweathermap.org/data/2.5/weather?q=Tucson&appid=adfd291a73cb793a96b747e8e6006e24";

var city = document.getElementById("cityheader");
var date = document.querySelector("#date");
var temp = document.querySelector("#temp");
var humid = document.querySelector("#humidity");
var wind = document.querySelector("#windspeed");
var uvi = document.querySelector("#uvi");
var weatherType = document.querySelector("#icon");
var citySelector = document.querySelector("#selector");
var dailyForecast = document.querySelector("#forecast");

function getAPI() {
  // will present historical data. Need to collect current date information
  var apiURL = "https://api.openweathermap.org/data/2.5/forecast?q=";
  var citySearch = document.querySelector("#city").value;
  var dayCount = "&cnt=5";
  var apiKey = "&appid=adfd291a73cb793a96b747e8e6006e24";
  var tempUnits = "&units=imperial";
  apiURL = apiURL + citySearch + dayCount + tempUnits + apiKey;

  fetch(apiURL)

    .then(function (response){
        console.log(response)
        if(response.status === 400){
            response.textContent = response.status
        }
        return response.json();
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // reference to data
      console.log(data);

      // get weather data
      var lattitude = data["city"]["coord"]["lat"];
      var longitude = data["city"]["coord"]["lon"];
      var lonPrefix = "&lon=";
      apiURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=";
      apiURL = apiURL + lattitude + lonPrefix + longitude + apiKey;

      fetch(apiURL)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          //get UV index
          var uvIndex = data[0]["value"];

          // Connect to onecall API
          apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=";
          apiURL =
            apiURL + lattitude + lonPrefix + longitude + tempUnits + apiKey;

          fetch(apiURL)
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              console.log(data);

              // get the date
              var currentDate = moment(data["daily"][0]["dt"] * 1000).format(
                "MMM Do, YYYY"
              );
              date.innerHTML = "Date: " + currentDate;

              // get weather icon, wind speed
              var weatherIcon = data["daily"][0]["weather"][0]["icon"];
              var windSpeed = data["daily"][0]["wind_speed"];
              wind.innerHTML = "Wind Speed: " + windSpeed + " MPH";
              weatherType.setAttribute(
                "src",
                "http://openweathermap.org/img/wn/" + weatherIcon + ".png"
              );
              weatherType.setAttribute("alt", "Weather Icon");

              // get temp + humidity
              var temperature = data["current"]["temp"];
              temp.innerHTML = "Temperature: " + temperature + " °F";
              var humidity = data["current"]["humidity"];
              humid.innerHTML = "Humidity: " + humidity + "%";

              // get UV index
              var uvIndex = data["current"]["uvi"];
              uvi.innerHTML = "UV Index: " + uvIndex;

              // Create and fill 5 day forecast
              for (i = 0; i <= 4; i++) {
                var forecastBox = document.createElement("div");
                var forecastDate = document.createElement("p");
                var forecastImg = document.createElement("img");
                var forecastTemp = document.createElement("p");
                var forecastHumidity = document.createElement("p");
                var dailyDate = moment(data["daily"][i]["dt"] * 1000).format(
                  "MMM Do, YYYY"
                );
                var dailyIcon = data["daily"][i]["weather"][0][["icon"]];
                var dailyTemp = data["daily"][i]["temp"]["day"] + " °F";
                var dailyHumidity = data["daily"][i]["humidity"] + "%";
                forecastBox.setAttribute(
                  "class",
                  "col-sm bg-primary text-light justify-content-evenly"
                );
                forecastImg.setAttribute(
                  "src",
                  "http://openweathermap.org/img/wn/" + dailyIcon + ".png"
                );
                forecastImg.setAttribute("alt", "weather icon");
                forecastDate.innerHTML = dailyDate;
                forecastTemp.innerHTML = "Temperature: " + dailyTemp;
                forecastHumidity.innerHTML = "Humidity: " + dailyHumidity;
                forecastBox.append(
                  forecastDate,
                  forecastImg,
                  forecastTemp,
                  forecastHumidity
                );
                dailyForecast.append(forecastBox);
              }
            });
        });

      // get city name
      var cityName = data["city"]["name"];
      city.innerHTML = "City: " + cityName;
    });
}

// Get API info with submit button
// Add input city value to an array
var submitCity = document.querySelector("#submit");
var cityArray = [];

submitCity.addEventListener("click", function (event) {
  event.preventDefault();
  getAPI();

  var citySearch = document.querySelector("#city").value;
  localStorage.setItem("City", citySearch);
  cityArray.push(citySearch);

  if ((cityArray.length = 1)) {
    for (i = 0; i <= cityArray.length; i++) {
      var newCity = document.createElement("option");
      newCity.innerHTML = cityArray;
      cityArray.pop(i);
      citySelector.append(newCity);
      console.log(newCity);
    }
  }
});
