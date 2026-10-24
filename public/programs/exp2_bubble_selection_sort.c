/*
 * Experiment 2: Sorting First-Year Student Percentages
 * Topic: Sort student percentages using Bubble Sort and Selection Sort.
 */

#include <stdio.h>
#include <stdlib.h>

#define MAX 100

// Function to display percentages
void displayPercentages(float arr[], int n) {
    printf("[ ");
    for (int i = 0; i < n; i++) {
        printf("%.2f%%", arr[i]);
        if (i < n - 1) printf(", ");
    }
    printf(" ]\n");
}

// Function to perform Bubble Sort
void bubbleSort(float arr[], int n) {
    float temp;
    int swapped;
    for (int i = 0; i < n - 1; i++) {
        swapped = 0;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = 1;
            }
        }
        if (swapped == 0)
            break;
    }
}

// Function to perform Selection Sort
void selectionSort(float arr[], int n) {
    int minIdx;
    float temp;
    for (int i = 0; i < n - 1; i++) {
        minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx != i) {
            temp = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = temp;
        }
    }
}

// Function to display the Top Five Scores
void displayTopFive(float arr[], int n) {
    printf("\n================ TOP 5 SCORES ================\n");
    int count = (n < 5) ? n : 5;
    for (int i = 0; i < count; i++) {
        printf(" Rank %d : %.2f%%\n", i + 1, arr[n - 1 - i]);
    }
    if (n < 5) {
        printf(" (Note: Only %d students available in record)\n", n);
    }
    printf("==============================================\n");
}

int main() {
    float original[MAX], bSorted[MAX], sSorted[MAX];
    int n, choice;

    printf("==================================================\n");
    printf("   EXPERIMENT 2: STUDENT PERCENTAGES SORTING\n");
    printf("==================================================\n");

    printf("Enter number of first-year students: ");
    if (scanf("%d", &n) != 1 || n <= 0 || n > MAX) {
        printf("Invalid student count! Exiting.\n");
        return 1;
    }

    printf("Enter percentage for %d students:\n", n);
    for (int i = 0; i < n; i++) {
        printf("Student [%d] Percentage: ", i + 1);
        scanf("%f", &original[i]);
        bSorted[i] = original[i];
        sSorted[i] = original[i];
    }

    do {
        printf("\n---------------- MENU ----------------\n");
        printf("1. Display Original Percentages\n");
        printf("2. Sort using Bubble Sort & Display\n");
        printf("3. Sort using Selection Sort & Display\n");
        printf("4. Display Top Five Scores\n");
        printf("5. Exit\n");
        printf("--------------------------------------\n");
        printf("Enter your choice (1-5): ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                printf("\nOriginal First-Year Student Percentages:\n");
                displayPercentages(original, n);
                break;

            case 2:
                for (int i = 0; i < n; i++) bSorted[i] = original[i];
                bubbleSort(bSorted, n);
                printf("\nPercentages Sorted using Bubble Sort (Ascending):\n");
                displayPercentages(bSorted, n);
                break;

            case 3:
                for (int i = 0; i < n; i++) sSorted[i] = original[i];
                selectionSort(sSorted, n);
                printf("\nPercentages Sorted using Selection Sort (Ascending):\n");
                displayPercentages(sSorted, n);
                break;

            case 4:
                for (int i = 0; i < n; i++) bSorted[i] = original[i];
                bubbleSort(bSorted, n);
                displayTopFive(bSorted, n);
                break;

            case 5:
                printf("\nExiting Program. Thank you!\n");
                break;

            default:
                printf("\nInvalid choice! Please select an option between 1 and 5.\n");
        }
    } while (choice != 5);

    return 0;
}
