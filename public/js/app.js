const locationMessage = document.querySelector("#locationMessage");
const resultMessage = document.querySelector("#temperatureMessage");
const weatherMessage = document.querySelector("#weatherMessage");
const weatherImage = document.querySelector(".weather-icon");
document.querySelector(".locationSearch").addEventListener("submit", (e) => {
  e.preventDefault();

  const location = document.querySelector(".locationInput").value;
  locationMessage.textContent = "";
  resultMessage.textContent = "Loading...";
  weatherMessage.textContent = "";
  weatherImage.setAttribute("src", "");

  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        locationMessage.textContent = data.error;
        resultMessage.textContent = "";
        weatherMessage.textContent = "";
        weatherImage.setAttribute("src", "");
      } else {
        locationMessage.textContent = data.location;
        resultMessage.textContent = data.forecast;
        weatherMessage.textContent = `The weather is ${data.weatherDescription.description}`;
        weatherImage.setAttribute("src", data.weatherDescription.icon);
      }
    });
  });
});
