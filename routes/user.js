var validator = require('validator');
var User = require(`${__basedir}/models/user`);

const create = (db, req, res, next) => {
  // if (!validator.isEmail(req.body.email)) {
  //   var err = new Error('Wrong email');
  //   err.status = 400;
  //   return next(err);
  // }

  var userData = {
    email: req.body.email,
    password: req.body.password,
    username: req.body.username
  };

  console.log('req', req);

  User.create(userData, (error, user) => {
    if (error) {
      res.status(401)
      res.write(`Unexpected error has occured: ${error}`)
      res.end();
    } else {
      req.session.userId = user._id;
      res.status(200).end();
    }
  });
}

exports.configure = (router, db) => {
  router.route('/user')
    .post((req, res, next) => create(db, req, res, next))
};
