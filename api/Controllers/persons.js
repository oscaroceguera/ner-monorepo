const Person = require("../Models/persons");

exports.getPersons = (req, res) => {
  Person.find({}).then((notes) => res.json(notes));
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
  Person.findById(id).then((note) => res.json(note));
};

exports.deletePerson = async (req, res) => {
  const { id } = req.params;

  try {
    const person = await Person.findOneAndRemove({ id });

    if (!person) return res.status(404).send();

    res.send(person);
  } catch (err) {
    res.status(500).send();
  }
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

  const person = new Person({
    name,
    number,
  });

  person.save().then((savedPerson) => {
    res.json(savedPerson);
  });
};
