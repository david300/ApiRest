var express     = require("express"),
    app         = express(),
    http        = require("http"),
    server      = http.createServer(app),
    mongoose    = require('mongoose');

app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.get('/', function(req, res) {
  res.send("Hello world!");
});

routes = require('./routes/tvshows')(app);
routes = require('./routes/chats')(app);
routes = require('./routes/users')(app);

//mongoose.connect('mongodb://localhost/tvshows', function(err, res) {
mongoose.connect('mongodb://dferreira:dferreira@ds027718.mongolab.com:27718/falta-uno', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  } else {
    console.log('Connected to Database');
  }
});

server.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});