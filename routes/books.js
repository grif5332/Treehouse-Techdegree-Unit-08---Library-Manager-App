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
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"); // CLI server reload ref point.
    Book.findById(req.params.id)
        .then(book =>{
            if(book) {
                res.render('update-book', { book: book, title: book.title });      
            } else {
                res.send(404);
            };
        })
        .catch(err => { res.send(500) });
});

// POST - Create a New Book
router.post('/', (req, res, next) => {
    Book.create(req.body).then(book => {
            res.redirect(`/books`);
    }).catch(err => {
        if(err.name === "SequelizeValidationError") {
            res.render('new-book', {
                book: Book.build(req.body),
                title: "New Book",
                errors: err.errors });
        } else {
            throw err;
        }
    }).catch(err => { res.send(500) });
});

// POST - Updates a Book, then redirects to the Book list
router.post('/:id', (req, res, next) => {
    Book.findById(req.params.id).then(book => {
            if(book) {
                return book.update(req.body)
            } else {
                res.send(404)
            };
        })
        .then(book => { res.redirect(`/books`) })
        .catch(function(err) {
            if(err.name === "SequelizeValidationError") {
                let book = Book.build(req.body);
                book.id = req.params.id;
                res.render('update-book', {
                    book: book,
                    title: "Edit Book",
                    errors: err.errors });
            } else {
                throw err;
            };
        }).catch(err => { res.send(500) });
});

// DELETE - Deletes a Book, then redirects to Book List
// WARNING!  This completely removes a book!  You have been warned!
router.post('/:id/delete', (req, res, next) => {
    Book.findById(req.params.id)
        .then(book => {
            if(book) {
                return book.destroy()
            } else {
                res.send(404)
            }
        })
        .then(book => { res.redirect(`/books`)})
        .catch(err => { res.send(500) });
});

module.exports = router;