const path = require("path"); //path module is core node module we doesnot have to install it
const express = require("express");
const hbs = require("hbs");
const app = express();
const geocode = require("./API's/geocode");
const forcast = require("./API's/forcast");

//define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//set handelbars engine module
app.set("view engine", "hbs");
//set templates as new folder name for hbs
app.set("views", viewPath);

hbs.registerPartials(partialsPath); //also make nodemon to restart partials using nodemon src/app.js -r js,hb,any other extension

//set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Badal Jha",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Badal Jha",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Badal Jha",
  });
});

//app.get(partialUrl,function) partial url is nothing for app.js /help for app.js/help and /about for app.js/about
//now we can remove it as at home index.html present
// app.get("", (req, res) => {
//   res.send("<h1>Weather</h1>"); //send something back to user
// });

//render about.html

//render help page

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You have to provide address first!",
    });
  }
  geocode(req.query.address, (error, data) => {
    if (error) {
      return res.send({
        error: error,
      });
    }
    //console.log(data);
    forcast(data.longitude, data.latitude, (error, image, forcastData) => {
      if (error) {
        return res.send({
          error,
        });
      }
      console.log(image);
      res.send({
        forcast: forcastData,
        location: data.location,
        image: image,
        address: req.query.address,
      });
    });
  });
});
// res.send({
//   forcast: "It is raining",
//   location: "INDIA",
//   address: req.query.address,
// });
//});
//setting Error:404
//Note; It must be at last
app.get("*", (req, res) => {
  res.render("404", {
    title: "Error 404",
    name: "Badal Jha",
    errorMassege: "Page is not found",
  });
});
//routes
//app.com

//app.com/help
//app.com/about

//run the server
//port 3000
app.listen(3000, () => {
  console.log("server is up on port 3000");
});
