const db = require("../db");

module.exports.getAllData = async () => {
  const [records] = await db.query("SELECT * FROM data");
  return records;
};

module.exports.getDataById = async (id) => {
  const [[record]] = await db.query("SELECT * FROM data WHERE id = ?", [id]);
  return record;
};

module.exports.deleteDatum = async (id) => {
  const [{ affectedRows }] = await db.query("DELETE FROM data WHERE id = ?", [
    id,
  ]);
  return affectedRows;
};



module.exports.addOrEditDatum = async (obj, id = 0) => {
  const [[[{ affectedRows }]]] = await db.query(
    "CALL usp_datum_add_or_edit(?,?,?,?)",
    [id, obj.name, obj.datum_code, obj.image]
  );
  return affectedRows;
};
