exports.configure = (router, database) => {
  // app.use(`/api/${process.env.APPLICATION_API_VERSION}`, router);

  const authorization = require('./authorization');
  authorization.configure(router, database);
}
