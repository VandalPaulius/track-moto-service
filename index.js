global.__basedir = __dirname;

const initEnv = () => require('dotenv').config();

const initDb = () => {
  const mongodb = require('mongodb');
  const mongoose = require('mongoose');

  const session = require('express-session');
  const MongoStore = require('connect-mongo')(session);

  const mongoClient = mongodb.MongoClient;

  mongoose.connect(process.env.APPLICATION_MONGODB_URL);
  const db = mongoose.connection;

  let error;

  db.on('error', err => error = `Mongoose connection failed: ${err}`);
  db.once('open', () => console.log('MongoDb connected successfully'));

  if (error) {
    console.log(error);
    return false;
  }

  return new MongoStore({
    mongooseConnection: db
  })
}

const initHttpListener = (database) => {
  const express = require('express');
  const app = express();
  const subdomain = require('express-subdomain');
  const apiRouter = express.Router();
  const pageRouter = express.Router();
  const session = require('express-session');
  const bodyParser = require('body-parser');
  const routes = require('./routes');


  if (!database) {
    console.log('Cannot run without database');
    return;
  }
  //Use sessions for tracking logins
  app.use(session({
    secret: 'work hard',
    cookie: {maxAge: 600000},
    resave: true,
    saveUninitialized: false,
    store: database
  }));

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  routes.configurePages(pageRouter);
  routes.configureApi(apiRouter, database);

  app.use('/', pageRouter);
  /* in dev environment add url to hosts file */
  app.use(subdomain(`api.${process.env.APPLICATION_API_VERSION}`, apiRouter));

  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`));
}

try {
  initEnv();
  const db = initDb();
  initHttpListener(db);
} catch (err) {
  if (err) {
    console.log('API startup failed: ', err);
    process.exit(1);
  }
}
