const express = require("express");
const router = express.Router();

const CabinetModel = require("../models/Cabinet");

router.post("/add", async (req, res) => {
  const {
    name,
    brand,
    side_panel,
    model,
    type,
    color,
    image,
    price,
  } = req.body;
  if (
    !name ||
    !brand ||
    !side_panel ||
    !model ||
    !type ||
    !color ||
    !image ||
    !price
  )
    res.status(400).json({ msg: "all fields are required" });

  const cabinet = await new CabinetModel({
    name,
    brand,
    side_panel,
    model,
    type,
    color,
    image,
    price,
  });

  cabinet
    .save()
    .then(() => {
      res.status(200).json({ msg: "cabinet was added" });
    })
    .catch((err) => {
      res.status(400).json({ msg: "there was an error" });
    });
});

router.get("/view", async (req, res) => {
  await CabinetModel.find({}, (err, result) => {
    if (err)
      res
        .status(404)
        .json({ msg: "check your internet connection and try again later" });
    else res.send(result);
  });
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await CabinetModel.findByIdAndRemove(id)
    .then((e) => {
      console.log("delete" + e);
      res.send("deleted");
    })
    .catch((e) => {
      console.log(e);
    });
});

module.exports = router;
