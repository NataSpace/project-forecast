let currentTime = new Date();
function formatDate(date) {
	let currentHours = date.getHours();
	if (currentHours < 10) {
		currentHours = `0${currentHours}`;
	}
	let currentMinutes = date.getMinutes();
	if (currentMinutes < 10) {
		currentMinutes = `0${currentMinutes}`;
	}

	let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	let currentDay = days[date.getDay()];

	let formattedDate = `${currentDay}, ${currentHours}:${currentMinutes}`;

	return formattedDate;
}

console.log(formatDate(currentTime));
let h3 = document.querySelector("h3");
h3.innerHTML = formatDate(currentTime);

function search(event) {
	event.preventDefault();
	let searchInput = document.querySelector("#search-text-input");
	console.log(searchInput.value);
	let choice = document.querySelector(".choice");
	choice.innerHTML = `${searchInput.value}`;
	let apiKey = "fe8644e6ab0b8f7fd55fb25e70f71e7b";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(showTemperature);
	axios.get(apiUrl).then(showWind);
	axios.get(apiUrl).then(showHumidity);
	axios.get(apiUrl).then(showDescription);
}
let buttonSearch = document.querySelector("#buttonSearch");
buttonSearch.addEventListener("click", search);

function showTemperature(response) {
	console.log(response.data);
	let temperatureElement = document.querySelector("#temperature");
	console.log(response.data.main.temp + "°С");
	let degree = document.querySelector(".degree");
	degree.innerHTML = `${Math.round(response.data.main.temp)}`;
}
function showWind(response) {
	console.log(response.data);
	let windElement = document.querySelector("#wind");
	console.log(response.data.wind.speed);
	let wind = document.querySelector(".wind");
	wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
}
function showHumidity(response) {
	console.log(response.data);
	let humidityElement = document.querySelector("#humidity");
	console.log(response.data.main.humidity);
	let humidity = document.querySelector(".humidity");
	humidity.innerHTML = `Humidity: ${Math.round(response.data.main.humidity)} %`;
}
function showDescription(response) {
	console.log(response.data);
	let descriptionElement = document.querySelector("#description");
	console.log(response.data.weather[0].main);
	let description = document.querySelector(".precipitation");
	description.innerHTML = response.data.weather[0].main;
}

function showLocationCity(response) {
	let cityName = response.data.name;
	let cityLocation = document.querySelector(".choice");
	cityLocation.innerHTML = cityName;
}

function showLocation(position) {
	let lat = position.coords.latitude;
	let lon = position.coords.longitude;
	let apiKey = "fe8644e6ab0b8f7fd55fb25e70f71e7b";
	let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
	axios.get(url).then(showTemperature);
	axios.get(url).then(showLocationCity);
}

function currentLocation(event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(showLocation);
}

let buttonCurrent = document.querySelector("#buttonCurrent");
buttonCurrent.addEventListener("click", currentLocation);
