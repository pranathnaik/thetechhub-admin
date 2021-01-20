const router = require("express").Router();
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");

const auth = require("../middleware/auth");
require("dotenv").config();

router.post("/register", async (req, res) => {
  try {
    let { email, password, passwordCheck, displayName } = req.body;

    if (!email || !password || !passwordCheck)
      return res.status(400).json({ msg: "not all fields have been enteredd" });

    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "password should be atleast 5 char long" });

    if (password !== passwordCheck)
      return res.status(400).json({ msg: "enter the same password twice" });

    const existingadmin = await Admin.findOne({ email: email });

    if (existingadmin)
      return res.status(400).json({ msg: "account with same email exist" });

    if (!displayName) displayName = email;

    const salt = await bcrypt.genSalt();
    console.log(salt);
    const passwordHash = await bcrypt.hash(password, salt);

    const newadmin = new Admin({
      email,
      password: passwordHash,
      displayName,
    });

    const savedadmin = await newadmin.save();
    res.send(savedadmin);
  } catch (err) {
    res.status(500).json({ msg: `${err.message}` });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ msg: "not all fields have been enteredd" });

    const admin = await Admin.findOne({ email: email });
    if (!admin)
      return res
        .status(400)
        .json({ msg: "no account with this email registerd" });

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) return res.status(400).json({ msg: "invalid credentials" });

    res.json({
      admin: {
        id: admin._id,
        displayName: admin.displayName,
        email: admin.email,
      },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedadmin = await Admin.findByIdAndDelete(req.admin);
    res.json(deletedadmin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/tokenIsValid", async (req, res) => {
  try {
    const id = req.header("x-auth-id");
   
    if (!id) return res.status(401).json(false);

    const admin = await Admin.findById(id);

    if (!admin) return res.json(false);

    return res.status(200).json(true);
  } catch (e) {
    console.log(e.message);
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin);
    return res.json(admin);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
