const express = require("express");
const router = express.Router();

const StorageModel = require("../models/Storage");

router.post("/add", async (req, res) => {
  const { name, brand, model, rpm, type, interface, image, price } = req.body;
  console.log(req.body);

  if (
    !name ||
    !brand ||
    !model ||
    !rpm ||
    !type ||
    !interface ||
    !image ||
    !price
  )
    res.status(401).json({ msg: "all fields are required" });

  const storage = await new StorageModel({
    name,
    brand,
    model,
    rpm,
    type,
    interface,
    image,
    price,
  });

  storage
    .save()
    .then(() => {
      res.status(200).json({ msg: "storage has been added " });
    })
    .catch((err) => {
      res.status(400).json({ msg: `there was error while adding${err}` });
    });
});

router.get("/view", async (req, res) => {
  await StorageModel.find({}, (err, result) => {
    if (err)
      res
        .status(404)
        .json({ msg: "check your internet connection and try again later" });
    else res.send(result);
  });
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  await StorageModel.findByIdAndRemove(id)
    .then((e) => {
      console.log("delete" + e);
      res.send("deleted");
    })
    .catch((e) => {
      console.log(e);
    });
});

module.exports = router;
