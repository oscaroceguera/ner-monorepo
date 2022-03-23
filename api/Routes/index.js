const { Router } = require("express");
const app = Router();

const {
  getNote,
  getNotes,
  deleteNote,
  addNote,
} = require("../Controllers/notes");

const {
  getPersons,
  getPersonsInfo,
  getPerson,
  deletePerson,
  addPersons,
} = require("../Controllers/persons");

app.get("/notes", getNotes);
app.get("/notes/:id", getNote);
app.delete("/notes/:id", deleteNote);
app.post("/notes", addNote);

app.get("/persons", getPersons);
app.get("/info", getPersonsInfo);
app.get("/persons/:id", getPerson);
app.delete("/persons/:id", deletePerson);
app.post("/persons", addPersons);

module.exports = app;
