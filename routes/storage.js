const express = require("express");
const router = express.Router();

const StorageModel = require("../models/Storage");

router.post("/add", async (req, res) => {
  const storage = await new StorageModel({
    name: req.body.name,
    brand: req.body.brand,
    model: req.body.model,
    rpm: req.body.rpm,
    cache: req.body.cache,
    type: req.body.type,
    interface: req.body.interfacec,
    price: req.body.price,
  });

  storage
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
  StorageModel.find({}, (err, result) => {
    if (err) res.send(err);
    else res.send(result);
  });
});

router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  StorageModel.findByIdAndRemove(id)
    .then((e) => {
      console.log("delete" + e);
      res.send("deleted");
    })
    .catch((e) => {
      console.log(e);
    });
});

module.exports = router;
