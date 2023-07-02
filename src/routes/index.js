const authorRouter = require('./author');
const bookRouter = require('./book');

function router(app) {
  app.use('/v1/author', authorRouter);
  app.use('/v1/book', bookRouter);
}

module.exports = router;