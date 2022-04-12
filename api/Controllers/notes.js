const Note = require("../Models/notes");

exports.getNotes = (req, res) => {
  Note.find({}).then((notes) => res.json(notes));
};

exports.getNote = (req, res, next) => {
  Note.findById(req.params.id)
    .then((note) => {
      if (note) {
        res.json(note);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
};

exports.deleteNote = async (req, res, next) => {
  const id = req.params.id;

  try {
    const note = await Note.findByIdAndRemove(id);

    if (!note) return res.status(404).send();

    res.send(note);
  } catch (err) {
    next(err);
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

exports.updateNote = (req, res, next) => {
  const {
    body: { content, important },
    params: { id },
  } = req;

  const note = {
    content: content,
    important: important,
  };

  Note.findByIdAndUpdate(id, note, { new: true })
    .then((updateNote) => {
      res.json(updateNote);
    })
    .catch((error) => next(error));
};
