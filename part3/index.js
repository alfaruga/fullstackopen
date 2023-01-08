const { response, request } = require("express");
const express = require("express");
const app = express();

const morgan = require('morgan')
app.use(morgan('tiny'))
morgan.token('body', (req, res)=>JSON.stringify(req.body))
app.use(morgan(':method :url :status :response-time ms :body'))


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

app.get("/api/persons", (request, response) => {
  response.json(data);
});

app.get("/info", (request, response) => {
  response.send(
    `<p>
      Phonebook has info for ${data.length} people
    </p>
    <p>${new Date()}</p>`
  );
});
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server runing on port ${PORT}`);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const phoneData = data.find((person) => person.id === id);
  //response.json(phoneData);
  response.send(`<p>the data is ${JSON.stringify(phoneData)}</p>`)
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  data = data.filter((n) => n.id !== id);

  response.status(204).end();
});
app.use(express.json());

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

  const phoneData = {
    ...body,
    id: Math.floor(Math.random() * 100),
    date: new Date(),
  };

  data = data.concat(phoneData);

  response.json(phoneData);
});