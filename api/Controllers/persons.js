let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

exports.getPersons = (req, res) => {
  res.json(persons);
};

exports.getPersonsInfo = (req, res) => {
  res.send(
    `<div><p>Phonebook has info for ${
      persons.length
    } persons </p><p>${new Date()}</p></div>`
  );
};

exports.getPerson = (req, res) => {
  const { id } = req.params;
  const person = persons.find((person) => person.id === Number(id));
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
};

exports.deletePerson = (req, res) => {
  const { id } = req.params;
  persons = persons.filter((person) => person.id !== Number(id));
  res.status(204).end();
};

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};

exports.addPersons = (req, res) => {
  const {
    body: { name, number },
  } = req;

  if (!name) {
    return res.status(400).json({ error: "name missing" });
  }
  if (!number) {
    return res.status(400).json({ error: "number missing" });
  }

  const person = {
    name,
    number,
    id: generateId(),
  };

  persons = persons.concat(person);

  res.json(person);
};
