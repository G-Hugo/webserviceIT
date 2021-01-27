const Author = require("../models/author.model.js");

// Create and Save a new Author
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Author
  const author = new Author({
    name: req.body.name,
    age: req.body.age,
    active: req.body.active
  });

  // Save Author in the database
  Author.create(author, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Author."
      });
    else res.send(data);
  });
};

// Retrieve all Authors from the database.
exports.findAll = (req, res) => {
    Author.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving authors."
          });
        else res.send(data);
      });
};

// Find book from author id
exports.findBookByAuthorId = (req, res) => {
  Author.findAuthorIdBook(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Author with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Author with id " + req.params.id
          });
        }
      } else res.send(data);
    });
};

// Find a single Author with a id
exports.findOne = (req, res) => {
    Author.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Author with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Author with id " + req.params.id
            });
          }
        } else res.send(data);
      });
};

// Update a Author identified by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      Author.updateById(
        req.params.id,
        new Author(req.body),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Author with id ${req.params.id}.`
              });
            } else {
              res.status(500).send({
                message: "Error updating Author with id " + req.params.id
              });
            }
          } else res.send(data);
        }
      );
};

// Delete a Author with the specified id in the request
exports.delete = (req, res) => {
    Author.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Author with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Author with id " + req.params.id
            });
          }
        } else res.send({ message: `Author was deleted successfully!` });
      });
};

// Delete all Authors from the database.
exports.deleteAll = (req, res) => {
    Author.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all authors."
          });
        else res.send({ message: `All Authors were deleted successfully!` });
      });
};