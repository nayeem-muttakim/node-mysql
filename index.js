const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  cors = require("cors");
require("express-async-errors");

const db = require("./db"),
  dataRoutes = require("./controllers/data.controller");

// middleware

app.use(bodyParser.json());
app.use(cors());
app.use("/api/data", dataRoutes);
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send("Something went wrong");
});

db.query("SELECT 1")
  .then((data) => {
    console.log("db connected");
    app.listen(5500, () => console.log("server started at 5500"));
  })
  .catch((err) => console.log("failed", err));
