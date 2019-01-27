const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  breed: String,
  description: String
});

const Cat = mongoose.model("Cat", catSchema);

module.exports = Cat;
