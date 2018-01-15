var User = require(`${__basedir}/models/user`);

const login = (db, req, res, next) => {
  User.authenticate(req.body.email, req.body.password, (error, user) => {
    if (error) {
      res.status(400)
      res.write(`Unexpected error has occured: ${error}`)
      res.end();
    } else if (!user) {
      res.status(404)
      res.write('User not found')
      res.end();
    } else {
      req.session.userId = user._id;

      res.status(200)
      res.json({
        userUid: user._id
      })
      res.end();
    }
  });
}

const logout = (db, req, res, next) => {
  if (req.session) {
    // delete session object
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
}

exports.configure = (router, db) => {
  router.route('/auth/login')
    .post((req, res, next) => login(db, req, res, next))

    router.route('/auth/logout')
    .post((req, res, next) => logout(db, req, res, next))
};
