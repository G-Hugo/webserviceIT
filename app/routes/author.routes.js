module.exports = app => {
    const author = require("../controllers/author.controller.js");
  
    // Create a new author
    app.post("/author", author.create);
  
    // Retrieve all autors
    app.get("/author", author.findAll);
  
    // Retrieve a single author with id
    app.get("/author/:id", author.findOne);

    // Retrieve book author with id
    app.get("/author/:id/book", author.findBookByAutorId);
  
    // Update author with id
    app.put("/author/:id", author.update);
  
    // Delete author with id
    app.delete("/author/:id", author.delete);
  
    // Create a new author
    app.delete("/author", author.deleteAll);
  };