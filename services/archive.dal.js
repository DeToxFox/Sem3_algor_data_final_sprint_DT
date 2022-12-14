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

async function getNumberByNumberId(id) {
  if (DEBUG) console.log("input.mongo.dal.getNumberByNumberId()");
  try {
    await dal.connect();
    const result = dal
      .db("algor_sprint2")
      .collection("input")
      .findOne({ _id: ObjectId(id) });
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}
// // original code
// async function addNumbers(numbers) {
//   console.log(`The numbers inputed: `, numbers);
//   if (DEBUG)
//     console.log("Dec 13, Algroithm Sprint, input.mongo.dal.addNumbers()");
//   let newLogin = JSON.parse(`{  "numbers": "` + numbers + `"}`);
//   console.log(`newLogin Value: `, newLogin);
//   try {
//     await dal.connect();
//     const result = await dal
//       .db("algor_sprint2")
//       .collection("input")
//       .insertOne(newLogin);
//     return result.insertedId;
//   } catch (error) {
//     console.log(error);
//   }
// }

// original code, sorta
async function addNumbers(numbers) {
  console.log(`The numbers inputed: `, numbers);
  const theNumbers = JSON.parse(`{"numbers": "` + Array.from(numbers) + `"}`);
  console.log(`theNumbers: `, theNumbers);
  const myArray = numbers.split(",");
  console.log(`myArray: `, myArray);
  const theArray = [];
  for (let i = 0; i < myArray.length; i++) {
    theArray.push(myArray[i]);
  }
  if (DEBUG)
    console.log("Dec 13, Algroithm Sprint, input.mongo.dal.addNumbers()");
  let newLogin = JSON.parse(`{  "numbers": "` + theArray + `"}`);
  console.log(`newLogin Value: `, newLogin);
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

// Possible solution based on original code
// async function addNumbers(numbers) {
//   const myArray = numbers.split(",");
//   const theArray = [];
//   for (let i = 0; i < myArray.length; i++) {
//     theArray.push(myArray[i]);
//   }
//   // Connect to the database
//   try {
//     await dal.connect();
//   } catch (error) {
//     console.log(error);
//     return;
//   }
//   // Create a document with the array of numbers
//   const doc = { numbers: numbers };
//   console.log(`The numbers inputed, coverted to array: `, doc);
//   // Insert the document into the "input" collection in the "algor_sprint2" database
//   try {
//     const result = await dal
//       .db("algor_sprint2")
//       .collection("input")
//       .insertOne(doc);
//     return result.insertedId;
//   } catch (error) {
//     console.log(error);
//   }
// }

// instert many
// async function addNumbers(numbers) {
//   console.log(`The numbers inputed: `, numbers);
//   if (DEBUG)
//     console.log("Dec 13, Algroithm Sprint, input.mongo.dal.addNumbers()");
//   let newLogin = JSON.parse(`{  "numbers": "` + numbers + `"}`);
//   console.log(`newLogin Value: `, newLogin);
//   try {
//     await dal.connect();
//     const result = await dal
//       .db("algor_sprint2")
//       .collection("input")
//       .insertMany(newLogin);
//     return result.insertedIds;
//   } catch (error) {
//     console.log(error);
//   }
// }

// More Testing
// async function addNumbers(numbers) {
//   console.log(`The numbers inputed: `, numbers);
//   if (DEBUG)
//     console.log("Dec 13, Algroithm Sprint, input.mongo.dal.addNumbers()");
//   let newLogin = JSON.parse(`{  "numbers": "` + numbers + `"}`);
//   // let addedNumbers = await newLogin.toArray();
//   try {
//     await dal.connect();
//     const result = await dal
//       .db("algor_sprint2")
//       .collection("input")
//       .insertOne(newLogin);
//     const finalResult = await result.toArray();
//     return finalResult.insertedId;
//   } catch (error) {
//     console.log(error);
//   }
// }

// Testing to see if I can create an array from the input
// async function addNumbers(input) {
//   console.log(`The numbers inputed: `, input);
//   if (DEBUG)
//     console.log("Dec 13, Algroithm Sprint, input.mongo.dal.addNumbers()");
//   let newLogin = JSON.parse(`{  "numbers": "` + input + `"}`);
//   console.log(`newLogin Value: `, newLogin);
//   try {
//     await dal.connect();
//     const result = await dal
//       .db("algor_sprint2")
//       .collection("input")
//       .insertOne(newLogin);
//     return result.insertedId;
//   } catch (error) {
//     console.log(error);
//   }
// }

module.exports = {
  getNumbers,
  getNumberByNumberId,
  addNumbers,
};
