const request = require("request");
const forcast = (longitude, latitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=4d18eb422ec874b3f0746187b510ad8d&query=${longitude},${latitude}`;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("enable to connect to weather service", undefined);
    } else if (response.body.error) {
      callback("unable to find Location", undefined);
    } else {
      callback(
        undefined,
        `${response.body.current.weather_icons[0]}`,
        `${response.body.current.weather_descriptions} and It is currently ${response.body.current.temperature} degree out there`
      );
    }
  });
};
module.exports = forcast;
