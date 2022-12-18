const avl = require("../dataStructures/bst_avl_trees");
const mdb = require("../services/mdb.js");

test("Number of Balanced Entries Test", async () => {
  // Connect to the MongoDB instance
  const client = await mdb.connect();
  const db = client.db(algor_sprint2);
  const collection = db.collection(input);

  // Find all the entries in the collection
  const docs = await collection.find({}).toArray();

  // Create an AVL tree
  const tree = new avl();

  // Insert each entry into the AVL tree
  docs.forEach((doc) => {
    tree.insert(doc);
  });

  // Check whether the AVL tree is balanced
  const isBalanced = tree.height() <= Math.log2(docs.length + 1);

  // Assert that the AVL tree is balanced
  expect(isBalanced).toBe(true, "AVL tree is not balanced");

  client.close();
});
