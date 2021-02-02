const express = require("express");
const router = express.Router();

const RamModel = require("../models/Ram");

router.post("/add", async (req, res) => {
  const ram = await new RamModel({
    name: req.body.name,
    brand: req.body.brand,
    model: req.body.model,
    speed: req.body.speed,
    memory: req.body.memory,
    qty: req.body.qty,
    type: req.body.type,
    image: req.body.image,
    price: req.body.price,
  });

  ram
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

router.get("/view", async (req, res) => {
  await RamModel.find({}, (err, result) => {
    if (err)
      res
        .status(404)
        .json({ msg: "check your internet connection and try again later" });
    else res.send(result);
  });
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await RamModel.findByIdAndRemove(id)
    .then((e) => {
      console.log("delete" + e);
      res.send("deleted");
    })
    .catch((e) => {
      console.log(e);
    });
});

module.exports = router;
