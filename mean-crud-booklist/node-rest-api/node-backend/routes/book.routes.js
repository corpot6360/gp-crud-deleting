const express = require('express');
const app = express();
 
const bookRoute = express.Router();
let Book = require('../model/Book');
 
// Get all Books
bookRoute.route('/').get((req, res) => {
    Book.find().then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      console.error(`Could not get books: ${error}`);
  })
})

// Add a book
bookRoute.route('/add-book').post((req, res) => {
  Book.create(req.body).then((book) => {
    console.log('Book added successfully.');
    res.status(201).json(book);
  })
  .catch((error) => {
    console.error(`Could not save book: ${error}`);
    res.status(500).json({ message: 'Could not save book.' });
  })
})

// Delete a book
bookRoute.route('/delete-book/:id').delete((req, res) => {
  console.log(`Preparing to delete: ${req.params.id}`);
  Book.findByIdAndDelete(req.params.id).then((deletedBook) => {
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    console.log('Book deleted successfully.');
    res.status(200).json({ message: 'Book deleted successfully.' });
  })
  .catch((error) => {
    console.error(`Could not delete book: ${error}`);
    res.status(500).json({ message: 'Could not delete book.' });
  })
})

module.exports = bookRoute;