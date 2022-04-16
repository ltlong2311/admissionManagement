const newsRouter = require('./news');
const postRouter = require('./post');
const siteRouter = require('./site');
const meRouter = require('./me');
const apiRouter = require('./api/site');
const newsApiRouter = require('./api/news');
const postApiRouter = require('./api/post');

function route(app) {
  //app
  app.use('/news', newsRouter);
  app.use('/post', postRouter);
  app.use('/me', meRouter);
  app.use('/', siteRouter);
  //api
  // app.use('/api', newsApiRouter);
  // app.use('/api', postApiRouter);
  app.use('/api', apiRouter)
  // app.post('/search', (req, res) => {
  //     console.log(req.query.q);
  //     res.render('search');
  // });

} 

module.exports = route;
