const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// define path
const pubDirPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// console.log(__dirname);
// changing directory path
// console.log(path.join(__dirname, "../public/index.html"));

//setup handlebar engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);

//setup static directory
app.use(express.static(pubDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Aditya singh",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Aditya singh",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "Contact for help ",
    name: "Aditya singh",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "provide a address",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          address: req.query.address,
          forecast: forecastData,
          location: location,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "provide a search",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404",
    name: "Aditya Singh",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    name: "Aditya Singh",
    errorMessage: "page not found",
  });
});

app.listen(port, () => {
  console.log("Server is up on port" + port);
});
