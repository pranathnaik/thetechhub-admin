const express = require("express");
const router = express.Router();

const PsuModel = require("../models/Psu");

router.post("/add", async (req, res) => {
  const psu = await new PsuModel({
    name: req.body.name,
    brand: req.body.brand,
    model: req.body.model,
    power: req.body.power,
    efficiency: req.body.efficiency,
    image: req.body.image,
    price: req.body.price,
  });

  psu
    .save()
    .then(() => {
      res.status(200).send("inserted graphics data");
      console.log("inserted");
    })
    .catch((err) => {
      res.status(400).send("it was not inserted" + err);
      console.log("not inserted" + err);
    });
});

router.get("/view", (req, res) => {
  PsuModel.find({}, (err, result) => {
    if (err) res.send(err);
    else res.send(result);
  });
});

router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  PsuModel.findByIdAndRemove(id)
    .then((e) => {
      console.log("delete" + e);
      res.send("deleted");
    })
    .catch((e) => {
      console.log(e);
    });
});

module.exports = router;
