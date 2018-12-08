const express = require('express');
const router = express.Router();
const Book = require('../models').Book;
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: false}));

// Books Route (GET)
// Shows the full list of books.
router.get('/', (req, res, next) => {
    Book.findAll( { order: [['title','ASC']] } )
        .then(books => {
            res.render('book-list', {books: books})
        })
        .catch(err => { res.send(500) });
});


// books/:id Route (GET)
// Shows book detail form.
router.get('/:id', (req, res, next) => {
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    Book.findByPk(req.params.id)
    .then(function(book){
        if(book) {
          res.render("book-details", {book: book, title: book.title});      
        } else {
          res.send(404);
        }
      }).catch(function(error){
          res.send(500, error);
       });
});

// POST
router.post('/', (req, res, next) => {
    Book.create(req.body).then(book => {
        console.log(req.body);
        res.redirect('/books');
    }).catch(err => {
        if(err.name === 'SquelizeValidationError') {
            res.render('new-book', {
                book: Book.build(reg.body),
                errors: err.errors
            });
        } else {
            throw err;
        };
    }).catch(err => {
        res.sendStatus(500);
    });
});

module.exports = router;