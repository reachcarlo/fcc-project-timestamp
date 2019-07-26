// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/timestamp/", function(req, res) {
  let date_string = new Date();
  res.json({ unix: date_string.getTime(), utc: date_string.toUTCString() });
});

app.get("/api/timestamp/:date_string", function(req, res) {
  if (
    new Date(req.params.date_string * 1000) != undefined &&
    !isNaN(new Date(req.params.date_string * 1000).getTime())
  ) {
    let date_string = new Date(req.params.date_string * 1000);
    res.json({ unix: date_string.getTime(), utc: date_string.toUTCString() });
  } else if (new Date(req.params.date_string) != undefined) {
    let date_string = new Date(req.params.date_string);
    res.json({ unix: date_string.getTime(), utc: date_string.toUTCString() });
  } else {
    res.json({ unix: null, utc: "Invalid Date" });
  }
});

// your first API endpoint...
app.get("/api/hello", function(req, res) {
  res.json({ greeting: "hello API" });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
