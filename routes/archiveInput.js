const express = require("express");
const router = express.Router();
const numbersDal = require("../services/m.input.dal");

// // This will bring in the "fs" or file structure global object no npm install required
// const fs = require("fs");
// // This will bring in the "events" global object no npm install required
// const eventEmmitter = require("events");
// // Create the class MyEmitter to define it, making sure to the first letter is upper case, this is for classes
// class MyEmitter extends eventEmmitter {}
// // This instantiates a new emitter object that will be needed to access the index page
// const myEmitter = new MyEmitter();

// // This allows routes.js to access the functions within the logEvents.js
// const logEvents = require("./logEvents");

// // Creating an dot addListener or dot on function, it will have name "routes", this could be anything and functions below can have different names
// // to serve different purposes then there are in this case 3 parameters, event, level (ex: information, error), and a message that can be logged
// myEmitter.on("status", (msg, theStatusCode) => {
//   // once the above part of the listeners has exicuted its block
//   // the logEvents function in logEvents.js will fire and the parameters here will be sent over to be processed
//   logEvents(msg, theStatusCode);
// });

router.get("/", async (req, res) => {
  // const theNumbers = [
  //     {numbers: 11,7,15,5,3,6,9,8,10,13,12,14,20,18,25},
  //     {numbers: 50,30,20,40,70,60,80,90,100,110,120,130,140,150,160},
  //     {numbers: 8,12,16,18,19,25,29,36,32,45,48,50,52,55,60},
  // ];
  try {
    let theNumbers = await numbersDal.getAllObjects();
    if (DEBUG) console.table(theNumbers);
    res.render("input", { theNumbers });
  } catch {
    // res.statusCode = 503;
    // theStatusCode = res.statusCode;
    // msg = "Status Code for GET: ";
    // myEmitter.emit("status", msg, theStatusCode);
    res.render("503");
  }
});

router.get("/:id", async (req, res) => {
  // const theNumbers = [
  //     {numbers: 11,7,15,5,3,6,9,8,10,13,12,14,20,18,25},
  // ];
  try {
    let aNumber = await numbersDal.getNumberByNumberId(req.params.id); // from postgresql
    if (aNumber.length === 0) res.render("no record");
    else res.render("input", { aNumber });
  } catch {
    res.statusCode = 503;
    // theStatusCode = res.statusCode;
    // msg = "Status Code for GET by Id: ";
    // myEmitter.emit("status", msg, theStatusCode);
    res.render("503");
  }
});

// original code
router.post("/", async (req, res) => {
  if (DEBUG) console.log("numbers.POST");
  try {
    await numbersDal.addObjects(req.body.numbers);
    res.redirect("/input/");
    console.log("INPUT POST WORKED");
    await treeDal.bst_avl_trees(req.body.numbers);
    res.redirect("/input/");
    console.log("INPUT POST WORKED");
  } catch {
    // log this error to an error log file.
    // res.statusCode = 503;
    // theStatusCode = res.statusCode;
    // msg = "Status Code for POST: ";
    // myEmitter.emit("status", msg, theStatusCode);
    res.render("503");
  }
});

// Trying to create an array from the input
// router.post("/", async (req, res) => {
//   if (DEBUG) console.log("numbers.POST");
//   try {
//     let theInput = req.body.numbers;
//     const myArray = theInput.split(",");
//     let input = [];
//     for (let i = 0; i < myArray.length; i++) {
//       input.push(parseInt(myArray[i]));
//     }
//     // input = req.body.numbers.split(",");
//     console.log(`the input in input.js routes:`, input);
//     // input.map((num) => parseInt(num));

//     await numbersDal.addObjects(input);
//     res.redirect("/input/");
//     console.log("INPUT POST WORKED");
//   } catch {
//     // log this error to an error log file.
//     // res.statusCode = 503;
//     // theStatusCode = res.statusCode;
//     // msg = "Status Code for POST: ";
//     // myEmitter.emit("status", msg, theStatusCode);
//     res.render("503");
//   }
// });

module.exports = router;
