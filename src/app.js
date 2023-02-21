const path = require("path");
const express = require("express");
const hbs = require("hbs");
require("dotenv").config();

const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

const app = express();
const port = process.env.PORT || 3000;

// Handlebars engine and view location
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));
// Setup static directory to serve
app.use(express.static(path.join(__dirname, "../public")));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    pageDescription: "Welcome the rice field, MTFK",
    creator: "Nhat Minh",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    pageDescription: "What is this about?",
    creator: "Nhat Minh",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    pageDescription: "Help Page, don't expect any help though!",
    creator: "Nhat Minh",
  });
});

app.get("/weather", (req, res) => {
  geocode(req.query.address, (err, { longitude, latitude, location } = {}) => {
    if (!req.query.address) {
      return res.send({
        error: "No location provided",
      });
    }

    forecast(latitude, longitude, (err, weatherData) => {
      if (err) {
        return res.send({
          error: err,
        });
      }

      res.send({
        forecast: `Current location is ${weatherData.location.name}, the weather is ${weatherData.current.weather_descriptions[0]}, current temperature is ${weatherData.current.temperature} degree Celcius, there is a ${weatherData.current.precip}% chance of raining.`,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    pageDescription: "Help article not found",
    creator: "Nhat Minh",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    pageDescription: "Page not found",
    creator: "Nhat Minh",
  });
});

app.listen(port, () => {
  console.log(`Listening to port ${port}!`);
});
