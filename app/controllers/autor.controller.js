const Autor = require("../models/autor.model.js");

// Create and Save a new Autor
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Autor
  const autor = new Autor({
    name: req.body.name,
    age: req.body.age,
    active: req.body.active
  });

  // Save Autor in the database
  Autor.create(autor, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Autor."
      });
    else res.send(data);
  });
};

// Retrieve all Autors from the database.
exports.findAll = (req, res) => {
    Autor.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving autors."
          });
        else res.send(data);
      });
};

// Find book from autor id
exports.findBookByAutorId = (req, res) => {
  Autor.findAutorIdBook(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Autor with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Autor with id " + req.params.id
          });
        }
      } else res.send(data);
    });
};

// Find a single Autor with a id
exports.findOne = (req, res) => {
    Autor.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Autor with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Autor with id " + req.params.id
            });
          }
        } else res.send(data);
      });
};

// Update a Autor identified by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      Autor.updateById(
        req.params.id,
        new Autor(req.body),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Autor with id ${req.params.id}.`
              });
            } else {
              res.status(500).send({
                message: "Error updating Autor with id " + req.params.id
              });
            }
          } else res.send(data);
        }
      );
};

// Delete a Autor with the specified id in the request
exports.delete = (req, res) => {
    Autor.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Autor with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Autor with id " + req.params.id
            });
          }
        } else res.send({ message: `Autor was deleted successfully!` });
      });
};

// Delete all Autors from the database.
exports.deleteAll = (req, res) => {
    Autor.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all autors."
          });
        else res.send({ message: `All Autors were deleted successfully!` });
      });
};