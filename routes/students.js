const router = require("express").Router();

let Student = require("../models/Student.js");

//post method eken data tika ganne
router.route("/add").post((req, res) => {
  const name = req.body.name;
  const age = Number(req.body.age);
  const gender = req.body.gender; //font end eken ewana data tika daganna variable hada gena ewata da gannwa
  const address = req.body.address;

  const newStudent = new Student({
    name,
    age,
    gender, //udin gaththa data thuna object ekak hadal mekata dagannwa
    address,
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

// router.route("/").get((req, res) => {
//   //uda eken gaththa data tika aran font end ekata ywanne meken
//   Student.find()
//     .then((students) => {
//       res.json(students);
//     })
//     .catch((err) => {
//       console.log(err); //error ekak awoth pennnane meken
//     });

// });

router.route("/").get(async (req, res) => {
  Student.find()
    .then((students) => {
      res.status(200).send({ status: "students", students });
    })
    .catch((err) => {
      console.log(err);
      res.status(200).send({ status: "error found add", error: err.message });
    });
}); //uda comment karala thiyana ekama wena widihakata

//http//localhost:8070/student/update/5fsadfsad43afsad
//update
router.route("/update/:id").put(async (req, res) => {
  //methana me 'async' use karanne api mokak hari illapuwa methananam mkkhri update karanna yaddi kalin kara kara hitapu eka natara karanne nathuwa aluth ekath karanwa ek nisa thama 'async'use karanne //ethakota chache wenne na
  let userId = req.params.id; //'params' kiyanne backend request eke paramiter ekak lesa ena id eka, ganna   //e  ena id eka thama use id ekata da ganne

  const { name, age, gender, address } = req.body; //font eken update wela ena data tika gannwa destructor walin

  const updateStudent = {
    //update karapu values tika me constant ekata dagnnwa
    name,
    age,
    gender,
    address,
  };

  const update = await Student.findByIdAndUpdate(userId, updateStudent)
    .then(() => {
      ////uda eken update karpu value tika adala userId ekata danwa //await eken wenne  uda 'async' eken request(promiz) eka update karala response eka denakapn inn eka   //dan methana id ekata find kare api mokak hari wistharayak hoyanne wena ekakin nam 'findonceandupdate'  //update student eke thiyenne update karann ona values tika

      res.status(200).send({ status: "user updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "error with updating data", error: err.message });
    });

  //   res.status(200).send({status:"user updated",user:update})  //response ekak yawanwa 200 kiyala ekiyanne success eth ekkama update karapu userwath pennwa //mekama thama uda json file ekak aran kareth
});

//delete
router.route("/delete/:id").delete(async (req, res) => {
  let userId = req.params.id;

  await Student.findByIdAndDelete(userId)
    .then(() => {
      res.status(200).send({ status: "user deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "error with delete user", error: err.message });
    });
});

//get one user details
router.route("/get/:id").get(async (req, res) => {
  let userId = req.params.id;

  const user = await Student.findById(userId)
    .then((student) => {
      res.status(200).send({ status: "user fetched", student });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "error with get user", error: err.message });
    });
});

module.exports = router;
