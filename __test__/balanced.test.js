// const avl = require("../dataStructures/bst_avl_trees");
// const mdb = require("../services/mdb");
// let server;

// describe("Connects to MongoDB", () => {
//   beforeAll(async () => {
//     expect(mdb.connect()).toBeTruthy();
//   });
//   afterAll(() => {
//     mdb.close();
//   });

//   test("Number of Balanced Entries Test", async () => {
//     // Connect to the MongoDB instance
//     const client = await mdb.connect();
//     const db = client.db(algor_sprint2);
//     const collection = db.collection(input);

//     // Find all the entries in the collection
//     const docs = await collection.find({}).toArray();

//     // Create an AVL tree
//     const tree = new avl();

//     // Insert each entry into the AVL tree
//     docs.forEach((doc) => {
//       tree.insert(doc);
//     });

//     // Check whether the AVL tree is balanced
//     const isBalanced = tree.height() <= Math.log2(docs.length + 1);

//     // Assert that the AVL tree is balanced
//     expect(isBalanced).toBe(true, "AVL tree is not balanced");

//     client.close();
//   });
// });

// const avl = require("../dataStructures/bst_avl_trees");
// const mdb = require("../services/mdb");
// global.collection = mdb.db("algor_sprint2").collection("input");

// describe("AVL tree balance test", () => {
//   let client;
//   let db;
//   let collection;

//   beforeAll(async () => {
//     client = await collection.connect();
//     db = client.db(algor_sprint2);
//     collection = db.collection(input);
//   });

//   afterAll(() => {
//     client.close();
//   });

//   test("Number of Balanced Entries Test", async () => {
//     // Find all the entries in the collection
//     const docs = await collection.find({}).toArray();

//     // Create an AVL tree
//     const tree = new avl();

//     // Insert each entry into the AVL tree
//     docs.forEach((doc) => {
//       tree.insert(doc);
//     });

//     // Check whether the AVL tree is balanced
//     const isBalanced = tree.height() <= Math.log2(docs.length + 1);

//     // Assert that the AVL tree is balanced
//     expect(isBalanced).toBe(true, "AVL tree is not balanced");
//   });
// });

const { AVLTree } = require("../dataStructures/bst_avl_trees");
const mdb = require("../services/mdb");
let db = mdb.db("algor_sprint2").collection("input").find({});

describe("AVL tree balance test", () => {
  beforeAll(async () => {
    await mdb.connect();
  });

  afterAll(() => {
    mdb.close();
  });

  test("Number of Balanced Entries Test", async () => {
    // Find all the entries in the collection
    const docs = await db.toArray();
    // Create an AVL tree
    const tree = new AVLTree();

    // Insert each entry into the AVL tree
    docs.forEach((doc) => {
      tree.insert(doc);
    });

    // Check whether the AVL tree is balanced
    const isBalanced = tree.getNodeHeight() <= Math.log2(docs.length + 1);

    // Assert that the AVL tree is balanced
    expect(isBalanced).toBe(true, "AVL tree is not balanced");

    if (isBalanced) {
      console.log("AVL trees are balanced");
    } else {
      console.log("AVL trees are NOT balanced");
    }
  });
});
