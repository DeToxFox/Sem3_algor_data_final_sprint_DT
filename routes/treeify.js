const express = require("express");
const router = express.Router();
const numbersDal = require("../services/m.input.dal");
// AVLTree is exported from avlTree.js, it must be imported here to use in posting a balanced tree to MongoDB
const { AVLTree } = require("../services/avlTree");

// View all Binary Search Trees, display.ejs is the final display of all objects in MongoDB
router.get("/", async (req, res) => {
  try {
    let theNumbers = await numbersDal.getAllObjects();
    if (DEBUG) console.table(theNumbers);
    res.render("display", { theNumbers });
  } catch {
    res.render("503");
  }
});

// Routing to the input.ejs page to create a new Binary Search Tree
router.get("/input", async (req, res) => {
  try {
    res.render("input");
  } catch (error) {
    console.error(error);
    res.status(503).render("503");
  }
});

// Posting the user input to MongoDB and the AVL Tree to MongoDB
router.post("/input/newInput", async (req, res) => {
  if (DEBUG) console.log(req.body);
  try {
    // new AVLTree() is a constructor function from avlTree.js and appends to the const createdTree
    const createdTree = new AVLTree();
    // input array is created to hold the user input after it is split
    // let userInput = [];
    userInput = req.body.numbers.split(",");
    // console.log(input);

    // Mapping each number creating an array object
    userInput.map((number) => {
      createdTree.insert(Number(number));
    });
    // if (DEBUG) console.log("createdTree:");
    // if (DEBUG) console.log(createdTree);
    console.log("userInput: ", userInput);
    const pushToMongo = JSON.stringify(createdTree);
    // Inserts the new tree into the database and the input from the user.
    numbersDal.addObjects(userInput, pushToMongo);
    // res.redirect("/input/currentTree");
    // res.redirect("/treeify/currentTree");
    // res.redirect("/currentTree");
    res.render("currentTree.ejs", { createdTree });
  } catch (error) {
    console.error(error);
    res.render("503");
  }
});

// // original code
// router.post("/", async (req, res) => {
//   if (DEBUG) console.log("numbers.POST");
//   try {
//     await numbersDal.addObjects(req.body.numbers);
//     res.redirect("/input/");
//     console.log("INPUT POST WORKED");
//     await numbersDal.avlTree(req.body.numbers);
//     res.redirect("/input/");
//     console.log("AVL Tree WORKED");
//   } catch {
//     res.render("503");
//   }
// });

// original code + avl tree
// router.post("/", async (req, res) => {
//   if (DEBUG) console.log("numbers.POST");
//   try {
//     const newTree = await numbersDal.avlTree(req.body.numbers);
//     let input = [];
//     await numbersDal.addObjects(req.body.numbers);
//     res.redirect("/input/");
//     console.log("INPUT POST WORKED");
//     await numbersDal.avlTree(req.body.numbers);
//     res.redirect("/input/");
//     console.log("AVL Tree WORKED");
//   } catch {
//     res.render("503");
//   }
// });

module.exports = router;
