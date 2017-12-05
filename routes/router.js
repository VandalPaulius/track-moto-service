var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Tracker = require('../models/tracker');

function requiresLogin(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  } else {
    var err = new Error('You must be logged in to view this page.');
    err.status = 401;
    return next(err);
  }
}

// GET route after registering
router.get('/', requiresLogin, (req, res, next) => {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
        }
      }
    });
});

//Create user
router.post('/api/user', (req, res) =>{ 
  console.log("Creating user ", JSON.stringify(req.body.username));
  res.status(200).send('OK');

  var userData = {
    email: req.body.email,
    password: req.body.password,
    username: req.body.username
  }

  User.create(userData, function(error, user){
    if(error){

    } else{
      req.session.userId = user._id;
      return res.redirect('/');
    }
  });  
}); 

router.post('/api/user/login', (req, res) =>{ 
  User.authenticate(req.body.email, req.body.password, function (error, user) {
    if (error || !user) {
      var err = new Error('Wrong email or password.');
      err.status = 401;
      return next(err);
    } else {
      req.session.userId = user._id;
      return res.redirect('/');
    }
  });
});

//GET for logout
router.get('/api/user/logout', (req, res, next) => {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

//Create tracker
router.post('/api/:uid/trackers', (req, res) => {
  var trackerData = {
    user_id: req.params.uid,
    phone_number: req.body.phone_number,
    device_name: req.body.device_name
  }
  
  Tracker.create(trackerData, function(error){
    if(error){

    } else{

    }
  });
});

router.get('/api/:uid/trackers') //get trackers

router.post('/api/:uid/trackers/:tracker_uid/location', (req, res) => {
    console.log("device_id", JSON.stringify(req.body.device_id));
    res.status(200).send('OK');

  MongoClient.connect(mongo_url, function(err, db) {
    assert.equal(null, err);
    insertTrackingData(db, req.body.device_id, req.body.timestamp, 
      req.body.latitude, req.body.longitude, 
      function() {
        db.close();
    });
  });
});

router.get('/api/:uid/trackers/:tracker_uid/location')

module.exports = router;

//Check if specified email exists
/*router.get('/api/user/checkEmail/:email', (req, res) => {
  MongoClient.connect(mongo_url, function (err, db) {
    db.collection('users').find({email: email}, {email: 0, password: 0, username: 0}).limit(1);
    db.close();
  });
  checkUserEmail(req.params.email);
});*/