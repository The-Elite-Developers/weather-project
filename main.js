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

let date = document.getElementById("date");
let time = document.getElementById("time");
let cityName = document.getElementById("cityName");
let searchCityName = document.getElementById("searchCityName");
let temp = document.getElementById("temp");
let minTemp = document.getElementById("min_temp");
let maxTemp = document.getElementById("max_temp");
let pressure = document.getElementById("pressure");
let humidity = document.getElementById("humidity");
let city = document.getElementById("city");
let container = document.getElementById("container");
let error = document.getElementById("error-msg");

function convertEpoch(value) {
  var utcSeconds = value * 1000;
  var d = new Date(utcSeconds);
  console.log(d.toLocaleString());
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  let hours = d.getHours();
  let mins = d.getMinutes();
  let secs = d.getSeconds();

  return {
    currentDate: `${date} ${month} ${year}`,
    currentTime: `${hours}:${mins}:${secs}`,
  };
}

searchCityName.addEventListener("click", getWeather);

function kelvinToCelcius(value) {
  return parseFloat(value - 273.15).toFixed(2);
}

// function getWeather() {

//     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${API_KEY}`)
//     .then(response => {if (response.status >= 200 && response.status <= 299) {
//         return response.json();
//       } else {
//         throw Error(response.statusText);
//       }})
//     .then(data => {
//         // if(data.id){
//             container.classList.remove("no-display");
//             city.innerText = data.name;
//             dateTime = convertEpoch(data.dt);
//             date.innerText = dateTime.currentDate;
//             time.innerText = dateTime.currentTime;
//             temp.innerHTML = `Temp - ${kelvinToCelcius(data.main.temp)}<sup>o</sup>C`;
//             minTemp.innerHTML = `Min Temp - ${kelvinToCelcius(data.main.temp_min)}<sup>o</sup>C`;
//             maxTemp.innerHTML = `Max Temp - ${kelvinToCelcius(data.main.temp_max)}<sup>o</sup>C`;
//             pressure.innerText = 'Pressure - ' + data.main.pressure + ' hPa';
//             humidity.innerText = 'Humidity - ' + data.main.humidity + ' %';
//         // }else{
//         //     error.classList.remove("no-display");
//         //     error.innerText = data.message;
//         // }

//     })
//     .catch((err) =>{
//         error.classList.remove("no-display");
//         error.innerText = "City not Found";
//         console.log(err);
//     });
// }

async function getWeather() {
  try {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${API_KEY}`
    );
    const data = await response.json();
    container.classList.remove("no-display");
    city.innerText = data.name;
    dateTime = convertEpoch(data.dt);
    date.innerText = dateTime.currentDate;
    time.innerText = dateTime.currentTime;
    temp.innerHTML = `Temp - ${kelvinToCelcius(data.main.temp)}<sup>o</sup>C`;
    minTemp.innerHTML = `Min Temp - ${kelvinToCelcius(
      data.main.temp_min
    )}<sup>o</sup>C`;
    maxTemp.innerHTML = `Max Temp - ${kelvinToCelcius(
      data.main.temp_max
    )}<sup>o</sup>C`;
    pressure.innerText = "Pressure - " + data.main.pressure + " hPa";
    humidity.innerText = "Humidity - " + data.main.humidity + " %";
  } catch (error) {
    error.classList.remove("no-display");
    error.innerText = "City not Found";
  }
}
