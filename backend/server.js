const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = new sqlite3.Database("./database.db");


// 🧱 CREATE TABLES
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS invoices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customerName TEXT,
      createdAt TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS invoice_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      invoice_id INTEGER,
      product TEXT,
      amount INTEGER
    )
  `);
});


// ➕ ADD INVOICE
app.post("/add-invoice", (req, res) => {
  console.log("Incoming:", req.body);

 const { customerName, items } = req.body;
const createdAt = new Date().toISOString(); 

  if (!customerName || !items || items.length === 0) {
    return res.status(400).send("Invalid data");
  }

  db.run(
    "INSERT INTO invoices (customerName, createdAt) VALUES (?, ?)",
[customerName, createdAt],
    function (err) {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      const invoiceId = this.lastID;

      const stmt = db.prepare(
        "INSERT INTO invoice_items (invoice_id, product, amount) VALUES (?, ?, ?)"
      );

      items.forEach(item => {
        stmt.run(invoiceId, item.product, item.amount);
      });

      stmt.finalize();

      console.log("Saved invoice:", invoiceId);

      res.send({ success: true });
    }
  );
});


// 📥 GET ALL INVOICES
app.get("/invoices", (req, res) => {
  db.all("SELECT * FROM invoices", [], (err, invoices) => {
    if (err) return res.status(500).send(err);

    if (invoices.length === 0) return res.send([]);

    const result = [];
    let completed = 0;

    invoices.forEach(inv => {
      db.all(
        "SELECT * FROM invoice_items WHERE invoice_id = ?",
        [inv.id],
        (err, items) => {
          result.push({
            ...inv,
            items
          });

          completed++;

          if (completed === invoices.length) {
            res.send(result);
          }
        }
      );
    });
  });
});


// ✏️ UPDATE INVOICE
app.put("/update-invoice/:id", (req, res) => {
  const { id } = req.params;
  const { customerName, items } = req.body;

  if (!customerName || !items) {
    return res.status(400).send("Invalid data");
  }

  db.run(
    "UPDATE invoices SET customerName=? WHERE id=?",
    [customerName, id],
    function (err) {
      if (err) return res.status(500).send(err);

      // delete old items
      db.run(
        "DELETE FROM invoice_items WHERE invoice_id=?",
        [id],
        () => {
          const stmt = db.prepare(
            "INSERT INTO invoice_items (invoice_id, product, amount) VALUES (?, ?, ?)"
          );

          items.forEach(item => {
            stmt.run(id, item.product, item.amount);
          });

          stmt.finalize();

          res.send({ success: true });
        }
      );
    }
  );
});


// ❌ DELETE INVOICE
app.delete("/delete-invoice/:id", (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM invoices WHERE id=?", [id]);
  db.run("DELETE FROM invoice_items WHERE invoice_id=?", [id]);

  res.send({ success: true });
});


// 🧪 TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend working ✅");
});


// 🚀 START SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
