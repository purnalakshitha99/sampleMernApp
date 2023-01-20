const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
});

const Student = mongoose.model("Student", studentSchema); //methanadi me student kiyanne document eka e kiyanne api udaharanayak lesa gattoth database eke thiyana table ekak thama student kiyanne //dan api student kiyana document ekata module eken gaththa values danawa  udaharanayak lessa gaththoth student kiyana table ekata temple ekak danwa wage wisthara danwa

module.exports = Student;
