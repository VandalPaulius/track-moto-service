const login = (db, req, res, next) => {
  res.json({
    lucky: 'bastard',
    message: 'You\'ve called login'
  })
  res.sendStatus(200);
}

const logout = (db, req, res, next) => {
  res.json({
    lucky: 'bastard',
    message: 'You\'ve called logout'
  })
  res.sendStatus(200);
}

exports.configure = (router, db) => {
  router.route('/auth/login')
    .post((req, res, next) => login(db, req, res, next))

    router.route('/auth/logout')
    .post((req, res, next) => logout(db, req, res, next))
};
