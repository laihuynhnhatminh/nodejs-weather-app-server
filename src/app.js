const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

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
  res.send({
    temperature: 24,
    weather_descriptions: ["Partly cloudy"],
    wind_speed: 17,
    wind_degree: 360,
    wind_dir: "N",
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

app.listen(3000, () => {
  console.log("Listening to port 3000!");
});
