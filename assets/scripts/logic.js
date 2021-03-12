// Call openweathermap API
// API key - adfd291a73cb793a96b747e8e6006e24
// var openWeatherAPI = "https://api.openweathermap.org/data/2.5/weather?q=Tucson&appid=adfd291a73cb793a96b747e8e6006e24";

// Variables collecting element ids on the html document
// These queries will allow program to insert api data to html elements
var city = document.getElementById("cityheader");
var date = document.querySelector("#date");
var temp = document.querySelector("#temp");
var humid = document.querySelector("#humidity");
var wind = document.querySelector("#windspeed");
var uvi = document.querySelector("#uvi");
var weatherType = document.querySelector("#icon");
var citySelector = document.querySelector("#selector");
var dailyForecast = document.querySelector("#forecast");

// Calls openweatherAPI
function getAPI() {
  // Present base URL, add user's input text to url string, collect weather data for 5 days,
  // set the temperature measurement to fahrenheit, then add the api key
  var apiURL = "https://api.openweathermap.org/data/2.5/forecast?q=";
  var citySearch = document.querySelector("#city").value;
  var dayCount = "&cnt=5";
  var apiKey = "&appid=adfd291a73cb793a96b747e8e6006e24";
  var tempUnits = "&units=imperial";
  apiURL = apiURL + citySearch + dayCount + tempUnits + apiKey;

  // call the API
  fetch(apiURL)
    // If there is no response from the API, present this error in the console
    .then(function (response) {
      console.log(response);
      if (response.status === 400) {
        response.textContent = response.status;
      }
       // if there is a successful api call, return the response in json format
      return response.json();
    })
    .then(function (data) {
      // reference to data and prompt in the console as a json object
      console.log(data);

      // get forecast data
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
          var uvIndex = data[0]["value"];

          // Connect to onecall API and collect specific weather data
          // including date, weather condition icon, wind speed,
          // temperature, humidity, and the UV index
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

              // Create and fill 5 day forecast on html document
              for (i = 0; i <= 4; i++) {
                // create the new html elements
                var forecastBox = document.createElement("div");
                var forecastDate = document.createElement("p");
                var forecastImg = document.createElement("img");
                var forecastTemp = document.createElement("p");
                var forecastHumidity = document.createElement("p");

                // collect daily weather data
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

                // setting the html's content to the weather data
                forecastDate.innerHTML = dailyDate;
                forecastTemp.innerHTML = "Temperature: " + dailyTemp;
                forecastHumidity.innerHTML = "Humidity: " + dailyHumidity;

                // insert api data into newly created div containing
                // the data, the weather condition icon, the temperature,
                // and the humidity
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

      // get input city name
      var cityName = data["city"]["name"];
      city.innerHTML = "City: " + cityName;
    });
}

// Get API info with submit button
// Add input city value to an array
var submitCity = document.querySelector("#submit");
var cityArray = [];

// The submit button listens for a click
submitCity.addEventListener("click", function (event) {
  // prevent the submission button from deafulting
  event.preventDefault();
  // call the API upon clicking submit
  getAPI();

  var citySearch = document.querySelector("#city").value;
  // store the city to localStorage
  localStorage.setItem("City", citySearch);

  // Add the user input city into the array of locations user enters
  cityArray.push(citySearch);

  // Add the user's input cities from the array to the selector element
  // each time the user submits a valid text value in the input element
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
