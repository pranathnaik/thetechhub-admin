const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

require("dotenv").config();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(
    (er) => {
      console.log(`DB connection success ${er}`);
    },
    (er) => {
      console.log(` ${er}`);
    }
  );

app.use("/processor", require("./routes/processor"));
app.use("/graphicscard", require("./routes/graphicscard"));
app.use("/motherboard", require("./routes/motherboard"));
app.use("/cabinet", require("./routes/cabinet"));
app.use("/psu", require("./routes/psu"));
app.use("/ram", require("./routes/ram"));
app.use("/storage", require("./routes/storage"));
app.use("/settings", require("./routes/adminRoute"));
app.use("/laptop", require("./routes/laptopRoute"));
app.use("/prebuild", require("./routes/prebuildRoute"));

app.listen(process.env.PORT || 5000, (req, res) => {});
