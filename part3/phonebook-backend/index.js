require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

const app = express();

morgan.token("post-data", (request) => JSON.stringify(request.body));

app.use(express.static("build"));
app.use(cors());
app.use(express.json());
app.use(morgan("tiny", { skip: (request) => request.method === "POST" }));
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :post-data",
    {
      skip: (request) => request.method !== "POST",
    }
  )
);

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/persons/:id", (request, response) => {
  const id = +request.params.id;
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = +request.params.id;
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (body.name === undefined) {
    return response.status(400).json({ error: "name is missing" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

app.get("/info", (request, response) => {
  const requestTime = Date();

  response.send(
    `<p>Phonebook has info for ${persons.length} people</p>
    <p>${requestTime}</p>`
  );
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
