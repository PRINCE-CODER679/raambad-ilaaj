/*
 * Experiment 1: Linear and Binary Search
 * Topic: Menu-driven program to search student roll numbers using Linear Search and Binary Search.
 */

#include <stdio.h>
#include <stdlib.h>

#define MAX 100

// Function for Linear Search on an unsorted array
int linearSearch(int arr[], int n, int key, int *comparisons) {
    *comparisons = 0;
    for (int i = 0; i < n; i++) {
        (*comparisons)++;
        if (arr[i] == key) {
            return i; // Found at index i
        }
    }
    return -1; // Not found
}

// Helper function to sort array for Binary Search
void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

// Function for Binary Search on a sorted array
int binarySearch(int arr[], int n, int key, int *comparisons) {
    int low = 0, high = n - 1;
    *comparisons = 0;

    while (low <= high) {
        (*comparisons)++;
        int mid = low + (high - low) / 2;

        if (arr[mid] == key) {
            return mid; // Found at index mid
        } else if (arr[mid] < key) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return -1; // Not found
}

// Function to display roll numbers
void displayArray(int arr[], int n) {
    printf("Student Roll Numbers: [ ");
    for (int i = 0; i < n; i++) {
        printf("%d", arr[i]);
        if (i < n - 1) printf(", ");
    }
    printf(" ]\n");
}

int main() {
    int rollNumbers[MAX];
    int sortedRollNumbers[MAX];
    int n = 0;
    int choice, key, index, comparisons;

    printf("==================================================\n");
    printf("   EXPERIMENT 1: LINEAR AND BINARY SEARCH\n");
    printf("==================================================\n");

    printf("Enter number of students: ");
    if (scanf("%d", &n) != 1 || n <= 0 || n > MAX) {
        printf("Invalid number of students! Exiting.\n");
        return 1;
    }

    printf("Enter %d student roll numbers:\n", n);
    for (int i = 0; i < n; i++) {
        printf("Roll number [%d]: ", i + 1);
        scanf("%d", &rollNumbers[i]);
        sortedRollNumbers[i] = rollNumbers[i];
    }

    // Pre-sort copy for binary search
    bubbleSort(sortedRollNumbers, n);

    do {
        printf("\n---------------- MENU ----------------\n");
        printf("1. Display Student Roll Numbers\n");
        printf("2. Linear Search (Unsorted Array)\n");
        printf("3. Binary Search (Sorted Array)\n");
        printf("4. Exit\n");
        printf("--------------------------------------\n");
        printf("Enter your choice (1-4): ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                printf("\n--- Original (Unsorted) List ---\n");
                displayArray(rollNumbers, n);
                printf("--- Sorted List (for Binary Search) ---\n");
                displayArray(sortedRollNumbers, n);
                break;

            case 2:
                printf("\nEnter student roll number to search (Linear Search): ");
                scanf("%d", &key);
                index = linearSearch(rollNumbers, n, key, &comparisons);
                if (index != -1) {
                    printf(">> SUCCESS: Roll number %d found at index %d (Position %d).\n", key, index, index + 1);
                } else {
                    printf(">> NOT FOUND: Roll number %d is not present in the record.\n", key);
                }
                printf(">> Number of comparisons made: %d\n", comparisons);
                break;

            case 3:
                printf("\nEnter student roll number to search (Binary Search): ");
                scanf("%d", &key);
                index = binarySearch(sortedRollNumbers, n, key, &comparisons);
                if (index != -1) {
                    printf(">> SUCCESS: Roll number %d found at index %d (Position %d in sorted list).\n", key, index, index + 1);
                } else {
                    printf(">> NOT FOUND: Roll number %d is not present in the record.\n", key);
                }
                printf(">> Number of comparisons made: %d\n", comparisons);
                break;

            case 4:
                printf("\nExiting Program. Thank you!\n");
                break;

            default:
                printf("\nInvalid choice! Please select an option between 1 and 4.\n");
        }
    } while (choice != 4);

    return 0;
}
