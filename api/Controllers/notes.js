let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2022-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2022-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2022-05-30T19:20:14.298Z",
    important: true,
  },
  {
    id: 4,
    content: "HTML is easy",
    date: "2022-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 5,
    content: "Browser can execute only Javascript",
    date: "2022-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 6,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2022-05-30T19:20:14.298Z",
    important: true,
  },
  {
    id: 7,
    content: "HTML is easy",
    date: "2022-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 8,
    content: "Browser can execute only Javascript",
    date: "2022-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 9,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2022-05-30T19:20:14.298Z",
    important: true,
  },
];

exports.getNotes = (req, res) => {
  res.json(notes);
};

exports.getNote = (req, res) => {
  const id = req.params.id;
  const note = notes.find((note) => note.id === Number(id));
  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
};

exports.deleteNote = (req, res) => {
  const id = req.params.id;
  notes = notes.filter((note) => note.id !== Number(id));
  res.status(204).end();
};

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

exports.addNote = (request, response) => {
  const {
    body: { content, important },
  } = request;

  if (!content) {
    return response.status(400).json({ error: "content missing" });
  }

  const note = {
    content,
    important: important || false,
    date: new Date(),
    id: generateId(),
  };

  notes = notes.concat(note);

  response.json(note);
};