var mongoose = require('mongoose');

var DeviceSchema = new mongoose.Schema({
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

var Device = mongoose.model('Device', DeviceSchema);
//module.exports = device;

function createDevice(data) {
  var device = new Device(data);
  device.save(function (err) {
      if (err) return handleError(err);
      // saved!
  })
}