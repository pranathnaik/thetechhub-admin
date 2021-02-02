const express = require("express");
const router = express.Router();

const PrebuildModel = require("../models/Prebuild");
router.post("/add", async (req, res) => {

  const prebuild = await new PrebuildModel({
    name: req.body.name,
    processor: req.body.processor,
    motherboard: req.body.motherboard,
    graphicscard: req.body.graphicscard,
    storage: req.body.storage,
    cabinet: req.body.cabinet,
    psu: req.body.psu,
    ram: req.body.ram,
    cooler: req.body.cooler,
    image: req.body.image,
    price: req.body.price,
  });

  prebuild
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
  await PrebuildModel.find({}, (err, result) => {
    if (err)
      res
        .status(404)
        .json({ msg: "check your internet connection and try again later" });
    else res.send(result);
  });
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await PrebuildModel.findByIdAndRemove(id)
    .then((e) => {
      console.log("delete" + e);
      res.send("deleted");
    })
    .catch((e) => {
      console.log(e);
    });
});

module.exports = router;
