exports.configure = (router, database) => {
  const authorization = require('./authorization');
  authorization.configure(router, database);
}
