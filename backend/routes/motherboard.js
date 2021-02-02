const express = require("express");
const router = express.Router();

const MotherboardModel = require("../models/Motherboard");
router.post("/add", async (req, res) => {
  const motherboard = await new MotherboardModel({
    name: req.body.name,
    brand: req.body.brand,
    form_factor: req.body.form_factor,
    chipset: req.body.chipset,
    socket_type: req.body.socket_type,
    memory_slot: req.body.memory_slot,
    image: req.body.image,
    price: req.body.price,
  });

  motherboard
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

router.get("/view",async (req, res) => {
  await MotherboardModel.find({}, (err, result) => {
    if (err)
      res
        .status(404)
        .json({ msg: "check your internet connection and try again later" });
    else res.send(result);
  });
});

router.delete("/delete/:id",async (req, res) => {
  const id = req.params.id;
  await MotherboardModel.findByIdAndRemove(id)
    .then((e) => {
      console.log("delete" + e);
      res.send("deleted");
    })
    .catch((e) => {
      console.log(e);
    });
});

module.exports = router;
