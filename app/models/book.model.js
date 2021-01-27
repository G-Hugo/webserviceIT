const sql = require("./db.js");

// constructor
const Book = function(book) {
  this.nom = book.nom;
  this.auteur = book.auteur;
  this.datePublication = book.datePublication;
};
 Book.create = (newBook, result) => {
  sql.query("INSERT INTO book SET ?", newBook, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created book: ", { id: res.insertId, ...newBook });
    result(null, { id: res.insertId, ...newBook });
  });
};
 Book.findById = (id, result) => {
  sql.query(`SELECT * FROM book WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found book: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Book with the id
    result({ kind: "not_found" }, null);
  });
};
 Book.getAll = result => {
  sql.query("SELECT * FROM book", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("book: ", res);
    result(null, res);
  });
};
 Book.updateById = (id, book, result) => {
  sql.query(
    "UPDATE book SET nom = ?, auteur = ?, datePublication = ? WHERE id = ?",
    [book.nom, book.auteur, book.datePublication, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Book with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated book: ", { id: id, ...book });
      result(null, { id: id, ...book });
    }
  );
};
 Book.remove = (id, result) => {
  sql.query("DELETE FROM book WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Book with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted book with id: ", id);
    result(null, res);
  });
};
 Book.removeAll = result => {
  sql.query("DELETE FROM book", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} book`);
    result(null, res);
  });
};

module.exports = Book;