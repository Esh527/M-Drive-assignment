const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bodyParser = require("body-parser");
const { open } = require("sqlite");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let db;

// initialize the SQLite database
(async () => {
  db = await open({ filename: "notes.db", driver: sqlite3.Database });

  // create the table if it doesn't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      category TEXT DEFAULT 'Others',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // endpoints
  app.get("/notes", async (req, res) => {
    try {
      const rows = await db.all("SELECT * FROM notes ORDER BY created_at DESC");
      res.json(rows);
    } catch (err) {
      res.status(500).send("An error occurred");
    }
  });

  app.get("/notes/:id", async (req, res) => {
    try {
      const note = await db.get("SELECT * FROM notes WHERE id = ?", [
        req.params.id,
      ]);
      res.json(note);
    } catch (err) {
      res.status(500).send("An error occurred");
    }
  });

  app.post("/notes", async (req, res) => {
    const { title, description, category } = req.body;
    try {
      const result = await db.run(
        "INSERT INTO notes (title, description, category) VALUES (?, ?, ?)",
        [title, description, category]
      );
      res.status(201).json({ id: result.lastID });
    } catch (err) {
      res.status(500).send("An error occurred");
    }
  });

  app.put("/notes/:id", async (req, res) => {
    const { title, description, category } = req.body;
    try {
      await db.run(
        `UPDATE notes SET title = ?, description = ?, category = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
        [title, description, category, req.params.id]
      );
      res.status(200).send("Note updated");
    } catch (err) {
      res.status(500).send("An error occurred");
    }
  });

  app.delete("/notes/:id", async (req, res) => {
    try {
      await db.run("DELETE FROM notes WHERE id = ?", [req.params.id]);
      res.status(200).send("Note deleted");
    } catch (err) {
      res.status(500).send("An error occurred");
    }
  });

  app.listen(5000, () => console.log("Backend running at http://localhost:5000"));
})();
