const { Router } = require("express");
const app = Router();

const {
  getNote,
  getNotes,
  deleteNote,
  addNote,
} = require("../Controllers/notes");

app.get("/notes", getNotes);
app.get("/notes/:id", getNote);
app.delete("/notes/:id", deleteNote);
app.post("/notes", addNote);

module.exports = app;
