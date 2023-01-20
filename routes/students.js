const router = require("express").Router();

let Student = require("../models/Student.js");

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const age = Number(req.body.age);
  const gender = req.body.gender; //font end eken ewana data tika daganna variable hada gena ewata da gannwa

  const newStudent = new Student({
    name,
    age,
    gender, //udin gaththa data thuna object ekak hadal mekata dagannwa
  });

  newStudent
    .save()
    .then(() => {
      res.json("Student Added"); //e gaththa data tika ywanwa json ekak widihata eka success unoth methana me thiyana "student added " eka print wenawa
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
