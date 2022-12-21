// class Node is used to create an object representing a node in a tree
class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

// constant Compare is declared with LESS_THAN, BIGGER_THAN, and EQUALS
// properties to be used in the defaultCompare function
const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
  EQUALS: 0,
};

// defaultCompare is used to compare the keys of two nodes
function defaultCompare(a, b) {
  if (a === b) {
    return Compare.EQUALS;
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

function CompareFn(a, b) {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  } else {
    return 0;
  }
}

// class BinarySearchTree is used to create a Binary Search Tree
class BinarySearchTree {
  constructor(CompareFn = this.defaultCompare) {
    this.CompareFn = CompareFn;
    this.root = null;
  }
  // insert is used to insert a new node into the tree but first checks if the tree
  // is empty and if so, creates a new node making the key the root
  insert(key) {
    if (this.root === null) {
      this.root = new Node(key);
    } else {
      this.insertNode(this.root, key);
    }
  }
  // insertNode is used to insert a new node into the tree if the tree is not empty and node, key
  // are passed in as parameters to the function and the key is compared to the node key
  insertNode(node, key) {
    if (this.CompareFn(key, node.key) === Compare.LESS_THAN) {
      if (node.left == null) {
        node.left = new Node(key);
      } else {
        this.insertNode(node.left, key);
      }
    } else {
      if (node.right === null) {
        node.right = new Node(key);
      } else {
        this.insertNode(node.right, key);
      }
    }
  }
  // inOrderTraverse is used to traverse the tree in order from left to right
  inOrderTraverse(callback) {
    this.inOrderTraverseNode(this.root, callback);
  }
  inOrderTraverseNode(node, callback) {
    if (node != null) {
      this.inOrderTraverseNode(node.left, callback);
      callback(node.key);
      this.inOrderTraverseNode(node.right, callback);
    }
  }
  // preOrderTraverse is used to traverse the tree in pre order from root to left to right
  preOrderTraverse(callback) {
    this.preOrderTraverseNode(this.root, callback);
  }
  preOrderTraverseNode(node, callback) {
    if (node != null) {
      callback(node.key);
      this.preOrderTraverseNode(node.left, callback);
      this.preOrderTraverseNode(node.right, callback);
    }
  }
  // postOrderTraverse is used to traverse the tree in post order from left to right to root
  postOrderTraverse(callback) {
    this.postOrderTraverseNode(this.root, callback);
  }
  postOrderTraverseNode(node, callback) {
    if (node != null) {
      this.postOrderTraverseNode(node.left, callback);
      this.postOrderTraverseNode(node.right, callback);
      callback(node.key);
    }
  }
  // min is used to find the minimum value in the tree
  min() {
    return this.minNode(this.root);
  }
  minNode(node) {
    let current = node;
    while (current != null && current.left != null) {
      current = current.left;
    }
    return current;
  }
  // max is used to find the maximum value in the tree
  max() {
    return this.maxNode(this.root);
  }
  maxNode(node) {
    let current = node;
    while (current != null && current.right != null) {
      current = current.right;
    }
    return current;
  }
  // search is used to search for a key in the tree
  search(key) {
    return this.searchNode(this.root, key);
  }
  searchNode(node, key) {
    if (node == null) {
      return false;
    }
    if (this.CompareFn(key, node.key) === Compare.LESS_THAN) {
      return this.searchNode(node.left, key);
    } else if (this.CompareFn(key, node.key) === Compare.BIGGER_THAN) {
      return this.searchNode(node.right, key);
    } else {
      return true;
    }
  }

  //Removing a node
  remove(key) {
    this.root = this.removeNode(this.root, key); // {1}
  }
  removeNode(node, key) {
    if (node == null) {
      // {2}
      return null;
    }
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      // {3}
      node.left = this.removeNode(node.left, key); // {4}
      return node; // {5}
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      // {6}
      node.right = this.removeNode(node.right, key); // {7}
      return node; // {8}
    } else {
      // key is equal to node.item
      // case 1
      if (node.left == null && node.right == null) {
        // {9}
        node = null; // {10}
        return node; // {11}
      }
      // case 2
      if (node.left == null) {
        // {12}
        node = node.right; // {13}
        return node; // {14}
      } else if (node.right == null) {
        // {15}
        node = node.left; // {16}
        return node; // {17}
      }
      // case 3
      const aux = this.minNode(node.right); // {18}
      node.key = aux.key; // {19}
      node.right = this.removeNode(node.right, aux.key); // {20}
      return node; // {21}
    }
  }
}

//AVL TREE
const BalanceFactor = {
  // UNBALANCED_RIGHT: 1, Means that the right subtree is higher than the left subtree by more than one level
  UNBALANCED_RIGHT: 1,
  // SLIGHTLY_UNBALANCED_RIGHT: 2, Means that the right subtree is higher than the left subtree by one level
  SLIGHTLY_UNBALANCED_RIGHT: 2,
  // BALANCED: 3, Means that the left and right subtree have the same height
  BALANCED: 3,
  // SLIGHTLY_UNBALANCED_LEFT: 4, Means that the left subtree is higher than the right subtree by one level
  SLIGHTLY_UNBALANCED_LEFT: 4,
  // UNBALANCED_LEFT: 5, Means that the left subtree is higher than the right subtree by more than one level
  UNBALANCED_LEFT: 5,
};

// defaultCompared = BinarySearchTree;
// extends means that AVLTree inherits from BinarySearchTree
class AVLTree extends BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    super(compareFn);
    this.compareFn = compareFn;
    this.root = null;
  }
  // defaultCompare is used to compare the keys of the nodes
  defaultCompare(a, b) {
    if (a === b) {
      return Compare.EQUALS;
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
  }
  // getNodeHeight is used to get the height of a node
  getNodeHeight(node) {
    if (node == null) {
      return -1;
    }
    return (
      Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) +
      1
    );
  }
  // getBalanceFactor is used to get the balance factor of a node
  getBalanceFactor(node) {
    const heightDifference =
      this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
    switch (heightDifference) {
      case -2:
        return BalanceFactor.UNBALANCED_RIGHT;
      case -1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
      case 1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
      case 2:
        return BalanceFactor.UNBALANCED_LEFT;
      default:
        return BalanceFactor.BALANCED;
    }
  }
  // rotationLL is used to rotate a node to the left
  rotationLL(node) {
    const tmp = node.left; // {1}
    node.left = tmp.right; // {2}
    tmp.right = node; // {3}
    return tmp;
  }
  // rotationRR is used to rotate a node to the right
  rotationRR(node) {
    const tmp = node.right; // {1}
    node.right = tmp.left; // {2}
    tmp.left = node; // {3}
    return tmp;
  }
  // rotationLR is used to rotate a node to the left then to the right
  rotationLR(node) {
    node.left = this.rotationRR(node.left);
    return this.rotationLL(node);
  }
  // rotationRL is used to rotate a node to the right then to the left
  rotationRL(node) {
    node.right = this.rotationLL(node.right);
    return this.rotationRR(node);
  }

  //Inserting a node in an AVL tree works the same way as in BST.
  // The only difference is that after inserting a node, we need to
  // check if the tree is balanced. If it is not, we need to balance it.
  insert(key) {
    this.root = this.insertNode(this.root, key);
  }
  insertNode(node, key) {
    // insert node as in BST tree
    if (node == null) {
      return new Node(key);
    } else if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.insertNode(node.left, key);
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.insertNode(node.right, key);
    } else {
      return node; // duplicated key
    }
    // balance the tree if needed
    const balanceFactor = this.getBalanceFactor(node); // {1}
    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      // {2}
      if (this.compareFn(key, node.left.key) === Compare.LESS_THAN) {
        // {3}
        node = this.rotationLL(node); // {4}
      } else {
        return this.rotationLR(node); // {5}
      }
    }
    if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      // {6}
      if (this.compareFn(key, node.right.key) === Compare.BIGGER_THAN) {
        // {7}
        node = this.rotationRR(node); // {8}
      } else {
        return this.rotationRL(node); // {9}
      }
    }
    return node;
  }

  //Removing a node from the AVL Tree
  removeNode(node, key) {
    node = super.removeNode(node, key); // {1}
    if (node == null) {
      return node; // null, no need to balance
    }
    // verify if tree is balanced
    const balanceFactor = this.getBalanceFactor(node); // {2}
    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      // {3}
      const balanceFactorLeft = this.getBalanceFactor(node.left); // {4}
      if (
        balanceFactorLeft === BalanceFactor.BALANCED ||
        balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
      ) {
        // {5}
        return this.rotationLL(node); // {6}
      }
      if (balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
        // {7}
        return this.rotationLR(node.left); // {8}
      }
    }
    if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      // {9}
      const balanceFactorRight = this.getBalanceFactor(node.right); // {10}
      if (
        balanceFactorRight === BalanceFactor.BALANCED ||
        balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
      ) {
        // {11}
        return this.rotationRR(node); // {12}
      }
      if (balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
        // {13}
        return this.rotationRL(node.right); // {14}
      }
    }
    return node;
  }
}

const tree1 = new BinarySearchTree();

const tree = new AVLTree(tree1.CompareFn);

// module.exports will be used to export the AVLTree class
module.exports = { AVLTree };
