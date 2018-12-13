const express = require('express');
const app = express();
let Book = require('./models').Book;

app.use('/static', express.static('public'));

app.set('view engine', 'pug');

const mainRoutes = require('./routes/index');
const booksRoutes = require('./routes/books');

// re-route
app.use('/', mainRoutes);
app.use('/books', booksRoutes);

// Error middleware
// catches 404 error
app.use(function(req, res, next) {
    const err = new Error('Aww shucks! Page Not Found');
    err.status = 404;
    next(err);
});
// catches 500 error
app.use(function(req, res, next) {
  var err = new Error('Error');
  err.status = 500;
  next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    if (err.status === 404) {
        res.render('page-not-found');
    } else {
        res.render('error');
    }
});

// Listen on PORT: 8000
app.listen(8000, () => {
    console.log('The application is running on localhost:8000')
});
