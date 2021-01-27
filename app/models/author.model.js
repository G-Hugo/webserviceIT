const sql = require("./db.js");

// constructor
const Author = function(author) {
  this.name = author.name;
  this.age = author.age;
  this.alive = author.active;
};
Author.create = (newAuthor, result) => {
  sql.query("INSERT INTO author SET ?", newAuthor, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created author: ", { id: res.insertId, ...newAuthor });
    result(null, { id: res.insertId, ...newAuthor });
  });
};
Author.findById = (id, result) => {
  sql.query(`SELECT * FROM author WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found author: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found author with the id
    result({ kind: "not_found" }, null);
  });
};
Author.findAuthorIdBook = (id, result) => {
  sql.query(`SELECT * FROM book,author WHERE author.name = book.author AND author.id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found: ", res);
      result(null, res);
      return;
    }

    // not found author with the id
    result({ kind: "not_found" }, null);
  });
};
Author.getAll = result => {
  sql.query("SELECT * FROM author", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("author: ", res);
    result(null, res);
  });
};
Author.updateById = (id, author, result) => {
  sql.query(
    "UPDATE author SET name = ?, age = ?, active = ? WHERE id = ?",
    [author.name, author.age, author.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found author with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated author: ", { id: id, ...author });
      result(null, { id: id, ...author });
    }
  );
};
Author.remove = (id, result) => {
  sql.query("DELETE FROM author WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found author with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted author with id: ", id);
    result(null, res);
  });
};
Author.removeAll = result => {
  sql.query("DELETE FROM author", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} author`);
    result(null, res);
  });
};

module.exports = Author;