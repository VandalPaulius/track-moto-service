var mongoose = require('mongoose');

var StatusSnapshotSchema = new mongoose.Schema({
  device_id:{
    type: String,
    required: true,
    trim: true
  },
  timestamp:{
    type: Number,
    required: true
  },
  device_state:{
    type: String,
    trim: true
  },
  battery_level:{
    type: Number,
    min: 1,
    max: 100
  }
});

var StatusSnapshot = mongoose.model('Status_Snapshot', StatusSnapshotSchema);
module.exports = StatusSnapshot;