const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db_collection = 'tracking_data';
var path = require('path');

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var mongo_url = 'mongodb://localhost:27017/test';

var routes = require('./routes/router');

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

//Connect to MongoDB
mongoose.connect(mongo_url);
var db = mongoose.connection;

//Handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
});

//Use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  cookie: {maxAge: 600000},
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

//Parse incoming requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Include routes

app.use('/', routes);

/*var checkUserEmail = function(email, callback){
  var test;
  MongoClient.connect(mongo_url, function (err, db) {
    test = db.collection('users').find({email: email}, {email: 0, password: 0, username: 0}).limit(1);
    db.close();
  });
  return test;
}

var createDevice = function(db, user_id, phone_number, device_name){
  db.collection(db_collection).insertOne({
    "user_id": user_id,
    "phone_number": phone_number,
    "device_name": device_name  
  }, function(err, result){
    assert.equal(err, null);
    console.log("Created device");
    callback();
  });
}

*/

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  if(err.status == 401){
    res.sendFile(path.join(__dirname + '/views', 'login.html'));
  } else{
    res.send(err.message);
  }
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));

