const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://DT-Keyin:Keyin2021@cluster0.r5wuvmj.mongodb.net/test";
const pool = new MongoClient(uri);

module.exports = pool;
