const express = require("express");
const router = express.Router();

const GraphicsCardModel = require("../models/GraphicsCard");
router.post("/add", async (req, res) => {
  const graphics = await new GraphicsCardModel({
    name: req.body.name,
    brand: req.body.brand,
    model: req.body.model,
    chipset: req.body.chipset,
    memory: req.body.memory,
    clock_speed: req.body.clock_speed,
    interface: req.body.interface,
    image: req.body.image,
    price: req.body.price,
  });

  graphics
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
  GraphicsCardModel.find({}, (err, result) => {
    if (err) res.send(err);
    else res.send(result);
  });
});

router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  GraphicsCardModel.findByIdAndRemove(id)
    .then((e) => {
      console.log("delete" + e);
      res.send("deleted");
    })
    .catch((e) => {
      console.log(e);
    });
});

module.exports = router;
