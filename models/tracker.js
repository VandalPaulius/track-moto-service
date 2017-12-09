var mongoose = require('mongoose');

var TrackerSchema = new mongoose.Schema({
  user_id: {
    type: String,
    unique: false,
    required: true,
    trim: true
  },
  phone_number:{
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  device_name:{
    type: String,
    unique: true,
    required: true,
    trim: true
  }
});

var Tracker = mongoose.model('Tracker', TrackerSchema);
module.exports = Tracker;

function createDevice(data) {
  var tracker = new Tracker(data);
  tracker.save(function (err) {
      if (err) return handleError(err);
      // saved!
  })
}