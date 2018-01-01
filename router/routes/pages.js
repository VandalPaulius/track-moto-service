const fs = require('fs');
var path = require('path');

const mainPage = (req, res, next) => {
  fs.readFile(`${__basedir}/html/index.html`, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.write('Error while serving page: ', err);
      res.end();
      return;
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  })
}

exports.configure = (router) => {
  router.route('/')
    .get((req, res, next) => mainPage(req, res, next))
};
