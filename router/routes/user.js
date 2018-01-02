var User = require(`${__basedir}/models/user`);

const createUser = (db, req, res, next) => {
  var userData = {
    email: req.body.email,
    password: req.body.password
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

const deleteUser = (db, req, res, next) => {
  var userData = {
    email: req.body.email,
    password: req.body.password
  };

  User.delete(userData, (error, user) => {
    if (error) {
      res.status(400)
      res.write(`Unexpected error has occured: ${error}`)
      res.end();
    } else {
      //req.session.userId = user._id;
      res.status(200)
      res.write('User deleted successfully')
      res.end();
    }
  });
}

exports.configure = (router, db) => {
  router.route('/user')
    .post((req, res, next) => createUser(db, req, res, next))
    .delete((req, res, next) => deleteUser(db, req, res, next))
};
