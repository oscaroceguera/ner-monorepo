const Note = require("../Models/notes");

exports.getNotes = (req, res) => {
  Note.find({}).then((notes) => res.json(notes));
};

exports.getNote = (req, res) => {
  Note.findById(req.params.id).then((note) => res.json(note));
};

exports.deleteNote = async (req, res) => {
  const id = req.params.id;

  try {
    const note = await Note.findOneAndRemove({ id });

    if (!note) return res.status(404).send();

    res.send(note);
  } catch (err) {
    res.status(500).send();
  }
};

exports.addNote = (request, response) => {
  const {
    body: { content, important },
  } = request;

  if (!content) {
    return response.status(400).json({ error: "content missing" });
  }

  const note = new Note({
    content,
    important: important || false,
    date: new Date(),
  });

  note.save().then((savedNote) => {
    response.json(savedNote);
  });
};
