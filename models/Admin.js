const mongoose = require("mongoose");
const adminSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  displayName: { type: String },
});

const admin = mongoose.model("admin", adminSchema);

module.exports = admin;
