var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var trackerSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    devices: [{
        name: String,
        telephone: String,
        status_log: [{status: String, timestamp: Number}],
        track_data:[{
            battery: Number,
            timestamp: Number,
            latitude: Number,
            longitude: Number
        }]
    }]
});

var tracker = mongoose.model('Tracker', trackerSchema);

/*var Paulius = new tracker(
    {
        name: "Danius",
        email: "aki.maxis@gmail.com",
        password: "test",
        devices: [{
            name: "Suzuki",
            telephone: "+44",
            status_log: [{status: "tracking", timestamp: 1510264031}],
            track_data:[{
                battery: 100,
                timestamp: 1510264031,  
                latitude: 53.4807593,
                longitude: -2.2426305
            }]
        }]
    }
);

Paulius.save();*/

tracker.findOneAndUpdate({email: "aki.maxis@gmail.com"}, {$push: {friends: friend}});