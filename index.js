const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/test';
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  db.close();
});

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Here goes website'));
app.post('/api/user/location', (req, res) => {
    console.log("requestbody", req.body);
    res.status(200).send('OK');
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));