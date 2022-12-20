const express = require("express");
const router = express.Router();
const numbersDal = require("../services/m.input.dal");
// AVLTree is exported from avlTree.js, it must be imported here to use in posting a balanced tree to MongoDB
const { AVLTree } = require("../dataStructures/bst_avl_trees");

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

// Posting the user input to MongoDB and the AVL Tree to MongoDB
router.post("/newInput", async (req, res) => {
  if (DEBUG) console.log(req.body);
  try {
    // new AVLTree() is a constructor function from avlTree.js and appends to the const createdTree
    const createdTree = new AVLTree();
    // Splitting the user input into an array
    userInput = req.body.numbers.split(",");

    // Mapping each number creating an array object
    userInput.map((numbers) => {
      createdTree.insert(Number(numbers));
    });
    // if (DEBUG) console.log("createdTree:");
    if (DEBUG) console.log(`Created Tree: `, createdTree);
    console.log("userInput: ", userInput);
    const pushToMongo = JSON.stringify(createdTree);
    // Inserts the new tree into the database and the input from the user.
    numbersDal.addObjects(userInput, pushToMongo);
    res.render("currentTree.ejs", { createdTree, userInput });
  } catch (error) {
    console.error(error);
    res.render("503");
  }
});

module.exports = router;
