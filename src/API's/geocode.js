const request = require("request");
const geocode = function (address, callback) {
  const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYmFkYWxqaGEiLCJhIjoiY2tuN2ZmeDEyMDdvbjJ3cW5uNWJsbnNkdiJ9.3vkCF-AQz6NcScIj5fc7vQ`;
  request({ url: geocodeURL, json: true }, (err, response) => {
    if (err) callback("something went wrong please try again!", undefined);
    else if (response.body.features.length == 0) {
      callback("Location Not found try another Location", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[0],
        longitude: response.body.features[0].center[1],
        location: response.body.features[0].place_name,
      });
    }
  });
};
module.exports = geocode;
