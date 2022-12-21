const { AVLTree } = require("../dataStructures/bst_avl_trees");
const mdb = require("../services/mdb");
let db = mdb.db("algor_sprint2").collection("input").find({});

// Test 1 ------------------------------------------------------------------------
describe("Are the AVL trees balanced", () => {
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
    }
  });
});

// Test 2 ------------------------------------------------------------------------
describe("Binary Search Tree Root", () => {
  test("should initialize a binary search tree with a root of null", () => {
    // new AVLTree() is a constructor function from avlTree.js and appends to the const bst
    let bst = new AVLTree();
    bst.insert(36);
    expect(bst.root.key).toBe(36);
  });
});

// Test 3 ------------------------------------------------------------------------
describe("check max node Binary Search Tree", () => {
  test("Test to check max node", () => {
    // this test checks the max node in the tree using the max() function located in class AVLTree
    const tree = new AVLTree();
    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    const big = tree.max();
    expect(big.key).toBe(3);
  });
});
