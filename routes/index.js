const express = require('express');
const router = express.Router();
const Book = require('../models').Book;

// Home/Root Route (GET)
// Home route should redirect to the /books route.
router.get('/', (req, res, next) => {
    res.redirect('/books');
});

router.get('/books/new', (req, res, next) => {
    res.render('new-book', { book: Book.build() });
});


module.exports = router;