const express = require("express");
const router = express.Router();

const ProcessorModel = require("../models/Processor");
router.post("/add", async (req, res) => {
  const {
    name,
    brand,
    cores,
    model,
    speed,
    socket_type,
    image,
    price,
  } = req.body;

  if (
    !name ||
    !brand ||
    !cores ||
    !model ||
    !speed ||
    !socket_type ||
    !image ||
    !price
  )
    res.status(401).json({ msg: "all fields are required please try again" });
  const processor = await new ProcessorModel({
    name,
    brand,
    cores,
    model,
    speed,
    socket_type,
    image,
    price,
  });

  processor
    .save()
    .then(() => {
      res.status(200).send("inserted processor data");
      console.log("inserted");
    })
    .catch((err) => {
      res.status(400).json({ msg: `there was an error 
      ` });
      console.log("not inserted");
    });
});

router.get("/view", (req, res) => {
  ProcessorModel.find({}, (err, result) => {
    if (err)
      res
        .status(404)
        .json({ msg: "check your internet connection and try again later" });
    else res.send(result);
  });
});

router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  ProcessorModel.findByIdAndRemove(id)
    .then((e) => {
      console.log("delete" + e);
      res.send("deleted");
    })
    .catch((e) => {
      console.log(e);
    });
});

module.exports = router;
