const express = require('express');
const router = express.Router();
const Book = require('../models').Book;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Home/Root Route (GET)
// Home route should redirect to the /books route.
router.get('/', (req, res, next) => {
    res.redirect('/books');
});

router.get('/books/new', (req, res, next) => {
    res.render('new-book', { book: Book.build() });
});


// search
router.get('/books/search', (req, res) => {
    let { q } = req.query;
    Book.findAll({
        where: {
            [Op.or]: {
                title: { [Op.like]: `%${q}%` },
                author: { [Op.like]: `%${q}%` },
                genre: { [Op.like]: `%${q}%` },
                year: { [Op.like]: `%${q}%` }
            }
        }   
    }).then(books => {
        if(books.length >=1) {
            // PAGINATION START
            const booksPerPage = 10;
            let numberOfPages = Math.ceil(books.length / booksPerPage);
            let currentPage = 0;
            let booksArray = [];

            console.log(`Number Of Books: ${books.length}`);
            console.log(`Number of Pages ${numberOfPages}`);
            // books.length equals number of books in db
            while(books.length > 0) {
                booksArray.push(books.splice(0, booksPerPage))
            };

            console.log(`Number of Book Arrays: ${booksArray.length}`);
            
            //PAGINATION END

            res.render('book-list', {
                // books: books
                books: booksArray[currentPage],
                pages:  numberOfPages
            })
        } else {
            res.render('no-search-results')           
        }
    }).catch(err => { res.send(500) });
});

module.exports = router;