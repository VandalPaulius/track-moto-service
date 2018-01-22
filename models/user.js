var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password:{
    type: String,
    required: true
  }
});

// //Authenticate input against database
// UserSchema.statics.authenticate = function (email, password, callback) {
//   User.findOne({ email })
//     .exec(function (err, user) {
//       if (err) {
//         return callback(err)
//       } else if (!user) {
//         var err = new Error('User not found.');
//         err.status = 401;
//         return callback(err);
//       }
//       bcrypt.compare(password, user.password, function (err, result) {
//         if (result === true) {
//           return callback(null, user);
//         } else {
//           return callback();
//         }
//       })
//     });
// }

// Hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      
      user.password = hash;
      next(null, user);
    })
  })
 
});

module.exports = mongoose.model('User', UserSchema);
