module.exports = app => {
    const autor = require("../controllers/autor.controller.js");
  
    // Create a new autor
    app.post("/autor", autor.create);
  
    // Retrieve all autors
    app.get("/autor", autor.findAll);
  
    // Retrieve a single autor with id
    app.get("/autor/:id", autor.findOne);

    // Retrieve book autor with id
    app.get("/autor/:id/book", autor.findBookByAutorId);
  
    // Update autor with id
    app.put("/autor/:id", autor.update);
  
    // Delete autor with id
    app.delete("/autor/:id", autor.delete);
  
    // Create a new autor
    app.delete("/autor", autor.deleteAll);
  };