const apiKey = "8478c45c375bbf32ad606a223e11acbc";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".searchBox");
const searchbtn = document.querySelector(".searchbtn");
const weatherIcon = document.querySelector(".weather-icon");
const weatherContainer = document.querySelector(".weather");
const errorContainer = document.querySelector(".error");

async function checkWeather(city) {
  if (!city.trim()) {
    errorContainer.style.display = "none";
    weatherContainer.style.display = "none";
    return;
  }

  const spinner = document.getElementById("spinner");
  spinner.style.display = "block";

  try {
    const response = await fetch(apiUrl + city + "&appid=" + apiKey);
    const data = await response.json();
    console.log();

    if (response.status === 404) {
      errorContainer.style.display = "block";
      weatherContainer.style.display = "none";
    } else {
      errorContainer.style.display = "none";

      // Update the weather icon and information
      if (data.weather[0].main.toLowerCase() === "clouds") {
        weatherIcon.src = "images/clouds.png";
      } else if (data.weather[0].main.toLowerCase() === "clear") {
        weatherIcon.src = "images/clear.png";
      } else if (data.weather[0].main.toLowerCase() === "drizzle") {
        weatherIcon.src = "images/drizzle.png";
      } else if (data.weather[0].main.toLowerCase() === "mist") {
        weatherIcon.src = "images/mist.png";
      } else if (data.weather[0].main.toLowerCase() === "rain") {
        weatherIcon.src = "images/rain.png";
      }

      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML =
        Math.round(data.main.temp) + "°c";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";

      weatherContainer.style.display = "block";
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    errorContainer.style.display = "block";
    errorContainer.innerHTML = "Something went wrong. Please try again.";
    weatherContainer.style.display = "none";
  } finally {
    spinner.style.display = "none"; // Hide spinner
  }
}

searchbtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
