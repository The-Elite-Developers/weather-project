const API_KEY = "1032c5bb249668ca063747a1198441d9";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Some Functions
let date = document.getElementById("date");
let time = document.getElementById("time");
let weather = document.getElementById("weather");
let weatherIcon = document.getElementById("weather-icon");
let cityName = document.getElementById("cityName");
let searchCityName = document.getElementById("searchCityName");
let temp = document.getElementById("temp");
let minTemp = document.getElementById("min_temp");
let maxTemp = document.getElementById("max_temp");
let pressure = document.getElementById("pressure");
let humidity = document.getElementById("humidity");
let city = document.getElementById("city");
let container = document.getElementById("container");
let errorContainer = document.getElementById("error-container");
let errorMsg = document.getElementById("error-msg");

function convertEpoch(value) {
  var utcSeconds = value * 1000;
  var d = new Date(utcSeconds);
  console.log(d.toLocaleString());
  let date = d.getDate() < 10 ? `0${g.getDate()}` : d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  let hours = d.getHours() < 10 ? `0${d.getHours()}` : d.getHours();
  let mins = d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes();
  let secs = d.getSeconds() < 10 ? `0${d.getSeconds()}` : d.getSeconds();

  return {
    currentDate: `${date} ${month} ${year}`,
    currentTime: `${
      hours > 12 ? (hours - 12 < 10 ? `0${hours - 12}` : hours - 12) : hours
    }:${mins}:${secs} ${hours >= 12 ? "PM" : "AM"}`,
  };
}

function kelvinToCelcius(value) {
  return parseFloat(value - 273.15).toFixed(2);
}

function capitalize(str) {
  let arr = str.split(" ");
  let newarr = arr.map(
    (element) => element.charAt(0).toUpperCase() + element.slice(1)
  );
  return newarr.join(" ");
}

// Main API call
let getWeather = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${API_KEY}`
    ); // API call
    const data = await response.json(); // API response
    if (data.cod !== 200) {
      // If API call is not successfull
      container.classList.contains("no-display") ||
        container.classList.add("no-display"); // To change the result display if city is not found
      errorContainer.classList.remove("no-display");
      errorMsg.innerText = data.message.toUpperCase();
    } else {
      // If API call is successfull
      console.log(data);
      errorContainer.classList.contains("no-display") ||
        errorContainer.classList.add("no-display");
      container.classList.remove("no-display");
      city.innerText = `${data.name}, ${data.sys.country}`;
      dateTime = convertEpoch(data.dt);
      date.innerText = dateTime.currentDate;
      time.innerText = dateTime.currentTime;
      weather.innerHTML = `${capitalize(
        data.weather[0].description
      )}, ${kelvinToCelcius(
        data.main.temp
      )}<span class="metric-unit"><sup>o</sup>C</span>`;
      console.log(
        `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png alt="Weather Icon" />`
      );
      weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon" />`;
      minTemp.innerHTML = `<span class="parameter">Min Temp</span> : ${kelvinToCelcius(
        data.main.temp_min
      )}<span class="metric-unit"><sup>o</sup>C</span>`;
      maxTemp.innerHTML = `<span class="parameter">Max Temp</span> : ${kelvinToCelcius(
        data.main.temp_max
      )}<span class="metric-unit"><sup>o</sup>C</span>`;
      pressure.innerHTML = `<span class="parameter">Pressure</span> : ${data.main.pressure} <span class="metric-unit">hPa<span>`;
      humidity.innerHTML = `<span class="parameter">Humidity</span> : ${data.main.humidity} <span class="metric-unit">%</span>`;
    }
    cityName.value = ""; // To remove the city name in the element once the search is complete
  } catch (e) {
    console.log(e);
  }
};

// Event listeners
searchCityName.addEventListener("click", getWeather);
