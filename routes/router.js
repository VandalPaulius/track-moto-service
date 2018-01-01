exports.configurePages = (router) => {
  const pages = require('./pages');
  pages.configure(router);
}

exports.configureApi = (router, database) => {
  const authorization = require('./authorization');
  authorization.configure(router, database);

  const user = require('./user');
  user.configure(router, database);
}
