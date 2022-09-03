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

function formateDay(timesTamp) {
	let date = new Date(timesTamp * 1000);
	let day = date.getDay();
	let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	return days[day];
}

function displayForecast(response) {
	let forecast = response.data.daily;
	console.log(response.data.daily);
	let forecastElement = document.querySelector("#forecast");
	let forecastHTML = `<div class="row">`;
	let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed"];
	forecast.forEach(function (forecastDay, index) {
		if (index < 5) {
			forecastHTML =
				forecastHTML +
				`
	    <div class="col">
		    <div class="day-of-the-week">${formateDay(forecastDay.dt)}</div>
			<div class="precipitation">${forecastDay.weather[0].main}</div>
			<div class="row">
				<div class="col">
					<img
					src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
					alt="Sunny"
					width="100px"
					class="img-sun"
					/>
				</div>
				<div class="col"><span class="degree">${Math.round(forecastDay.temp.day)}</span></div>
			</div>
		</div>
	`;
		}
	});

	forecastHTML = forecastHTML + `</div>`;
	forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
	console.log(coordinates);
	let apiKey = "fe8644e6ab0b8f7fd55fb25e70f71e7b";
	let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(displayForecast);
}

function search(event) {
	event.preventDefault();
	let searchInput = document.querySelector("#search-text-input");
	console.log(searchInput.value);
	let choice = document.querySelector(".choice");
	choice.innerHTML = `${searchInput.value}`;

	searchCity(searchInput.value);
}

function searchCity(city) {
	let apiKey = "fe8644e6ab0b8f7fd55fb25e70f71e7b";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(showTemperature);
	axios.get(apiUrl).then(showWind);
	axios.get(apiUrl).then(showHumidity);
	axios.get(apiUrl).then(showDescription);
}

searchCity("Dnipro");

let buttonSearch = document.querySelector("#buttonSearch");
buttonSearch.addEventListener("click", search);

function showTemperature(response) {
	console.log(response.data);
	let temperatureElement = document.querySelector("#temperature");
	console.log(response.data.main.temp + "°С");
	let degree = document.querySelector(".degree");
	degree.innerHTML = `${Math.round(response.data.main.temp)}`;
	let iconElement = document.querySelector("#icon");
	iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
	console.log(response.data.weather[0].icon);
	celsiusTemperature = response.data.main.temp;

	getForecast(response.data.coord);
}
function showWind(response) {
	let windElement = document.querySelector("#wind");
	console.log(response.data.wind.speed);
	let wind = document.querySelector(".wind");
	wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
}
function showHumidity(response) {
	let humidityElement = document.querySelector("#humidity");
	console.log(response.data.main.humidity);
	let humidity = document.querySelector(".humidity");
	humidity.innerHTML = `Humidity: ${Math.round(response.data.main.humidity)} %`;
}
function showDescription(response) {
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

function displayFahrenheitTemperature(event) {
	event.preventDefault();
	let temperatureUnitElement = document.querySelector("#temperature");
	let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
	temperatureUnitElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displaycelsiusTemperature(event) {
	event.preventDefault();
	let temperatureUnitElement = document.querySelector("#temperature");
	temperatureUnitElement.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displaycelsiusTemperature);

let celsiusTemperature = null;
