const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db_collection = 'tracking_data';
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var mongo_url = 'mongodb://localhost:27017/test';

var createUser = function(db, email, password, username, callback){
  db.collection('users').insertOne({
    "email": email,
    "password": password,
    "username": username
  }, function(err, result){
    assert.equal(err, null);
    console.log("Created user");
    callback();
  });
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

var insertStatusData = function(db, device_id, timestamp, device_state, battery_level, callback){
  db.collection(db_collection).insertOne({
    "device_id": device_id,
    "timestamp": timestamp,
    "device_state": device_state,
    "battery_level": battery_level   
  }, function(err, result){
    assert.equal(err, null);
    console.log("Inserted status data");
    callback();
  });
}

var insertTrackingData = function(db, device_id, timestamp, latitude, longitude, callback) {
  db.collection(db_collection).insertOne({
    "device_id": device_id,
    "timestamp": timestamp,
    "latitude": latitude,
    "longitude": longitude
  }, function(err, result) {
   assert.equal(err, null);
   console.log("Inserted tracking data");
   callback();
 });
};

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Here goes website'));

app.post('/api/user', (req, res) =>{ //Create user
  console.log("Creating user ", JSON.stringify(req.body.username));
  res.status(200).send('OK');

  MongoClient.connect(mongo_url, function(err, db){
    assert.equal(null, err);
    createUser(db, req.body.email, req.body.password, req.body.username, 
    function() {
      db.close();
    });
  });  
}); 

app.post('/api/user/login')
app.post('/api/:uid/trackers') //create trackers
app.get('/api/:uid/trackers') //get trackers

app.post('/api/:uid/trackers/:tracker_uid/location', (req, res) => {
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

app.get('/api/:uid/trackers/:tracker_uid/location')

app.listen(3000, () => console.log('Example app listening on port 3000!'));

