let url = "https://api.openweathermap.org/data/2.5/weather?q=";
const key = "e42926ee92fbe40b2574045297cf3d8b";
const getWeather = (city) => {
  let API = `${url}${city}&appid=${key}`;
  const weatherPromise = fetch(API);
  return weatherPromise.then((Response) => {
    return Response.json();
  });
};

const form = document.querySelector("form");
form.addEventListener(
  "submit",
  (searchCity = (e) => {
    e.preventDefault();
    const city = document.getElementById("city-input").value;
    getWeather(city)
      .then((Response) => {
        showWeatherData(Response);
        console.log(Response);
      })
      .catch((err) => {
        console.log(err.message);
      });
  })
);
showWeatherData = (data) => {
  // location
  document.getElementById("location").innerText = data.name;
  // wind
  document.getElementById("wind").innerText = data.wind["speed"].toFixed(2);
  // max
  let MaxTemperature = (data.main["temp_max"] - 273.15).toFixed(2);
  document.getElementById("max-temp").innerText = MaxTemperature;
  // description
  document.getElementById("desc").innerText = data.weather[0].description;
  // min
  let MinTemperature = (data.main["temp_min"] - 273.15).toFixed(2);
  document.getElementById("min-temp").innerText = MinTemperature;
  // current temp
  let Temperature = (data.main["feels_like"] - 273.15).toFixed(2);
  document.getElementById("temperature").innerText = Temperature;
  // country
  var d = new Date();
  const date = d.toLocaleTimeString();
  document.getElementById("country").innerText = date + " Pm";
  document.getElementById("result").style.display = "block";
  document.getElementById("city-input").value = "";
};
