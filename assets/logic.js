// Call openweathermap API
// API key - adfd291a73cb793a96b747e8e6006e24
// var openWeatherAPI = "https://api.openweathermap.org/data/2.5/weather?q=Tucson&appid=adfd291a73cb793a96b747e8e6006e24";

// fetch(openWeatherAPI)
//     .then(function (response){
//         return response.json();
//     })
//     .then(function (data){
//         console.log(data);
//     });

function getAPI(){
apiURL = "https://api.openweathermap.org/data/2.5/weather?q=";
citySearch = document.querySelector("#city").value;
apiKey = "&appid=adfd291a73cb793a96b747e8e6006e24";
apiURL = apiURL + citySearch + apiKey;

    fetch(apiURL)
        .then(function (response){
            return response.json();
        })
        .then(function (data){
            console.log(data);
        });
};

var submitCity = document.querySelector("#submit");
submitCity.addEventListener("click", function(){
    getAPI();
});