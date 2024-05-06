// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/", (req, res) => {
  unix = Date.now();
  utc = new Date(Number(unix)).toUTCString();
  
  res.json({
    unix: Number(unix),
    utc: utc
  });
})

app.get("/api/:date", (req, res) => {
  let datePattern = /^\d{4}-\d{2}-\d{2}$/;

  // if date is unix
  if (req.params.date >= 0){
    unix = req.params.date;
    utc = new Date(Number(unix)).toUTCString();
  } 
  else if (datePattern.test(req.params.date)) {
    date = req.params.date.split("-");
    unix = new Date( date[0], date[1] -1, date[2] ).getTime();
    utc = new Date(Number(unix)).toUTCString();
  } 
  else if (new Date(req.params.date) != "Invalid Date"){
    unix = new Date(req.params.date).getTime();
    utc = new Date(Number(unix)).toUTCString();
  } 
  else {
    res.json({
      error: "Invalid Date",
    });
  }
  
  res.json({
    unix: Number(unix),
    utc: utc
  });
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
