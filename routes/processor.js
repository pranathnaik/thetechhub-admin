const express = require("express");
const router = express.Router();

const ProcessorModel = require("../models/Processor");
router.post("/add", async (req, res) => {
  const processor = await new ProcessorModel({
    name: req.body.name,
    brand: req.body.brand,
    cores: req.body.cores,
    model: req.body.model,
    speed: req.body.speed,
    socket_type: req.body.socket,
    image: req.body.image,
    price: req.body.price,
  });

  processor
    .save()
    .then(() => {
      res.status(200).send("inserted processor data");
      console.log("inserted");
    })
    .catch((err) => {
      res.status(400).send("it was not inserted" + err);
      console.log("not inserted");
    });
});

router.get("/view", (req, res) => {
  ProcessorModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
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
