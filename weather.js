const API_KEY = "171d8c2d1bc4c74cd2eb54eee2b5749c";

const cityInput = document.getElementById("cityInput");
const weatherBtn = document.getElementById("weatherBtn");
const weatherDiv = document.getElementById("weather");

function showError(message) {
    weatherDiv.innerHTML = '<span class="error">' + message + "</span>";
}

function getWeather() {
    const city = cityInput.value.trim();

    if (city === "") {
        showError("Введіть назву міста.");
        return;
    }

    const url = "https://api.openweathermap.org/data/2.5/weather?q="
        + encodeURIComponent(city)
        + "&appid=" + API_KEY
        + "&units=metric&lang=ua";

    weatherDiv.textContent = "Завантаження...";

    fetch(url)
        .then(response => {
            if (response.status === 404) {
                throw new Error("Місто не знайдено.");
            }
            if (response.status === 401) {
                throw new Error("Невірний або ще не активований API-ключ.");
            }
            if (!response.ok) {
                throw new Error("Помилка сервера: " + response.status);
            }
            return response.json();
        })
        .then(data => {
            const temp = data.main.temp;
            const humidity = data.main.humidity;
            const wind = data.wind.speed;

            weatherDiv.innerHTML =
                "<h3>" + data.name + "</h3>" +
                "<p>Температура: " + temp + " °C</p>" +
                "<p>Вологість: " + humidity + " %</p>" +
                "<p>Швидкість вітру: " + wind + " м/с</p>";
        })
        .catch(error => {
            showError("Помилка: " + error.message);
        });
}

weatherBtn.addEventListener("click", getWeather);