const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=64ec927123131e5e180e536071884dee&query=" +
    latitude +
    "," +
    longitude +
    "&units=m";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect", undefined);
    } else if (body.error) {
      callback("Unable to load try different search", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions +
          ". It is currently " +
          body.current.temperature +
          " degree out. It feels like " +
          body.current.feelslike +
          " degree out"
      );
    }
  });
};

module.exports = forecast;
