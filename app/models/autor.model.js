const sql = require("./db.js");

// constructor
const Autor = function(autor) {
  this.name = autor.name;
  this.age = autor.age;
  this.alive = autor.active;
};
Autor.create = (newAutor, result) => {
  sql.query("INSERT INTO autor SET ?", newAutor, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created autor: ", { id: res.insertId, ...newAutor });
    result(null, { id: res.insertId, ...newAutor });
  });
};
Autor.findById = (id, result) => {
  sql.query(`SELECT * FROM autor WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found autor: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found autor with the id
    result({ kind: "not_found" }, null);
  });
};
Autor.findAutorIdBook = (id, result) => {
  sql.query(`SELECT * FROM book,autor WHERE autor.name = book.autor AND autor.id = ${id}`, (err, res) => {
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

    // not found autor with the id
    result({ kind: "not_found" }, null);
  });
};
Autor.getAll = result => {
  sql.query("SELECT * FROM autor", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("autor: ", res);
    result(null, res);
  });
};
Autor.updateById = (id, autor, result) => {
  sql.query(
    "UPDATE autor SET name = ?, age = ?, active = ? WHERE id = ?",
    [autor.name, autor.age, autor.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found autor with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated autor: ", { id: id, ...autor });
      result(null, { id: id, ...autor });
    }
  );
};
Autor.remove = (id, result) => {
  sql.query("DELETE FROM autor WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found autor with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted autor with id: ", id);
    result(null, res);
  });
};
Autor.removeAll = result => {
  sql.query("DELETE FROM autor", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} autor`);
    result(null, res);
  });
};

module.exports = Autor;