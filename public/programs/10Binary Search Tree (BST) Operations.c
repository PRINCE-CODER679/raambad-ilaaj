class BSTNode:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None
class BinarySearchTree:
    def __init__(self):
        self.root = None
    def insert(self, key):
        self.root = self._insert_rec(self.root, key)
    def _insert_rec(self, root, key):
        if not root:
            return BSTNode(key)
        if key &lt; root.key:
            root.left = self._insert_rec(root.left, key)
        elif key &gt; root.key:
            root.right = self._insert_rec(root.right, key)
        return root
    def search(self, key):
        return self._search_rec(self.root, key)
    def _search_rec(self, root, key):
        if not root or root.key == key:
            return root
        if key &lt; root.key:
            return self._search_rec(root.left, key)
        return self._search_rec(root.right, key)
    def inorder(self):
        result = []
        self._inorder_rec(self.root, result)
        print("Inorder Traversal (Sorted):", result)
    def _inorder_rec(self, root, res):
        if root:
            self._inorder_rec(root.left, res)
            res.append(root.key)
            self._inorder_rec(root.right, res)