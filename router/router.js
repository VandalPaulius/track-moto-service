exports.configurePages = (router) => {
  const pages = require('./routes/pages');
  pages.configure(router);
}

exports.configureApi = (router, database) => {
  const authorization = require('./routes/authorization');
  authorization.configure(router, database);

  const user = require('./routes/user');
  user.configure(router, database);
}
