const express = require("express"),
  router = express.Router();

const service = require("../services/data.service");

router.get("/", async (req, res) => {
  const data = await service.getAllData();
  res.send(data);
});

router.get("/:id", async (req, res) => {
  const datum = await service.getDataById(req.params.id);
  if (datum == undefined) {
    res.status(404).json("no record with given id : " + req.params.id);
  } else {
    res.send(datum);
  }
});

router.delete("/:id", async (req, res) => {
  const affectedRows = await service.deleteDatum(req.params.id);
  if (affectedRows == 0) {
    res.status(404).json("no record with given id : " + req.params.id);
  } else {
    res.send("Deleted Successfully");
  }
});

router.post("/", async (req, res) => {
  await service.addOrEditDatum(req.body)
  res.status(201).send("Created Successfully")
});

router.put("/:id", async (req, res) => {
  const affectedRows = await service.addOrEditDatum(req.body, req.params.id);
  if (affectedRows == 0) {
    res.status(404).json("no record with given id : " + req.params.id);
  } else {
    res.send("Updated Successfully");
  }
});

module.exports = router;
