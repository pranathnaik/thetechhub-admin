const mongoose = require("mongoose");

const laptopSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  processor: { type: String, required: true },
  ram: { type: String, required: true },
  storage: { type: String, required: true },
  graphics_card: { type: Number, required: true },
  features: { type: String, required: true },
  price: { type: Number, required: true },
});

const laptop = mongoose.model("laptop", laptopSchema);

module.exports = laptop;
