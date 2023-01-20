const router = require("express").Router();

let Student = require("../models/Student.js");

//post method eken data tika ganne
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
      res.json("Student Added"); //e gaththa data tika ywanwa json ekak widihata, eka success unoth methana me thiyana "student added " eka font end eke print wenawa
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/").get((req, res) => {
  //uda eken gaththa data tika aran font end ekata ywanne meken
  Student.find()
    .then((students) => {
      res.json(students);
    })
    .catch((err) => {
      console.log(err); //error ekak awoth pennnane meken
    });
});

//http//localhost:8070/student/update/5fsadfsad43afsad
//update
router.route("/update/:id").put(async (req, res) => {
  //methana me 'async' use karanne api mokak hari illapuwa methananam mkkhri update karanna yaddi kalin kara kara hitapu eka natara karanne nathuwa aluth ekath karanwa ek nisa thama 'async'use karanne //ethakota chache wenne na
  let userId = req.params.id; //'params' kiyanne backend request eke paramiter ekak lesa ena id eka, ganna   //e  ena id eka thama use id ekata da ganne

  const { name, age, gender } = req.body; //font eken update wela ena data tika gannwa destructor walin

  const updateStudent = {
    //update karapu values tika me constant ekata dagnnwa
    name,
    age,
    gender,
  };

  const update = await Student.findByIdAndUpdate(userId, updateStudent)
    .then(() => {
      ////uda eken update karpu value tika adala userId ekata danwa //await eken wenne  uda 'async' eken request(promiz) eka update karala response eka denakapn inn eka   //dan methana id ekata find kare api mokak hari wistharayak hoyanne wena ekakin nam 'findonce'  //update student eke thiyenne update karann ona values tika

      res.status(200).send({ status: "user updated", user: update });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "error with updating data" });
    });

  //   res.status(200).send({status:"user updated",user:update})  //response ekak yawanwa 200 kiyala ekiyanne success eth ekkama update karapu userwath pennwa //mekama thama uda json file ekak aran kareth
});

module.exports = router;
