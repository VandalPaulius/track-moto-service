var mongoose = require('mongoose');

var LocationSnapshotSchema = new mongoose.Schema({
  device_id:{
    type: String,
    required: true,
    trim: true
  },
  timestamp:{
    type: Number,
    required: true
  },
  latitude:{
    type: Number,
    required: true
  },
  longitude:{
    type: Number,
    required: true
  }
});

var LocationSnapshot = mongoose.model('Location_Snapshot', LocationSnapshotSchema);
module.exports = LocationSnapshot;