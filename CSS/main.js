const api = {
  key: "007b1ab4d9bf3379b658620557a46ea1",
  baseurl: "https://api.openweathermap.org/data/2.5/",
};

const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
    console.log();
  }
}

function getResults(query) {
  fetch(`${api.baseurl}weather?q=${query}&units=imperial&appid=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  console.log(weather);
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;
  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);
  let temp = document.querySelector(".location .current .temp");
  temp.innerText = `${Math.round(weather.main.temp)}°F`;
  let weathertype = document.querySelector(".current .weather");
  weathertype.innerText = `${weather.weather[0].main}`;
}

function dateBuilder(d) {
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
  let month = months[d.getMonth()];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[d.getDay()];
  let date = d.getDate();
  let year = d.getFullYear();
  return `${day} ${date} ${month} ${year}`;
}
