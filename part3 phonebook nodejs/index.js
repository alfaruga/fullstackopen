require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

const Person = require("./models/phone");

/* const morgan = require('morgan')
morgan.token('body', (req, res)=>JSON.stringify(req.body))
app.use(morgan(':method :url :status :response-time ms :body'))
 */

let data = [
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
app.use(express.json());
app.use(cors());
app.use(express.static("build"));

app.get("/api/persons", (request, response) => {
  Person.find({}).then((phoneBook) => {
    response.json(phoneBook);
  });
});

app.get("/info", (request, response) => {
  response.send(
    `<p>
      Phonebook has info for ${data.length} people
    </p>
    <p>${new Date()}</p>`
  );
});

app.get("/api/persons/:id", (request, response) => {
  /* const id = Number(request.params.id);
  const phoneData = data.find((person) => person.id === id);
  //response.json(phoneData);
  response.send(`<p>the data is ${JSO.stringify(phoneData)}</p>`); */

  Person.findById(request.params.id).then((foundPerson) => {
    response.json(foundPerson);
  });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  data = data.filter((n) => n.id !== id);

  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Name or number are missing",
    });
  } else if (data.some((phone) => phone.name === body.name)) {
    return response.status(400).json({
      error: "This person is already registered",
    });
  }
  const phoneData = new Person({
    ...body,
    date: new Date(),
  });

  phoneData.save().then((savedPhone) => {
    console.log("Phone succesfully saved!");
    response.json(savedPhone);
  });
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server runing on port ${PORT}`);
});
