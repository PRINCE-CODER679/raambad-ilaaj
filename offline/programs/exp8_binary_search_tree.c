/*
 * Experiment 8: Binary Search Tree (BST) Operations
 * Topic: Build a Binary Search Tree by inserting values in the supplied order
 *        and perform the required BST operations.
 */

#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* left;
    struct Node* right;
};

struct Node* createNode(int value) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = value;
    newNode->left = NULL;
    newNode->right = NULL;
    return newNode;
}

struct Node* insert(struct Node* root, int value) {
    if (root == NULL) {
        return createNode(value);
    }
    if (value < root->data) {
        root->left = insert(root->left, value);
    } else if (value > root->data) {
        root->right = insert(root->right, value);
    } else {
        printf(">> Duplicate value %d ignored (BST values must be unique).\n", value);
    }
    return root;
}

void inorder(struct Node* root) {
    if (root != NULL) {
        inorder(root->left);
        printf("%d ", root->data);
        inorder(root->right);
    }
}

void preorder(struct Node* root) {
    if (root != NULL) {
        printf("%d ", root->data);
        preorder(root->left);
        preorder(root->right);
    }
}

void postorder(struct Node* root) {
    if (root != NULL) {
        postorder(root->left);
        postorder(root->right);
        printf("%d ", root->data);
    }
}

struct Node* search(struct Node* root, int key, int* comparisons) {
    (*comparisons)++;
    if (root == NULL || root->data == key) {
        return root;
    }
    if (key < root->data) {
        return search(root->left, key, comparisons);
    }
    return search(root->right, key, comparisons);
}

struct Node* findMin(struct Node* root) {
    if (root == NULL) return NULL;
    struct Node* current = root;
    while (current->left != NULL) {
        current = current->left;
    }
    return current;
}

int findHeight(struct Node* root) {
    if (root == NULL) {
        return 0;
    }
    int leftHeight = findHeight(root->left);
    int rightHeight = findHeight(root->right);
    return (leftHeight > rightHeight ? leftHeight : rightHeight) + 1;
}

void mirrorTree(struct Node* root) {
    if (root == NULL) return;

    struct Node* temp = root->left;
    root->left = root->right;
    root->right = temp;

    mirrorTree(root->left);
    mirrorTree(root->right);
}

int main() {
    struct Node* root = NULL;
    int choice, val, comparisons;

    printf("==================================================\n");
    printf("   EXPERIMENT 8: BINARY SEARCH TREE (BST)\n");
    printf("==================================================\n");

    do {
        printf("\n---------------- MENU ----------------\n");
        printf("1. Insert Value into BST\n");
        printf("2. Display Tree Traversals (Inorder, Preorder, Postorder)\n");
        printf("3. Search for a Value in BST\n");
        printf("4. Find Minimum Value\n");
        printf("5. Find Longest Path from Root (Tree Height)\n");
        printf("6. Mirror Tree & Display Mirrored Traversals\n");
        printf("7. Exit\n");
        printf("--------------------------------------\n");
        printf("Enter your choice (1-7): ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                printf("Enter integer value to insert: ");
                scanf("%d", &val);
                root = insert(root, val);
                printf(">> Inserted %d successfully.\n", val);
                break;

            case 2:
                if (root == NULL) {
                    printf(">> Tree is currently EMPTY.\n");
                } else {
                    printf("\n>> Inorder Traversal   : ");
                    inorder(root);
                    printf("\n>> Preorder Traversal  : ");
                    preorder(root);
                    printf("\n>> Postorder Traversal : ");
                    postorder(root);
                    printf("\n");
                }
                break;

            case 3:
                if (root == NULL) {
                    printf(">> Tree is empty!\n");
                } else {
                    printf("Enter value to search: ");
                    scanf("%d", &val);
                    comparisons = 0;
                    struct Node* found = search(root, val, &comparisons);
                    if (found != NULL) {
                        printf(">> SUCCESS: Value %d FOUND in BST! (Comparisons: %d)\n", val, comparisons);
                    } else {
                        printf(">> NOT FOUND: Value %d is NOT in the BST! (Comparisons: %d)\n", val, comparisons);
                    }
                }
                break;

            case 4:
                if (root == NULL) {
                    printf(">> Tree is empty!\n");
                } else {
                    struct Node* minNode = findMin(root);
                    printf(">> MINIMUM VALUE in BST: %d\n", minNode->data);
                }
                break;

            case 5:
                if (root == NULL) {
                    printf(">> Tree is empty (Height = 0)\n");
                } else {
                    int height = findHeight(root);
                    printf(">> LONGEST PATH from root (Tree Height) : %d nodes (Edges: %d)\n", height, height - 1);
                }
                break;

            case 6:
                if (root == NULL) {
                    printf(">> Tree is empty!\n");
                } else {
                    mirrorTree(root);
                    printf(">> Tree successfully MIRRORED!\n");
                    printf(">> Mirrored Inorder Traversal (Descending): ");
                    inorder(root);
                    printf("\n>> Mirrored Preorder Traversal            : ");
                    preorder(root);
                    printf("\n");
                }
                break;

            case 7:
                printf("\nExiting BST Program. Goodbye!\n");
                break;

            default:
                printf("\nInvalid choice! Please select an option between 1 and 7.\n");
        }
    } while (choice != 7);

    return 0;
}
