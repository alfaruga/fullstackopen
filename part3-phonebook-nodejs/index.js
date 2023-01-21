require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

const Person = require("./models/phone");

const morgan = require("morgan");
const { request } = require("express");
const { update } = require("./models/phone");
morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(morgan(":method :url :status :response-time ms :body"));

/* 
this was used before we connected th app to mongo
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
]; */
app.use(express.json());
app.use(cors());
app.use(express.static("build"));

app.get("/info", (request, response) => {
 

  Person.countDocuments({}, (error, count) => {
    response.send(
      `<p>
    Phonebook has info for ${count} people
  </p>
  <p>${new Date()}</p>`
    );
  })
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  console.log("this is the body:", !body.name);
  if (!body.name || !body.number) {
    console.log("found it!");
    return response.status(400).json({
      error: "Name or number are missing",
    });
  } /* else if (data.some((phone) => phone.name === body.name)) {
    return response.status(400).json({
      error: "This person is already registered",
    });
  } 
  THIS IS HANDLED NOW BY THE PUT METHOD
  */
  const phoneData = new Person({
    ...body,
    date: new Date(),
  });

  phoneData.save().then((savedPhone) => {
    console.log("Phone succesfully saved!");
    response.json(savedPhone);
  });
});
app.get("/api/persons", (request, response) => {
  Person.find({}).then((phoneBook) => {
    response.json(phoneBook);
  });
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

app.delete("/api/persons/:id", (request, response, next) => {
  /*    const id = Number(request.params.id);

  response.status(204).end(); */
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => {
      console.log("does reach error?");
      next(error);
    });
});
app.put("/api/persons/:id", (request, response, next) => {
  console.log("this is the body:", request.body); //The request body is the second parameter in the put method
  const phoneNumber = request.body;
  console.log("phone number:", phoneNumber);
  console.log("id", request.params.id, typeof request.params.id);
  Person.findByIdAndUpdate(request.params.id, phoneNumber, { new: true })
    .then((updatedPhone) => {
      console.log("is this the error?: ", updatedPhone);
      response.json(updatedPhone);
    })
    .catch((error) => next(error));
});

const errorHandler = (request, response, error, next) => {
  console.log(error.message);

  if (error.name === "CastError") {
    return response.satus(400).send({ error: "malformatted id" });
  }
  next(error);
};
app.use(errorHandler);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server runing on port ${PORT}`);
});
