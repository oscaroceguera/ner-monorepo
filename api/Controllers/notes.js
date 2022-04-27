const Note = require("../Models/notes");
const User = require("../Models/users");

exports.getNotes = async (req, res) => {
  const notes = await Note.find({}).populate("user", { username: 1, name: 1 });
  res.json(notes);
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

exports.addNote = async (request, response) => {
  const {
    body: { content, important, userId },
  } = request;

  if (!content) {
    return response.status(400).json({ error: "content missing" });
  }

  const user = await User.findById(userId);

  const note = new Note({
    content,
    // important: important === undefined ? false : important,
    important: important ?? false,
    date: new Date(),
    user: user._id,
  });

  // try {
  //   const savedNote = await note.save();
  //   response.status(201).json(savedNote);
  // } catch (exception) {
  //   next(exception);
  // }

  const savedNote = await note.save();
  user.notes = user.notes.concat(savedNote._id);
  await user.save();

  response.json(savedNote);
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
