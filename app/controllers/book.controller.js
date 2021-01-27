const Book = require("../models/book.model.js");

// Create and Save a new Book
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Book
  const book = new Book({
    name: req.body.name,
    author: req.body.author,
    year: req.body.year
  });

  // Save Book in the database
  Book.create(book, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Book."
      });
    else res.send(data);
  });
};

// Retrieve all Books from the database.
exports.findAll = (req, res) => {
    Book.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving books."
          });
        else res.send(data);
      });
};

// Find Book with the author
exports.findAllByAuthor = (req, res) => {
  Book.findByAuthor(req.params.author, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Book with author ${req.params.author}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Book with author " + req.params.author
          });
        }
      } else res.send(data);
    });
};

// Find Book with a year
exports.findAllByYear = (req, res) => {
  Book.findByYear(req.params.year, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Book with year ${req.params.year}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Book with year " + req.params.year
          });
        }
      } else res.send(data);
    });
};

// Find a single Book with a id
exports.findOne = (req, res) => {
    Book.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Book with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Book with id " + req.params.id
            });
          }
        } else res.send(data);
      });
};

// Update a Book identified by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      Book.updateById(
        req.params.id,
        new Book(req.body),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Book with id ${req.params.id}.`
              });
            } else {
              res.status(500).send({
                message: "Error updating Book with id " + req.params.id
              });
            }
          } else res.send(data);
        }
      );
};

// Delete a Book with the specified id in the request
exports.delete = (req, res) => {
    Book.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Book with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Book with id " + req.params.id
            });
          }
        } else res.send({ message: `Book was deleted successfully!` });
      });
};

// Delete all Books from the database.
exports.deleteAll = (req, res) => {
    Book.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all books."
          });
        else res.send({ message: `All Books were deleted successfully!` });
      });
};