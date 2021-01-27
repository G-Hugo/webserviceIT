module.exports = app => {
    const book = require("../controllers/book.controller.js");
  
    // Create a new Book
    app.post("/book", book.create);
  
    // Retrieve all books
    app.get("/book", book.findAll);

     // Retrieve Book with autor
    app.get("/book/autor/:autor", book.findAllByAutor);

    // Retrieve Book with datePublication
    app.get("/book/date/:year", book.findAllByYear);
  
    // Retrieve a single Book with id
    app.get("/book/:id", book.findOne);
   
    // Update a Book with id
    app.put("/book/:id", book.update);
  
    // Delete a Book with id
    app.delete("/book/:id", book.delete);
  
    // Create a new Book
    app.delete("/book", book.deleteAll);
  };