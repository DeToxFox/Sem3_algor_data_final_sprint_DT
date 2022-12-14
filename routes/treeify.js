const express = require("express");
const router = express.Router();
const numbersDal = require("../services/m.input.dal");

router.get("/", async (req, res) => {
  try {
    let theNumbers = await numbersDal.getNumbers();
    if (DEBUG) console.table(theNumbers);
    res.render("input", { theNumbers });
  } catch {
    res.render("503");
  }
});

// // original code
// router.post("/", async (req, res) => {
//   if (DEBUG) console.log("numbers.POST");
//   try {
//     await numbersDal.addNumbers(req.body.numbers);
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
router.post("/", async (req, res) => {
  if (DEBUG) console.log("numbers.POST");
  try {
    const newTree = await numbersDal.avlTree(req.body.numbers);
    let input = [];
    await numbersDal.addNumbers(req.body.numbers);
    res.redirect("/input/");
    console.log("INPUT POST WORKED");
    await numbersDal.avlTree(req.body.numbers);
    res.redirect("/input/");
    console.log("AVL Tree WORKED");
  } catch {
    res.render("503");
  }
});

module.exports = router;
