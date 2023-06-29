const fs = require("fs");
const path = require("path");
const db = require("./connect");

const sql = fs.readFileSync('./database/setup.sql').toString();

db.query(sql)
  .then((data) => {
    db.end();
    console.log("Setup Complete 👍");
  })
  .catch((error) => console.log(error));
