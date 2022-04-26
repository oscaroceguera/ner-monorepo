const { request, response } = require("../app");
const Note = require("../Models/notes");

exports.getNotes = (req, res) => {
  Note.find({}).then((notes) => res.json(notes));
};

exports.getNote = async (req, res, next) => {
  const note = await Note.findById(req.params.id);

  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }

  // try {
  //   const note = await Note.findById(req.params.id);

  //   if (note) {
  //     res.json(note);
  //   } else {
  //     res.status(404).end();
  //   }
  // } catch (exception) {
  //   next(exception);
  // }
};

exports.deleteNote = async (req, res, next) => {
  // USING: TRY/CATCH
  // try {
  //   await Note.findByIdAndRemove(req.params.id);
  //   res.status(204).end();
  // } catch (exception) {
  //   next(exception);
  // }

  // USING: express-async-errors
  await Note.findByIdAndRemove(req.params.id);
  res.status(204).end();
};

exports.addNote = async (request, response, next) => {
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

  // try {
  //   const savedNote = await note.save();
  //   response.status(201).json(savedNote);
  // } catch (exception) {
  //   next(exception);
  // }

  const savedNote = await note.save();
  response.status(201).json(savedNote);
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
