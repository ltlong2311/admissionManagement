const newsRouter = require('./news');
const siteRouter = require('./site');
const meRouter = require('./me');

function route(app) {

  app.use('/news', newsRouter);
  app.use('/me', meRouter);
  app.use('/', siteRouter);

  // app.use('/search', (req, res) => {
  //     console.log(req.query.q);
  //     res.render('search');
  // });

  // app.post('/search', (req, res) => {
  //     console.log(req.query.q);
  //     res.render('search');
  // });

}

module.exports = route;
