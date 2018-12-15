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
            
            res.render('book-list', {
                books: books,
                home: true
            })
        } else {
            res.render('no-search-results')           
        }
    }).catch(err => { res.send(500) });
});


module.exports = router;