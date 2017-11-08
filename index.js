const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/test';

var insertTrackingData = function(db, device_id, timestamp, latitude, longitude, callback) {
  db.collection('tracking_data').insertOne({
    "device_id": device_id,
    "timestamp": timestamp,
    "latitude": latitude,
    "longitude": longitude
  }, function(err, result) {
   assert.equal(err, null);
   console.log("Inserted a document into the tracking_data collection.");
   callback();
 });
};

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Here goes website'));
app.post('/api/user/location', (req, res) => {
    console.log("requestbody", JSON.stringify(req.body.device_id));
    res.status(200).send('OK');

    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      insertTrackingData(db, req.body.device_id, req.body.timestamp, 
        req.body.latitude, req.body.longitude, function() {
          db.close();
      });
    });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));

