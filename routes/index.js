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

// // POST
// router.post('/', (req, res, next) => {
//     Book.create(req.body).then(book => {
//         res.redirect('/books');
//     }).catch(err => {
//         if(err.name === 'SquelizeValidationError') {
//             res.render('new-book', {
//                 book: Book.build(reg.body),
//                 errors: err.errors
//             });
//         } else {
//             throw err;
//         };
//     }).catch(err => {
//         res.sendStatus(500);
//     });
// });


module.exports = router;