const { Router } = require("express");
const app = Router();

const {
  getNote,
  getNotes,
  deleteNote,
  addNote,
  updateNote,
} = require("../Controllers/notes");

const {
  getPersons,
  getPersonsInfo,
  getPerson,
  deletePerson,
  addPersons,
} = require("../Controllers/persons");

const { addUser, getUser } = require("../Controllers/users");

const { getBlogs, addBlogs } = require("../Controllers/blog");

app.get("/notes", getNotes);
app.get("/notes/:id", getNote);
app.delete("/notes/:id", deleteNote);
app.post("/notes", addNote);
app.put("/notes/:id", updateNote);

app.get("/persons", getPersons);
app.get("/info", getPersonsInfo);
app.get("/persons/:id", getPerson);
app.delete("/persons/:id", deletePerson);
app.post("/persons", addPersons);

app.get("/blogs", getBlogs);
app.post("/blogs", addBlogs);

app.post("/users", addUser);
app.get("/users", getUser);

module.exports = app;
