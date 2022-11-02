// const { process_params } = require("express/lib/router");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());
app.use(express.static("public"));

function simpleStringify(object) {
  var simpleObject = {};
  for (var prop in object) {
    if (!object.hasOwnProperty(prop)) {
      continue;
    }
    if (typeof object[prop] == "object") {
      continue;
    }
    if (typeof object[prop] == "function") {
      continue;
    }
    simpleObject[prop] = object[prop];
  }
  return simpleObject; // returns cleaned up JSON
}

app.post("/weather-app", (req, res) => {
  console.log(req.body.city);
  const url = `http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${req.body.city}`;
  axios({
    url: url,
    responseType: "json",
  }).then((response) => res.json({ data: response.data }));
});

app.listen(5000, () => {
  console.log("Server Started");
});
