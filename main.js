const API_KEY = "XXXXX";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let date = document.getElementById("date");
let time = document.getElementById("time");
let cityName = document.getElementById("cityName");
let searchCityName = document.getElementById("searchCityName");

function convertEpoch(value) {
    var utcSeconds = value * 1000;
    var d = new Date(utcSeconds);
    console.log(d.toLocaleString())
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    let hours = d.getHours();
    let mins = d.getMinutes();
    let secs = d.getSeconds();

    return {
        currentDate: `${date} ${month} ${year}`,
        currentTime: `${hours}:${mins}:${secs}`
        }; 
}

searchCityName.addEventListener('click', getWeather)

function getWeather() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
    dateTime = convertEpoch(data.dt);
    date.innerText = dateTime.currentDate;
    time.innerText = dateTime.currentTime;
});
}
