const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

require("dotenv").config();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;
//Routes

const LaptopModel = require("./models/Laptop");
const CoolerModel = require("./models/Cooler");
const AdminModel = require("./models/Admin");
const CustomerModel = require("./models/Customer");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB connection success");
  })
  .catch((err) => {
    console.log("there was an error" + err);
  });

app.use("/processor", require("./routes/processor"));
app.use("/graphicscard", require("./routes/graphicscard"));
app.use("/motherboard", require("./routes/motherboard"));
app.use("/ram", require("./routes/ram"));
app.use("/cabinet", require("./routes/cabinet"));
app.use("/psu", require("./routes/psu"));
app.use("/storage", require("./routes/storage"));
app.use("/settings", require("./routes/adminRoute"));
app.listen(port, (req, res) => {
  console.log("listeneing to prot " + port);
});
