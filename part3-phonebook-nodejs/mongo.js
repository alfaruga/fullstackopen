const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please povide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://username:${password}@cluster0.c6od9zt.mongodb.net/phoneBookDB?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: Number,
  date: Date,
});
const Person = mongoose.model("Person", personSchema);

mongoose
  .connect(url)
  .then((result) => {
    console.log("Succesfully Connected!");

    if (process.argv.length === 3) {
      console.log("phonebook:");
      Person.find({}).then((person) => {
        person.forEach((phone) => {
          console.log(phone);
        });
        return mongoose.connection.close();
      });
    } else {
      const phone = new Person({
        id: process.argv[3],
        name: process.argv[4],
        number: process.argv[5],
        date: new Date(),
      });
      phone.save().then((result) => {
        console.log("Phone succesfully saved!");
        return mongoose.connection.close();
      });
    }
  })
  .catch((error) => console.log(error));
