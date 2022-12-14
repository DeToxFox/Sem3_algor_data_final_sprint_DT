const { ObjectId } = require("mongodb");
const dal = require("./mdb");

async function getNumbers() {
  if (DEBUG) console.log("input.mongo.dal.getNumbers()");
  try {
    await dal.connect();
    const cursor = dal.db("algor_sprint2").collection("input").find();
    const results = await cursor.toArray();
    return results;
  } catch (error) {
    console.log(error);
  }
}

// original code
async function addNumbers(numbers, newTree) {
  if (DEBUG)
    console.log("Dec 13, Algroithm Sprint, input.mongo.dal.addNumbers()");
  let newLogin = JSON.parse(
    `{  "numbers": "` + numbers + `", "tree": "` + newTree + `"}`
  );
  // console.log(`newLogin Value: `, newLogin);
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
  getNumbers,
  addNumbers,
};
