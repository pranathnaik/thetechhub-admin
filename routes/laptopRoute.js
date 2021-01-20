const express = require("express");
const router = express.Router();

const LaptopModel = require("../models/Laptop");

router.post("/add", async (req, res) => {
  const {
    name,
    brand,
    model,
    processor,
    ram,
    storage,
    graphics_card,
    features,
    image,
    price,
  } = req.body;

  console.log(req.body);
  if (
    !name ||
    !brand ||
    !model ||
    !processor ||
    !ram ||
    !storage ||
    !graphics_card ||
    !features ||
    !image ||
    !price
  )
    res.status(400).json({ msg: "all fields are required" });

  const Laptop = await new LaptopModel({
    name,
    brand,
    model,
    processor,
    ram,
    storage,
    graphics_card,
    features,
    image,
    price,
  });

  Laptop.save()
    .then(() => {
      res.status(200).json({ msg: "Laptop was added" });
    })
    .catch((err) => {
      res.status(400).json({ msg: "there was an error" });
      console.log(err);
    });
});

router.get("/view", (req, res) => {
  LaptopModel.find({}, (err, result) => {
    if (err)
      res
        .status(400)
        .json({ msg: "check your internet connection and try again later" });
    else res.send(result);
  });
});

router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  LaptopModel.findByIdAndRemove(id)
    .then((e) => {
      console.log("delete" + e);
      res.send("deleted");
    })
    .catch((e) => {
      console.log(e);
    });
});

module.exports = router;
