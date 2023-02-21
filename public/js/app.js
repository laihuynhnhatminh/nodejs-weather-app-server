const locationMessage = document.querySelector("#locationMessage");
const resultMessage = document.querySelector("#forecastMessage");
document.querySelector(".locationSearch").addEventListener("submit", (e) => {
  e.preventDefault();

  const location = document.querySelector(".locationInput").value;
  locationMessage.textContent = "";
  resultMessage.textContent = "Loading...";

  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          locationMessage.textContent = data.error;
          resultMessage.textContent = "";
        } else {
          locationMessage.textContent = data.location;
          resultMessage.textContent = data.forecast;
        }
      });
    }
  );
});
