// Call openweathermap API
// API key - adfd291a73cb793a96b747e8e6006e24
// var openWeatherAPI = "https://api.openweathermap.org/data/2.5/weather?q=Tucson&appid=adfd291a73cb793a96b747e8e6006e24";

function getAPI(){
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

            for(i = 0; i <= 5; i++){
            // get city name and the date
            console.log(data["city"]["name"]);
            console.log(data["list"][i]["dt_txt"])

            // get weather conditions, weather icon, wind speed
            console.log(data["list"][i]["weather"][0]["main"]);
            console.log(data["list"][i]["weather"][0]["icon"]);
            console.log(data["list"][i]["wind"]["speed"]);

            // get temp + humidity
            console.log(data["list"][i]["main"]["temp"]);
            console.log(data["list"][i]["main"]["humidity"]);

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
                        console.log(data[i]["value"])
                    }
                })
            }
        });
};

var submitCity = document.querySelector("#submit");
submitCity.addEventListener("click", function(){
    getAPI();
});

