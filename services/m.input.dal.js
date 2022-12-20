const { ObjectId } = require("mongodb");
const dal = require("./mdb");

async function getAllObjects() {
  if (DEBUG) console.log("input.mongo.dal.getAllObjects()");
  try {
    await dal.connect();
    const cursor = dal.db("algor_sprint2").collection("input").find();
    const results = await cursor.toArray();
    return results;
  } catch (error) {
    console.log(error);
  }
}

async function addObjects(userInput, pushToMongo) {
  if (DEBUG)
    console.log("Dec 13, Algroithm Sprint, input.mongo.dal.addObjects()");
  let newLogin = JSON.parse(
    `{  "numbers": "` + userInput + `", "tree": ` + pushToMongo + `}`
  );
  try {
    await dal.connect();
    const result = await dal
      .db("algor_sprint2")
      .collection("input")
      .insertOne(newLogin);
    return result.insertedId;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllObjects,
  addObjects,
};
