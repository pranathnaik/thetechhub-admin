const router = require("express").Router();
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

    const existingUser = await Admin.findOne({ email: email });

    if (existingUser)
      return res.status(400).json({ msg: "account with same email exist" });

    if (!displayName) displayName = email;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new Admin({
      email,
      password: passwordHash,
      displayName,
    });

    const savedUser = await newUser.save();
    res.send(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ msg: "not all fields have been enteredd" });

    const user = await Admin.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "no account with this email registerd" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ msg: "invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      token,
      user: {
        id: user._id,
        displayName: user.displayName,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const deletedUser = await Admin.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");

    if (!token) return res.status(401).json(false);
    const verfied = jwt.verify(token, process.env.JWT_SECRET);
    if (!verfied) return res.status(401).json(false);
    const user = await User.findById(verfied.id);
    if (!user) return res.json(false);
    return res.json(true);
  } catch (e) {}
});

module.exports = router;
