// Test 1 ------------------------------------------------------------------------
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
    }
  });
});

// Test 2 ------------------------------------------------------------------------
const {
  BinarySearchTree,
  Compare,
  Node,
  defaultCompare,
} = require("../dataStructures/bst_avl_trees");

describe("binarySearchTree", () => {
  test("should initialize a binary search tree with a root of null", () => {
    let bst = new BinarySearchTree();
    bst.insert(36);
    expect(bst.root.key).toBe(36);
  });
});

// Test 3 ------------------------------------------------------------------------
describe("Testing the Functions that was Used From AVLTree Class", () => {
  test("Tests the inputs of the AVL tree", () => {
    const tree = new AVLTree();
    tree.insert(10);
    tree.insert(23);
    tree.insert(35);
    tree.insert(42);
    tree.insert(50);
    const printNode = (value) => console.log(value);
    expect(tree.root).not.toBe(null);
    tree.inOrderTraverse(printNode);
    expect(tree.root.key).toBe(23);
    expect(tree.root.left.key).toBe(10);
    expect(tree.root.right.key).toBe(42);
    expect(tree.root.right.left.key).toBe(35);
    expect(tree.root.right.right.key).toBe(50);
  });
});
