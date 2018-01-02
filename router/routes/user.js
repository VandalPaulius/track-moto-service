var User = require(`${__basedir}/models/user`);

const create = (db, req, res, next) => {
  var userData = {
    email: req.body.email,
    password: req.body.password,
    username: req.body.username
  };

  User.create(userData, (error, user) => {
    if (error) {
      res.status(400)
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
