const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("You should provide password");
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://makovskiyms:${password}@cluster0.jdlppif.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length == 5) {
  console.log("phonebook:");
  Person.find({}).then((persons) => {
    persons.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length === 3) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });
  person.save().then((result) => {
    console.log(`added ${result.name} number ${result.number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  console.log(
    "Call program either `node mongo.js password` to get list of entries in phonebook or `node mongo.js password name number` to add new entries to phonebook"
  );
  mongoose.connection.close();
}
