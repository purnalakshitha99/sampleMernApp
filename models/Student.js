const mongoose = require("mongoose");

const Schema = mongoose.schema;

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});
