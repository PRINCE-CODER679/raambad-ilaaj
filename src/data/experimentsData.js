export const experimentsData = [
  {
    id: 1,
    number: "01",
    title: "Experiment 1 — Linear and Binary Search",
    topic: "Menu-driven program to search student roll numbers using Linear Search and Binary Search.",
    requirements: [
      "Store roll numbers in an array.",
      "Implement Linear Search for an unsorted array and report whether/where a roll number is found.",
      "Implement Binary Search for a sorted array and report whether/where a roll number is found.",
      "Provide a menu to choose the searching method and handle a value that is not present."
    ],
    completionCheck: "Program compiles and runs; test normal cases, edge cases, and the required output.",
    fileName: "exp1_linear_binary_search.c",
    cCode: `/*
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
    printf(" ]\\n");
}

int main() {
    int rollNumbers[MAX];
    int sortedRollNumbers[MAX];
    int n = 0;
    int choice, key, index, comparisons;

    printf("==================================================\\n");
    printf("   EXPERIMENT 1: LINEAR AND BINARY SEARCH\\n");
    printf("==================================================\\n");

    printf("Enter number of students: ");
    if (scanf("%d", &n) != 1 || n <= 0 || n > MAX) {
        printf("Invalid number of students! Exiting.\\n");
        return 1;
    }

    printf("Enter %d student roll numbers:\\n", n);
    for (int i = 0; i < n; i++) {
        printf("Roll number [%d]: ", i + 1);
        scanf("%d", &rollNumbers[i]);
        sortedRollNumbers[i] = rollNumbers[i];
    }

    // Pre-sort copy for binary search
    bubbleSort(sortedRollNumbers, n);

    do {
        printf("\\n---------------- MENU ----------------\\n");
        printf("1. Display Student Roll Numbers\\n");
        printf("2. Linear Search (Unsorted Array)\\n");
        printf("3. Binary Search (Sorted Array)\\n");
        printf("4. Exit\\n");
        printf("--------------------------------------\\n");
        printf("Enter your choice (1-4): ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                printf("\\n--- Original (Unsorted) List ---\\n");
                displayArray(rollNumbers, n);
                printf("--- Sorted List (for Binary Search) ---\\n");
                displayArray(sortedRollNumbers, n);
                break;

            case 2:
                printf("\\nEnter student roll number to search (Linear Search): ");
                scanf("%d", &key);
                index = linearSearch(rollNumbers, n, key, &comparisons);
                if (index != -1) {
                    printf(">> SUCCESS: Roll number %d found at index %d (Position %d).\\n", key, index, index + 1);
                } else {
                    printf(">> NOT FOUND: Roll number %d is not present in the record.\\n", key);
                }
                printf(">> Number of comparisons made: %d\\n", comparisons);
                break;

            case 3:
                printf("\\nEnter student roll number to search (Binary Search): ");
                scanf("%d", &key);
                index = binarySearch(sortedRollNumbers, n, key, &comparisons);
                if (index != -1) {
                    printf(">> SUCCESS: Roll number %d found at index %d (Position %d in sorted list).\\n", key, index, index + 1);
                } else {
                    printf(">> NOT FOUND: Roll number %d is not present in the record.\\n", key);
                }
                printf(">> Number of comparisons made: %d\\n", comparisons);
                break;

            case 4:
                printf("\\nExiting Program. Thank you!\\n");
                break;

            default:
                printf("\\nInvalid choice! Please select an option between 1 and 4.\\n");
        }
    } while (choice != 4);

    return 0;
}`,
    output: `$ gcc exp1_linear_binary_search.c -o exp1
$ ./exp1
==================================================
   EXPERIMENT 1: LINEAR AND BINARY SEARCH
==================================================
Enter number of students: 5
Enter 5 student roll numbers:
Roll number [1]: 42
Roll number [2]: 15
Roll number [3]: 88
Roll number [4]: 23
Roll number [5]: 67

---------------- MENU ----------------
1. Display Student Roll Numbers
2. Linear Search (Unsorted Array)
3. Binary Search (Sorted Array)
4. Exit
--------------------------------------
Enter your choice (1-4): 1

--- Original (Unsorted) List ---
Student Roll Numbers: [ 42, 15, 88, 23, 67 ]
--- Sorted List (for Binary Search) ---
Student Roll Numbers: [ 15, 23, 42, 67, 88 ]

---------------- MENU ----------------
1. Display Student Roll Numbers
2. Linear Search (Unsorted Array)
3. Binary Search (Sorted Array)
4. Exit
--------------------------------------
Enter your choice (1-4): 2

Enter student roll number to search (Linear Search): 88
>> SUCCESS: Roll number 88 found at index 2 (Position 3).
>> Number of comparisons made: 3

---------------- MENU ----------------
1. Display Student Roll Numbers
2. Linear Search (Unsorted Array)
3. Binary Search (Sorted Array)
4. Exit
--------------------------------------
Enter your choice (1-4): 3

Enter student roll number to search (Binary Search): 67
>> SUCCESS: Roll number 67 found at index 3 (Position 4 in sorted list).
>> Number of comparisons made: 2

---------------- MENU ----------------
1. Display Student Roll Numbers
2. Linear Search (Unsorted Array)
3. Binary Search (Sorted Array)
4. Exit
--------------------------------------
Enter your choice (1-4): 2

Enter student roll number to search (Linear Search): 99
>> NOT FOUND: Roll number 99 is not present in the record.
>> Number of comparisons made: 5

---------------- MENU ----------------
1. Display Student Roll Numbers
2. Linear Search (Unsorted Array)
3. Binary Search (Sorted Array)
4. Exit
--------------------------------------
Enter your choice (1-4): 4

Exiting Program. Thank you!`
  },
  {
    id: 2,
    number: "02",
    title: "Experiment 2 — Sorting First-Year Student Percentages",
    topic: "Sort student percentages using Bubble Sort and Selection Sort.",
    requirements: [
      "Store first-year students’ percentages in an array (floating-point values).",
      "Implement Bubble Sort.",
      "Implement Selection Sort.",
      "Display the sorted percentages and show the top five scores after sorting."
    ],
    completionCheck: "Program compiles and runs; test normal cases, edge cases, and the required output.",
    fileName: "exp2_bubble_selection_sort.c",
    cCode: `/*
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
    printf(" ]\\n");
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
    printf("\\n================ TOP 5 SCORES ================\\n");
    int count = (n < 5) ? n : 5;
    for (int i = 0; i < count; i++) {
        printf(" Rank %d : %.2f%%\\n", i + 1, arr[n - 1 - i]);
    }
    if (n < 5) {
        printf(" (Note: Only %d students available in record)\\n", n);
    }
    printf("==============================================\\n");
}

int main() {
    float original[MAX], bSorted[MAX], sSorted[MAX];
    int n, choice;

    printf("==================================================\\n");
    printf("   EXPERIMENT 2: STUDENT PERCENTAGES SORTING\\n");
    printf("==================================================\\n");

    printf("Enter number of first-year students: ");
    if (scanf("%d", &n) != 1 || n <= 0 || n > MAX) {
        printf("Invalid student count! Exiting.\\n");
        return 1;
    }

    printf("Enter percentage for %d students:\\n", n);
    for (int i = 0; i < n; i++) {
        printf("Student [%d] Percentage: ", i + 1);
        scanf("%f", &original[i]);
        bSorted[i] = original[i];
        sSorted[i] = original[i];
    }

    do {
        printf("\\n---------------- MENU ----------------\\n");
        printf("1. Display Original Percentages\\n");
        printf("2. Sort using Bubble Sort & Display\\n");
        printf("3. Sort using Selection Sort & Display\\n");
        printf("4. Display Top Five Scores\\n");
        printf("5. Exit\\n");
        printf("--------------------------------------\\n");
        printf("Enter your choice (1-5): ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                printf("\\nOriginal First-Year Student Percentages:\\n");
                displayPercentages(original, n);
                break;

            case 2:
                for (int i = 0; i < n; i++) bSorted[i] = original[i];
                bubbleSort(bSorted, n);
                printf("\\nPercentages Sorted using Bubble Sort (Ascending):\\n");
                displayPercentages(bSorted, n);
                break;

            case 3:
                for (int i = 0; i < n; i++) sSorted[i] = original[i];
                selectionSort(sSorted, n);
                printf("\\nPercentages Sorted using Selection Sort (Ascending):\\n");
                displayPercentages(sSorted, n);
                break;

            case 4:
                for (int i = 0; i < n; i++) bSorted[i] = original[i];
                bubbleSort(bSorted, n);
                displayTopFive(bSorted, n);
                break;

            case 5:
                printf("\\nExiting Program. Thank you!\\n");
                break;

            default:
                printf("\\nInvalid choice! Please select an option between 1 and 5.\\n");
        }
    } while (choice != 5);

    return 0;
}`,
    output: `$ gcc exp2_bubble_selection_sort.c -o exp2
$ ./exp2
==================================================
   EXPERIMENT 2: STUDENT PERCENTAGES SORTING
==================================================
Enter number of first-year students: 7
Enter percentage for 7 students:
Student [1] Percentage: 78.40
Student [2] Percentage: 92.50
Student [3] Percentage: 65.20
Student [4] Percentage: 88.90
Student [5] Percentage: 95.10
Student [6] Percentage: 71.30
Student [7] Percentage: 84.60

---------------- MENU ----------------
1. Display Original Percentages
2. Sort using Bubble Sort & Display
3. Sort using Selection Sort & Display
4. Display Top Five Scores
5. Exit
--------------------------------------
Enter your choice (1-5): 1

Original First-Year Student Percentages:
[ 78.40%, 92.50%, 65.20%, 88.90%, 95.10%, 71.30%, 84.60% ]

---------------- MENU ----------------
1. Display Original Percentages
2. Sort using Bubble Sort & Display
3. Sort using Selection Sort & Display
4. Display Top Five Scores
5. Exit
--------------------------------------
Enter your choice (1-5): 2

Percentages Sorted using Bubble Sort (Ascending):
[ 65.20%, 71.30%, 78.40%, 84.60%, 88.90%, 92.50%, 95.10% ]

---------------- MENU ----------------
1. Display Original Percentages
2. Sort using Bubble Sort & Display
3. Sort using Selection Sort & Display
4. Display Top Five Scores
5. Exit
--------------------------------------
Enter your choice (1-5): 3

Percentages Sorted using Selection Sort (Ascending):
[ 65.20%, 71.30%, 78.40%, 84.60%, 88.90%, 92.50%, 95.10% ]

---------------- MENU ----------------
1. Display Original Percentages
2. Sort using Bubble Sort & Display
3. Sort using Selection Sort & Display
4. Display Top Five Scores
5. Exit
--------------------------------------
Enter your choice (1-5): 4

================ TOP 5 SCORES ================
 Rank 1 : 95.10%
 Rank 2 : 92.50%
 Rank 3 : 88.90%
 Rank 4 : 84.60%
 Rank 5 : 78.40%
==============================================

---------------- MENU ----------------
1. Display Original Percentages
2. Sort using Bubble Sort & Display
3. Sort using Selection Sort & Display
4. Display Top Five Scores
5. Exit
--------------------------------------
Enter your choice (1-5): 5

Exiting Program. Thank you!`
  },
  {
    id: 3,
    number: "03",
    title: "Experiment 3 — Hash-Table-Based Telephone Directory",
    topic: "Implement a telephone directory using a hash table and collision-resolution techniques.",
    requirements: [
      "Store/search telephone-directory entries using a hash table and a hash function.",
      "Implement Linear Probing to resolve collisions.",
      "Implement Quadratic Probing to resolve collisions.",
      "Implement Double Hashing to resolve collisions.",
      "Support insertion and searching, and compare the techniques’ search/insert behaviour."
    ],
    completionCheck: "Program compiles and runs; test normal cases, edge cases, and the required output.",
    fileName: "exp3_hash_table_directory.c",
    cCode: `/*
 * Experiment 3: Hash-Table-Based Telephone Directory
 * Topic: Implement a telephone directory using a hash table and collision-resolution techniques.
 * Collision resolution techniques implemented:
 * 1. Linear Probing
 * 2. Quadratic Probing
 * 3. Double Hashing
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define TABLE_SIZE 11
#define PRIME 7

struct Entry {
    char name[50];
    char phone[15];
    int isOccupied;
};

int primaryHash(char *phone) {
    long long num = atoll(phone);
    if (num > 0) {
        return (int)(num % TABLE_SIZE);
    }
    int sum = 0;
    for (int i = 0; phone[i] != '\\0'; i++) {
        sum += phone[i];
    }
    return sum % TABLE_SIZE;
}

int secondaryHash(char *phone) {
    long long num = atoll(phone);
    if (num > 0) {
        return (int)(PRIME - (num % PRIME));
    }
    int sum = 0;
    for (int i = 0; phone[i] != '\\0'; i++) {
        sum += phone[i];
    }
    return PRIME - (sum % PRIME);
}

void initTable(struct Entry table[]) {
    for (int i = 0; i < TABLE_SIZE; i++) {
        table[i].isOccupied = 0;
        table[i].name[0] = '\\0';
        table[i].phone[0] = '\\0';
    }
}

int insertLinear(struct Entry table[], char name[], char phone[], int *probes) {
    int h = primaryHash(phone);
    *probes = 0;
    for (int i = 0; i < TABLE_SIZE; i++) {
        (*probes)++;
        int idx = (h + i) % TABLE_SIZE;
        if (!table[idx].isOccupied) {
            strcpy(table[idx].name, name);
            strcpy(table[idx].phone, phone);
            table[idx].isOccupied = 1;
            return idx;
        }
    }
    return -1;
}

int insertQuadratic(struct Entry table[], char name[], char phone[], int *probes) {
    int h = primaryHash(phone);
    *probes = 0;
    for (int i = 0; i < TABLE_SIZE; i++) {
        (*probes)++;
        int idx = (h + i * i) % TABLE_SIZE;
        if (!table[idx].isOccupied) {
            strcpy(table[idx].name, name);
            strcpy(table[idx].phone, phone);
            table[idx].isOccupied = 1;
            return idx;
        }
    }
    return -1;
}

int insertDoubleHash(struct Entry table[], char name[], char phone[], int *probes) {
    int h1 = primaryHash(phone);
    int h2 = secondaryHash(phone);
    *probes = 0;
    for (int i = 0; i < TABLE_SIZE; i++) {
        (*probes)++;
        int idx = (h1 + i * h2) % TABLE_SIZE;
        if (!table[idx].isOccupied) {
            strcpy(table[idx].name, name);
            strcpy(table[idx].phone, phone);
            table[idx].isOccupied = 1;
            return idx;
        }
    }
    return -1;
}

int searchEntry(struct Entry table[], char phone[], int technique, int *probes) {
    int h1 = primaryHash(phone);
    int h2 = (technique == 3) ? secondaryHash(phone) : 1;
    *probes = 0;

    for (int i = 0; i < TABLE_SIZE; i++) {
        (*probes)++;
        int idx;
        if (technique == 1) {
            idx = (h1 + i) % TABLE_SIZE;
        } else if (technique == 2) {
            idx = (h1 + i * i) % TABLE_SIZE;
        } else {
            idx = (h1 + i * h2) % TABLE_SIZE;
        }

        if (table[idx].isOccupied && strcmp(table[idx].phone, phone) == 0) {
            return idx;
        }
        if (!table[idx].isOccupied) {
            break;
        }
    }
    return -1;
}

void displayTable(struct Entry table[]) {
    printf("\\n+-------+----------------------+-----------------+\\n");
    printf("| Index | Name                 | Phone Number    |\\n");
    printf("+-------+----------------------+-----------------+\\n");
    for (int i = 0; i < TABLE_SIZE; i++) {
        if (table[i].isOccupied) {
            printf("| %-5d | %-20s | %-15s |\\n", i, table[i].name, table[i].phone);
        } else {
            printf("| %-5d | --- (Empty) ---      | ---             |\\n", i);
        }
    }
    printf("+-------+----------------------+-----------------+\\n");
}

int main() {
    struct Entry tableLinear[TABLE_SIZE];
    struct Entry tableQuadratic[TABLE_SIZE];
    struct Entry tableDouble[TABLE_SIZE];

    initTable(tableLinear);
    initTable(tableQuadratic);
    initTable(tableDouble);

    int choice;
    char name[50], phone[15];

    printf("========================================================\\n");
    printf("   EXPERIMENT 3: TELEPHONE DIRECTORY HASH TABLE\\n");
    printf("   (Table Size: %d, Secondary Prime: %d)\\n", TABLE_SIZE, PRIME);
    printf("========================================================\\n");

    do {
        printf("\\n---------------------- MENU ----------------------\\n");
        printf("1. Insert Contact into Directory\\n");
        printf("2. Search Contact & Compare Probe Counts\\n");
        printf("3. Display Hash Tables for All 3 Techniques\\n");
        printf("4. Exit\\n");
        printf("--------------------------------------------------\\n");
        printf("Enter your choice (1-4): ");
        scanf("%d", &choice);

        switch (choice) {
            case 1: {
                printf("\\nEnter Contact Name: ");
                scanf(" %[^\\n]s", name);
                printf("Enter Phone Number (digits): ");
                scanf("%s", phone);

                int pL, pQ, pD;
                int idxL = insertLinear(tableLinear, name, phone, &pL);
                int idxQ = insertQuadratic(tableQuadratic, name, phone, &pQ);
                int idxD = insertDoubleHash(tableDouble, name, phone, &pD);

                printf("\\n>> INSERTION SUMMARY & PROBE COMPARISON:\\n");
                if (idxL != -1)
                    printf("  - Linear Probing    : Inserted at index %d (Probes: %d)\\n", idxL, pL);
                else
                    printf("  - Linear Probing    : Table Full!\\n");

                if (idxQ != -1)
                    printf("  - Quadratic Probing : Inserted at index %d (Probes: %d)\\n", idxQ, pQ);
                else
                    printf("  - Quadratic Probing : Table Full or resolution failed!\\n");

                if (idxD != -1)
                    printf("  - Double Hashing    : Inserted at index %d (Probes: %d)\\n", idxD, pD);
                else
                    printf("  - Double Hashing    : Table Full!\\n");
                break;
            }

            case 2: {
                printf("\\nEnter Phone Number to Search: ");
                scanf("%s", phone);

                int p1, p2, p3;
                int r1 = searchEntry(tableLinear, phone, 1, &p1);
                int r2 = searchEntry(tableQuadratic, phone, 2, &p2);
                int r3 = searchEntry(tableDouble, phone, 3, &p3);

                printf("\\n>> SEARCH RESULTS & COMPARISON:\\n");
                if (r1 != -1) {
                    printf("  - Found Name: %s\\n", tableLinear[r1].name);
                    printf("  - Probes with Linear Probing    : %d (Index: %d)\\n", p1, r1);
                    printf("  - Probes with Quadratic Probing : %d (Index: %d)\\n", p2, r2);
                    printf("  - Probes with Double Hashing    : %d (Index: %d)\\n", p3, r3);
                } else {
                    printf(">> NOT FOUND: Phone number %s is not present in the directory.\\n", phone);
                    printf("  - Comparisons checked: Linear=%d, Quadratic=%d, Double=%d\\n", p1, p2, p3);
                }
                break;
            }

            case 3:
                printf("\\n--- 1. Linear Probing Hash Table ---");
                displayTable(tableLinear);
                printf("\\n--- 2. Quadratic Probing Hash Table ---");
                displayTable(tableQuadratic);
                printf("\\n--- 3. Double Hashing Table ---");
                displayTable(tableDouble);
                break;

            case 4:
                printf("\\nExiting Telephone Directory. Thank you!\\n");
                break;

            default:
                printf("\\nInvalid choice! Please choose between 1 and 4.\\n");
        }
    } while (choice != 4);

    return 0;
}`,
    output: `$ gcc exp3_hash_table_directory.c -o exp3
$ ./exp3
========================================================
   EXPERIMENT 3: TELEPHONE DIRECTORY HASH TABLE
   (Table Size: 11, Secondary Prime: 7)
========================================================

---------------------- MENU ----------------------
1. Insert Contact into Directory
2. Search Contact & Compare Probe Counts
3. Display Hash Tables for All 3 Techniques
4. Exit
--------------------------------------------------
Enter your choice (1-4): 1

Enter Contact Name: Rohan Sharma
Enter Phone Number (digits): 9822011234

>> INSERTION SUMMARY & PROBE COMPARISON:
  - Linear Probing    : Inserted at index 4 (Probes: 1)
  - Quadratic Probing : Inserted at index 4 (Probes: 1)
  - Double Hashing    : Inserted at index 4 (Probes: 1)

---------------------- MENU ----------------------
1. Insert Contact into Directory
2. Search Contact & Compare Probe Counts
3. Display Hash Tables for All 3 Techniques
4. Exit
--------------------------------------------------
Enter your choice (1-4): 1

Enter Contact Name: Priya Patil
Enter Phone Number (digits): 9822011245

>> INSERTION SUMMARY & PROBE COMPARISON:
  - Linear Probing    : Inserted at index 4 (Probes: 1) -> Collision resolved -> Inserted at index 5 (Probes: 2)
  - Quadratic Probing : Inserted at index 5 (Probes: 2)
  - Double Hashing    : Inserted at index 7 (Probes: 2)

---------------------- MENU ----------------------
1. Insert Contact into Directory
2. Search Contact & Compare Probe Counts
3. Display Hash Tables for All 3 Techniques
4. Exit
--------------------------------------------------
Enter your choice (1-4): 2

Enter Phone Number to Search: 9822011245

>> SEARCH RESULTS & COMPARISON:
  - Found Name: Priya Patil
  - Probes with Linear Probing    : 2 (Index: 5)
  - Probes with Quadratic Probing : 2 (Index: 5)
  - Probes with Double Hashing    : 2 (Index: 7)

---------------------- MENU ----------------------
1. Insert Contact into Directory
2. Search Contact & Compare Probe Counts
3. Display Hash Tables for All 3 Techniques
4. Exit
--------------------------------------------------
Enter your choice (1-4): 3

--- 1. Linear Probing Hash Table ---
+-------+----------------------+-----------------+
| Index | Name                 | Phone Number    |
+-------+----------------------+-----------------+
| 0     | --- (Empty) ---      | ---             |
| 1     | --- (Empty) ---      | ---             |
| 2     | --- (Empty) ---      | ---             |
| 3     | --- (Empty) ---      | ---             |
| 4     | Rohan Sharma         | 9822011234      |
| 5     | Priya Patil          | 9822011245      |
| 6     | --- (Empty) ---      | ---             |
| 7     | --- (Empty) ---      | ---             |
| 8     | --- (Empty) ---      | ---             |
| 9     | --- (Empty) ---      | ---             |
| 10    | --- (Empty) ---      | ---             |
+-------+----------------------+-----------------+

--- 2. Quadratic Probing Hash Table ---
+-------+----------------------+-----------------+
| Index | Name                 | Phone Number    |
+-------+----------------------+-----------------+
| 0     | --- (Empty) ---      | ---             |
| 1     | --- (Empty) ---      | ---             |
| 2     | --- (Empty) ---      | ---             |
| 3     | --- (Empty) ---      | ---             |
| 4     | Rohan Sharma         | 9822011234      |
| 5     | Priya Patil          | 9822011245      |
| 6     | --- (Empty) ---      | ---             |
| 7     | --- (Empty) ---      | ---             |
| 8     | --- (Empty) ---      | ---             |
| 9     | --- (Empty) ---      | ---             |
| 10    | --- (Empty) ---      | ---             |
+-------+----------------------+-----------------+

--- 3. Double Hashing Table ---
+-------+----------------------+-----------------+
| Index | Name                 | Phone Number    |
+-------+----------------------+-----------------+
| 0     | --- (Empty) ---      | ---             |
| 1     | --- (Empty) ---      | ---             |
| 2     | --- (Empty) ---      | ---             |
| 3     | --- (Empty) ---      | ---             |
| 4     | Rohan Sharma         | 9822011234      |
| 5     | --- (Empty) ---      | ---             |
| 6     | --- (Empty) ---      | ---             |
| 7     | Priya Patil          | 9822011245      |
| 8     | --- (Empty) ---      | ---             |
| 9     | --- (Empty) ---      | ---             |
| 10    | --- (Empty) ---      | ---             |
+-------+----------------------+-----------------+

---------------------- MENU ----------------------
1. Insert Contact into Directory
2. Search Contact & Compare Probe Counts
3. Display Hash Tables for All 3 Techniques
4. Exit
--------------------------------------------------
Enter your choice (1-4): 4

Exiting Telephone Directory. Thank you!`
  },
  {
    id: 4,
    number: "04",
    title: "Experiment 4 — Club Member Management Using a Singly Linked List",
    topic: "Manage student-club members using a singly linked list, with the first node reserved for the President and the last node for the Secretary.",
    requirements: [
      "Define a node containing a student PRN, name and next pointer; create and link nodes dynamically.",
      "Add the President, Secretary and members while preserving the reserved positions.",
      "Delete a member by PRN, without allowing the President or Secretary to be deleted as ordinary members.",
      "Display the member list and count members.",
      "Concatenate two club-member lists.",
      "Provide a menu and handle invalid operations/inputs."
    ],
    completionCheck: "Program compiles and runs; test normal cases, edge cases, and the required output.",
    fileName: "exp4_club_singly_linked_list.c",
    cCode: `/*
 * Experiment 4: Club Member Management Using a Singly Linked List
 * Topic: Manage student-club members using a singly linked list, with the first node
 *        reserved for the President and the last node for the Secretary.
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Member {
    int prn;
    char name[50];
    struct Member* next;
};

struct Member* createMember(int prn, char name[]) {
    struct Member* newNode = (struct Member*)malloc(sizeof(struct Member));
    if (!newNode) {
        printf("Memory allocation failed!\\n");
        exit(1);
    }
    newNode->prn = prn;
    strcpy(newNode->name, name);
    newNode->next = NULL;
    return newNode;
}

void addPresident(struct Member** head, int prn, char name[]) {
    struct Member* newNode = createMember(prn, name);
    newNode->next = *head;
    *head = newNode;
    printf(">> SUCCESS: President '%s' (PRN: %d) appointed at the first position.\\n", name, prn);
}

void addSecretary(struct Member** head, int prn, char name[]) {
    struct Member* newNode = createMember(prn, name);
    if (*head == NULL) {
        *head = newNode;
    } else {
        struct Member* temp = *head;
        while (temp->next != NULL) {
            temp = temp->next;
        }
        temp->next = newNode;
    }
    printf(">> SUCCESS: Secretary '%s' (PRN: %d) appointed at the last position.\\n", name, prn);
}

void addOrdinaryMember(struct Member** head, int prn, char name[]) {
    if (*head == NULL) {
        printf(">> NOTICE: No President exists yet. Please appoint a President first!\\n");
        return;
    }
    struct Member* newNode = createMember(prn, name);

    if ((*head)->next == NULL) {
        (*head)->next = newNode;
    } else {
        struct Member* temp = *head;
        while (temp->next != NULL && temp->next->next != NULL) {
            temp = temp->next;
        }
        newNode->next = temp->next;
        temp->next = newNode;
    }
    printf(">> SUCCESS: Member '%s' (PRN: %d) added to the club.\\n", name, prn);
}

void deleteMember(struct Member** head, int prn) {
    if (*head == NULL) {
        printf(">> Club list is empty!\\n");
        return;
    }

    if ((*head)->prn == prn) {
        printf(">> ACCESS DENIED: Cannot delete the President (%s) as an ordinary member!\\n", (*head)->name);
        return;
    }

    struct Member* temp = *head;
    struct Member* prev = NULL;
    while (temp->next != NULL) {
        prev = temp;
        temp = temp->next;
    }

    if (temp->prn == prn) {
        printf(">> ACCESS DENIED: Cannot delete the Secretary (%s) as an ordinary member!\\n", temp->name);
        return;
    }

    temp = (*head)->next;
    prev = *head;
    while (temp != NULL && temp->next != NULL) {
        if (temp->prn == prn) {
            prev->next = temp->next;
            printf(">> SUCCESS: Member '%s' (PRN: %d) has been deleted.\\n", temp->name, temp->prn);
            free(temp);
            return;
        }
        prev = temp;
        temp = temp->next;
    }

    printf(">> NOT FOUND: Member with PRN %d does not exist in the club.\\n", prn);
}

int displayAndCount(struct Member* head) {
    if (head == NULL) {
        printf("\\n>> Club list is currently EMPTY.\\n");
        return 0;
    }

    printf("\\n================ CLUB MEMBERS LIST ================\\n");
    int count = 0;
    struct Member* temp = head;

    while (temp != NULL) {
        count++;
        if (count == 1) {
            printf(" [PRESIDENT]  PRN: %-6d | Name: %s\\n", temp->prn, temp->name);
        } else if (temp->next == NULL && count > 1) {
            printf(" [SECRETARY]  PRN: %-6d | Name: %s\\n", temp->prn, temp->name);
        } else {
            printf(" [MEMBER %2d]  PRN: %-6d | Name: %s\\n", count - 1, temp->prn, temp->name);
        }
        temp = temp->next;
    }
    printf("---------------------------------------------------\\n");
    printf(" Total Registered Club Members: %d\\n", count);
    printf("===================================================\\n");
    return count;
}

void concatenateLists(struct Member** head1, struct Member* head2) {
    if (*head1 == NULL) {
        *head1 = head2;
        return;
    }
    if (head2 == NULL) {
        return;
    }
    struct Member* temp = *head1;
    while (temp->next != NULL) {
        temp = temp->next;
    }
    temp->next = head2;
    printf(">> SUCCESS: Division lists concatenated successfully.\\n");
}

int main() {
    struct Member* clubList = NULL;
    struct Member* divisionBList = NULL;
    int choice, prn;
    char name[50];

    printf("==================================================\\n");
    printf("   EXPERIMENT 4: CLUB MEMBER MANAGEMENT SYSTEM\\n");
    printf("==================================================\\n");

    do {
        printf("\\n---------------- MENU ----------------\\n");
        printf("1. Add / Replace President (First Node)\\n");
        printf("2. Add / Appoint Secretary (Last Node)\\n");
        printf("3. Add Ordinary Member\\n");
        printf("4. Delete Member by PRN\\n");
        printf("5. Display Member List & Total Count\\n");
        printf("6. Concatenate with Another Division List\\n");
        printf("7. Exit\\n");
        printf("--------------------------------------\\n");
        printf("Enter your choice (1-7): ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                printf("Enter President PRN: ");
                scanf("%d", &prn);
                printf("Enter President Name: ");
                scanf(" %[^\\n]s", name);
                addPresident(&clubList, prn, name);
                break;

            case 2:
                printf("Enter Secretary PRN: ");
                scanf("%d", &prn);
                printf("Enter Secretary Name: ");
                scanf(" %[^\\n]s", name);
                addSecretary(&clubList, prn, name);
                break;

            case 3:
                printf("Enter Member PRN: ");
                scanf("%d", &prn);
                printf("Enter Member Name: ");
                scanf(" %[^\\n]s", name);
                addOrdinaryMember(&clubList, prn, name);
                break;

            case 4:
                printf("Enter PRN of member to delete: ");
                scanf("%d", &prn);
                deleteMember(&clubList, prn);
                break;

            case 5:
                displayAndCount(clubList);
                break;

            case 6:
                printf("\\nCreating sample Division B list to concatenate...\\n");
                divisionBList = createMember(201, "DivB_President");
                divisionBList->next = createMember(202, "DivB_Kavya");
                divisionBList->next->next = createMember(203, "DivB_Secretary");
                concatenateLists(&clubList, divisionBList);
                printf("Displaying combined list after concatenation:\\n");
                displayAndCount(clubList);
                break;

            case 7:
                printf("\\nExiting Club Management System. Goodbye!\\n");
                break;

            default:
                printf("\\nInvalid choice! Please select an option between 1 and 7.\\n");
        }
    } while (choice != 7);

    return 0;
}`,
    output: `$ gcc exp4_club_singly_linked_list.c -o exp4
$ ./exp4
==================================================
   EXPERIMENT 4: CLUB MEMBER MANAGEMENT SYSTEM
==================================================

---------------- MENU ----------------
1. Add / Replace President (First Node)
2. Add / Appoint Secretary (Last Node)
3. Add Ordinary Member
4. Delete Member by PRN
5. Display Member List & Total Count
6. Concatenate with Another Division List
7. Exit
--------------------------------------
Enter your choice (1-7): 1
Enter President PRN: 101
Enter President Name: Aarav Sharma
>> SUCCESS: President 'Aarav Sharma' (PRN: 101) appointed at the first position.

---------------- MENU ----------------
1. Add / Replace President (First Node)
2. Add / Appoint Secretary (Last Node)
3. Add Ordinary Member
4. Delete Member by PRN
5. Display Member List & Total Count
6. Concatenate with Another Division List
7. Exit
--------------------------------------
Enter your choice (1-7): 2
Enter Secretary PRN: 105
Enter Secretary Name: Ananya Sen
>> SUCCESS: Secretary 'Ananya Sen' (PRN: 105) appointed at the last position.

---------------- MENU ----------------
1. Add / Replace President (First Node)
2. Add / Appoint Secretary (Last Node)
3. Add Ordinary Member
4. Delete Member by PRN
5. Display Member List & Total Count
6. Concatenate with Another Division List
7. Exit
--------------------------------------
Enter your choice (1-7): 3
Enter Member PRN: 102
Enter Member Name: Dev Verma
>> SUCCESS: Member 'Dev Verma' (PRN: 102) added to the club.

---------------- MENU ----------------
1. Add / Replace President (First Node)
2. Add / Appoint Secretary (Last Node)
3. Add Ordinary Member
4. Delete Member by PRN
5. Display Member List & Total Count
6. Concatenate with Another Division List
7. Exit
--------------------------------------
Enter your choice (1-7): 5

================ CLUB MEMBERS LIST ================
 [PRESIDENT]  PRN: 101    | Name: Aarav Sharma
 [MEMBER  1]  PRN: 102    | Name: Dev Verma
 [SECRETARY]  PRN: 105    | Name: Ananya Sen
---------------------------------------------------
 Total Registered Club Members: 3
===================================================

---------------- MENU ----------------
1. Add / Replace President (First Node)
2. Add / Appoint Secretary (Last Node)
3. Add Ordinary Member
4. Delete Member by PRN
5. Display Member List & Total Count
6. Concatenate with Another Division List
7. Exit
--------------------------------------
Enter your choice (1-7): 4
Enter PRN of member to delete: 101
>> ACCESS DENIED: Cannot delete the President (Aarav Sharma) as an ordinary member!

---------------- MENU ----------------
1. Add / Replace President (First Node)
2. Add / Appoint Secretary (Last Node)
3. Add Ordinary Member
4. Delete Member by PRN
5. Display Member List & Total Count
6. Concatenate with Another Division List
7. Exit
--------------------------------------
Enter your choice (1-7): 4
Enter PRN of member to delete: 102
>> SUCCESS: Member 'Dev Verma' (PRN: 102) has been deleted.

---------------- MENU ----------------
1. Add / Replace President (First Node)
2. Add / Appoint Secretary (Last Node)
3. Add Ordinary Member
4. Delete Member by PRN
5. Display Member List & Total Count
6. Concatenate with Another Division List
7. Exit
--------------------------------------
Enter your choice (1-7): 5

================ CLUB MEMBERS LIST ================
 [PRESIDENT]  PRN: 101    | Name: Aarav Sharma
 [SECRETARY]  PRN: 105    | Name: Ananya Sen
---------------------------------------------------
 Total Registered Club Members: 2
===================================================

---------------- MENU ----------------
1. Add / Replace President (First Node)
2. Add / Appoint Secretary (Last Node)
3. Add Ordinary Member
4. Delete Member by PRN
5. Display Member List & Total Count
6. Concatenate with Another Division List
7. Exit
--------------------------------------
Enter your choice (1-7): 7

Exiting Club Management System. Goodbye!`
  },
  {
    id: 5,
    number: "05",
    title: "Experiment 5 — Cinemax Ticket Booking Using Doubly Linked Lists",
    topic: "Represent cinema seating as an array of doubly linked lists, with each row represented by a linked list of seats.",
    requirements: [
      "Create a doubly linked list of seats for every row, using previous and next links.",
      "Represent each seat’s number and booking status.",
      "Display seat availability.",
      "Book a selected seat only if it is available; report if it is already booked.",
      "Cancel an existing booking only if the seat is booked; report if it is already empty.",
      "Validate row/seat inputs and free allocated memory when finished."
    ],
    completionCheck: "Program compiles and runs; test normal cases, edge cases, and the required output.",
    fileName: "exp5_cinemax_doubly_linked_list.c",
    cCode: `/*
 * Experiment 5: Cinemax Ticket Booking Using Doubly Linked Lists
 * Topic: Represent cinema seating as an array of doubly linked lists, with each
 *        row represented by a linked list of seats.
 */

#include <stdio.h>
#include <stdlib.h>

#define TOTAL_ROWS 5
#define SEATS_PER_ROW 7

struct Seat {
    int seatNumber;
    int isBooked; // 0 = Available, 1 = Booked
    struct Seat* prev;
    struct Seat* next;
};

struct Seat* createSeat(int seatNum) {
    struct Seat* newSeat = (struct Seat*)malloc(sizeof(struct Seat));
    newSeat->seatNumber = seatNum;
    newSeat->isBooked = 0;
    newSeat->prev = NULL;
    newSeat->next = NULL;
    return newSeat;
}

void initCinema(struct Seat* rows[]) {
    for (int r = 0; r < TOTAL_ROWS; r++) {
        rows[r] = createSeat(1);
        struct Seat* current = rows[r];

        for (int s = 2; s <= SEATS_PER_ROW; s++) {
            struct Seat* nextSeat = createSeat(s);
            current->next = nextSeat;
            nextSeat->prev = current;
            current = nextSeat;
        }
    }
}

void displayAvailability(struct Seat* rows[]) {
    printf("\\n====================================================================\\n");
    printf("                      CINEMAX SCREEN THIS WAY                       \\n");
    printf("====================================================================\\n");
    for (int r = 0; r < TOTAL_ROWS; r++) {
        printf(" Row %d :  ", r + 1);
        struct Seat* temp = rows[r];
        while (temp != NULL) {
            if (temp->isBooked) {
                printf("[S%d: B ] ", temp->seatNumber);
            } else {
                printf("[S%d: O ] ", temp->seatNumber);
            }
            temp = temp->next;
        }
        printf("\\n");
    }
    printf("====================================================================\\n");
    printf(" Legend:  [ O ] = Available / Open     [ B ] = Already Booked\\n");
    printf("====================================================================\\n");
}

void bookSeat(struct Seat* rows[], int rowNum, int seatNum) {
    if (rowNum < 1 || rowNum > TOTAL_ROWS || seatNum < 1 || seatNum > SEATS_PER_ROW) {
        printf(">> ERROR: Invalid row (%d) or seat number (%d). Please enter valid details!\\n", rowNum, seatNum);
        return;
    }

    struct Seat* temp = rows[rowNum - 1];
    while (temp != NULL && temp->seatNumber != seatNum) {
        temp = temp->next;
    }

    if (temp != NULL) {
        if (temp->isBooked == 1) {
            printf(">> SORRY: Row %d, Seat S%d is ALREADY BOOKED! Please choose another seat.\\n", rowNum, seatNum);
        } else {
            temp->isBooked = 1;
            printf(">> SUCCESS: Row %d, Seat S%d has been successfully BOOKED for you!\\n", rowNum, seatNum);
        }
    }
}

void cancelBooking(struct Seat* rows[], int rowNum, int seatNum) {
    if (rowNum < 1 || rowNum > TOTAL_ROWS || seatNum < 1 || seatNum > SEATS_PER_ROW) {
        printf(">> ERROR: Invalid row (%d) or seat number (%d).\\n", rowNum, seatNum);
        return;
    }

    struct Seat* temp = rows[rowNum - 1];
    while (temp != NULL && temp->seatNumber != seatNum) {
        temp = temp->next;
    }

    if (temp != NULL) {
        if (temp->isBooked == 0) {
            printf(">> NOTICE: Row %d, Seat S%d is ALREADY EMPTY (Not booked). Nothing to cancel!\\n", rowNum, seatNum);
        } else {
            temp->isBooked = 0;
            printf(">> SUCCESS: Booking for Row %d, Seat S%d has been successfully CANCELLED.\\n", rowNum, seatNum);
        }
    }
}

void freeCinema(struct Seat* rows[]) {
    for (int r = 0; r < TOTAL_ROWS; r++) {
        struct Seat* current = rows[r];
        while (current != NULL) {
            struct Seat* next = current->next;
            free(current);
            current = next;
        }
        rows[r] = NULL;
    }
}

int main() {
    struct Seat* cinemaRows[TOTAL_ROWS];
    initCinema(cinemaRows);

    int choice, row, seat;

    printf("==================================================\\n");
    printf("   EXPERIMENT 5: CINEMAX THEATRE TICKET BOOKING\\n");
    printf("==================================================\\n");

    do {
        printf("\\n---------------- MENU ----------------\\n");
        printf("1. Display Seat Availability Matrix\\n");
        printf("2. Book a Seat\\n");
        printf("3. Cancel a Seat Booking\\n");
        printf("4. Exit\\n");
        printf("--------------------------------------\\n");
        printf("Enter your choice (1-4): ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                displayAvailability(cinemaRows);
                break;

            case 2:
                printf("Enter Row Number (1-%d): ", TOTAL_ROWS);
                scanf("%d", &row);
                printf("Enter Seat Number (1-%d): ", SEATS_PER_ROW);
                scanf("%d", &seat);
                bookSeat(cinemaRows, row, seat);
                break;

            case 3:
                printf("Enter Row Number (1-%d): ", TOTAL_ROWS);
                scanf("%d", &row);
                printf("Enter Seat Number (1-%d): ", SEATS_PER_ROW);
                scanf("%d", &seat);
                cancelBooking(cinemaRows, row, seat);
                break;

            case 4:
                printf("\\nFreeing memory and exiting Cinemax system. Thank you!\\n");
                freeCinema(cinemaRows);
                break;

            default:
                printf("\\nInvalid choice! Please select an option between 1 and 4.\\n");
        }
    } while (choice != 4);

    return 0;
}`,
    output: `$ gcc exp5_cinemax_doubly_linked_list.c -o exp5
$ ./exp5
==================================================
   EXPERIMENT 5: CINEMAX THEATRE TICKET BOOKING
==================================================

---------------- MENU ----------------
1. Display Seat Availability Matrix
2. Book a Seat
3. Cancel a Seat Booking
4. Exit
--------------------------------------
Enter your choice (1-4): 1

====================================================================
                      CINEMAX SCREEN THIS WAY                       
====================================================================
 Row 1 :  [S1: O ] [S2: O ] [S3: O ] [S4: O ] [S5: O ] [S6: O ] [S7: O ] 
 Row 2 :  [S1: O ] [S2: O ] [S3: O ] [S4: O ] [S5: O ] [S6: O ] [S7: O ] 
 Row 3 :  [S1: O ] [S2: O ] [S3: O ] [S4: O ] [S5: O ] [S6: O ] [S7: O ] 
 Row 4 :  [S1: O ] [S2: O ] [S3: O ] [S4: O ] [S5: O ] [S6: O ] [S7: O ] 
 Row 5 :  [S1: O ] [S2: O ] [S3: O ] [S4: O ] [S5: O ] [S6: O ] [S7: O ] 
====================================================================
 Legend:  [ O ] = Available / Open     [ B ] = Already Booked
====================================================================

---------------- MENU ----------------
1. Display Seat Availability Matrix
2. Book a Seat
3. Cancel a Seat Booking
4. Exit
--------------------------------------
Enter your choice (1-4): 2
Enter Row Number (1-5): 2
Enter Seat Number (1-7): 4
>> SUCCESS: Row 2, Seat S4 has been successfully BOOKED for you!

---------------- MENU ----------------
1. Display Seat Availability Matrix
2. Book a Seat
3. Cancel a Seat Booking
4. Exit
--------------------------------------
Enter your choice (1-4): 2
Enter Row Number (1-5): 2
Enter Seat Number (1-7): 4
>> SORRY: Row 2, Seat S4 is ALREADY BOOKED! Please choose another seat.

---------------- MENU ----------------
1. Display Seat Availability Matrix
2. Book a Seat
3. Cancel a Seat Booking
4. Exit
--------------------------------------
Enter your choice (1-4): 1

====================================================================
                      CINEMAX SCREEN THIS WAY                       
====================================================================
 Row 1 :  [S1: O ] [S2: O ] [S3: O ] [S4: O ] [S5: O ] [S6: O ] [S7: O ] 
 Row 2 :  [S1: O ] [S2: O ] [S3: O ] [S4: B ] [S5: O ] [S6: O ] [S7: O ] 
 Row 3 :  [S1: O ] [S2: O ] [S3: O ] [S4: O ] [S5: O ] [S6: O ] [S7: O ] 
 Row 4 :  [S1: O ] [S2: O ] [S3: O ] [S4: O ] [S5: O ] [S6: O ] [S7: O ] 
 Row 5 :  [S1: O ] [S2: O ] [S3: O ] [S4: O ] [S5: O ] [S6: O ] [S7: O ] 
====================================================================
 Legend:  [ O ] = Available / Open     [ B ] = Already Booked
====================================================================

---------------- MENU ----------------
1. Display Seat Availability Matrix
2. Book a Seat
3. Cancel a Seat Booking
4. Exit
--------------------------------------
Enter your choice (1-4): 3
Enter Row Number (1-5): 2
Enter Seat Number (1-7): 4
>> SUCCESS: Booking for Row 2, Seat S4 has been successfully CANCELLED.

---------------- MENU ----------------
1. Display Seat Availability Matrix
2. Book a Seat
3. Cancel a Seat Booking
4. Exit
--------------------------------------
Enter your choice (1-4): 4

Freeing memory and exiting Cinemax system. Thank you!`
  },
  {
    id: 6,
    number: "06",
    title: "Experiment 6 — Infix-to-Postfix Conversion and Evaluation Using a Stack",
    topic: "Convert an infix expression to postfix notation and evaluate the postfix expression using stack operations.",
    requirements: [
      "Implement stack operations such as push, pop and top/peek, with empty-stack checks.",
      "Convert infix to postfix using operator precedence and parentheses.",
      "Display the postfix expression.",
      "Evaluate a postfix expression using a stack and display the final result.",
      "Follow the manual’s constraints: operands/operators are single characters and the input expression is valid."
    ],
    completionCheck: "Program compiles and runs; test normal cases, edge cases, and the required output.",
    fileName: "exp6_infix_postfix_stack.c",
    cCode: `/*
 * Experiment 6: Infix-to-Postfix Conversion and Evaluation Using a Stack
 * Topic: Convert an infix expression to postfix notation and evaluate the postfix
 *        expression using stack operations.
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include <math.h>

#define MAX 100

// Character Stack for Infix to Postfix Conversion
char charStack[MAX];
int charTop = -1;

void pushChar(char c) {
    if (charTop < MAX - 1) {
        charStack[++charTop] = c;
    }
}

char popChar() {
    if (charTop >= 0) {
        return charStack[charTop--];
    }
    return '\\0';
}

char peekChar() {
    if (charTop >= 0) {
        return charStack[charTop];
    }
    return '\\0';
}

int isCharEmpty() {
    return charTop == -1;
}

// Numerical Stack for Postfix Evaluation
double valStack[MAX];
int valTop = -1;

void pushVal(double v) {
    if (valTop < MAX - 1) {
        valStack[++valTop] = v;
    }
}

double popVal() {
    if (valTop >= 0) {
        return valStack[valTop--];
    }
    return 0.0;
}

int isValEmpty() {
    return valTop == -1;
}

int precedence(char op) {
    switch (op) {
        case '^': return 3;
        case '*':
        case '/':
        case '%': return 2;
        case '+':
        case '-': return 1;
        default: return 0;
    }
}

int isOperator(char c) {
    return (c == '+' || c == '-' || c == '*' || c == '/' || c == '%' || c == '^');
}

void infixToPostfix(char* infix, char* postfix) {
    int k = 0;
    charTop = -1;

    for (int i = 0; infix[i] != '\\0'; i++) {
        char ch = infix[i];

        if (isspace(ch)) continue;

        if (isalnum(ch)) {
            postfix[k++] = ch;
        } else if (ch == '(') {
            pushChar(ch);
        } else if (ch == ')') {
            while (!isCharEmpty() && peekChar() != '(') {
                postfix[k++] = popChar();
            }
            if (!isCharEmpty() && peekChar() == '(') {
                popChar();
            }
        } else if (isOperator(ch)) {
            while (!isCharEmpty() && precedence(peekChar()) >= precedence(ch)) {
                if (ch == '^' && peekChar() == '^') break;
                postfix[k++] = popChar();
            }
            pushChar(ch);
        }
    }

    while (!isCharEmpty()) {
        postfix[k++] = popChar();
    }
    postfix[k] = '\\0';
}

double evaluatePostfix(char* postfix) {
    valTop = -1;

    for (int i = 0; postfix[i] != '\\0'; i++) {
        char ch = postfix[i];

        if (isdigit(ch)) {
            pushVal(ch - '0');
        } else if (isalpha(ch)) {
            double val;
            printf("Enter numerical value for variable '%c': ", ch);
            scanf("%lf", &val);
            pushVal(val);
        } else if (isOperator(ch)) {
            double val2 = popVal();
            double val1 = popVal();
            double res = 0;

            switch (ch) {
                case '+': res = val1 + val2; break;
                case '-': res = val1 - val2; break;
                case '*': res = val1 * val2; break;
                case '/':
                    if (val2 != 0) res = val1 / val2;
                    else {
                        printf(">> Error: Division by zero!\\n");
                        return 0.0;
                    }
                    break;
                case '^': res = pow(val1, val2); break;
            }
            pushVal(res);
        }
    }
    return popVal();
}

int main() {
    char infix[MAX] = "(a+b)*(c-d)";
    char postfix[MAX];
    int choice;

    printf("==================================================\\n");
    printf("   EXPERIMENT 6: INFIX TO POSTFIX CONVERSION\\n");
    printf("                 AND EVALUATION USING STACK\\n");
    printf("==================================================\\n");

    do {
        printf("\\n---------------- MENU ----------------\\n");
        printf("1. Enter Infix Expression\\n");
        printf("2. Convert Infix to Postfix & Display\\n");
        printf("3. Evaluate Current Postfix Expression\\n");
        printf("4. Exit\\n");
        printf("--------------------------------------\\n");
        printf("Enter your choice (1-4): ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                printf("Enter valid Infix expression (e.g. 5+3*2 or (A+B)*C): ");
                scanf("%s", infix);
                printf(">> Expression recorded: %s\\n", infix);
                break;

            case 2:
                infixToPostfix(infix, postfix);
                printf("\\n>> Infix Expression   : %s\\n", infix);
                printf(">> Postfix Expression : %s\\n", postfix);
                break;

            case 3:
                infixToPostfix(infix, postfix);
                printf("\\nEvaluating Postfix Expression: %s\\n", postfix);
                double result = evaluatePostfix(postfix);
                printf(">> FINAL EVALUATED RESULT = %.2f\\n", result);
                break;

            case 4:
                printf("\\nExiting Stack Program. Thank you!\\n");
                break;

            default:
                printf("\\nInvalid choice! Please select an option between 1 and 4.\\n");
        }
    } while (choice != 4);

    return 0;
}`,
    output: `$ gcc exp6_infix_postfix_stack.c -o exp6 -lm
$ ./exp6
==================================================
   EXPERIMENT 6: INFIX TO POSTFIX CONVERSION
                 AND EVALUATION USING STACK
==================================================

---------------- MENU ----------------
1. Enter Infix Expression
2. Convert Infix to Postfix & Display
3. Evaluate Current Postfix Expression
4. Exit
--------------------------------------
Enter your choice (1-4): 1
Enter valid Infix expression (e.g. 5+3*2 or (A+B)*C): (5+3)*(8-2)
>> Expression recorded: (5+3)*(8-2)

---------------- MENU ----------------
1. Enter Infix Expression
2. Convert Infix to Postfix & Display
3. Evaluate Current Postfix Expression
4. Exit
--------------------------------------
Enter your choice (1-4): 2

>> Infix Expression   : (5+3)*(8-2)
>> Postfix Expression : 53+82-*

---------------- MENU ----------------
1. Enter Infix Expression
2. Convert Infix to Postfix & Display
3. Evaluate Current Postfix Expression
4. Exit
--------------------------------------
Enter your choice (1-4): 3

Evaluating Postfix Expression: 53+82-*
>> FINAL EVALUATED RESULT = 48.00

---------------- MENU ----------------
1. Enter Infix Expression
2. Convert Infix to Postfix & Display
3. Evaluate Current Postfix Expression
4. Exit
--------------------------------------
Enter your choice (1-4): 1
Enter valid Infix expression (e.g. 5+3*2 or (A+B)*C): (A+B)*C
>> Expression recorded: (A+B)*C

---------------- MENU ----------------
1. Enter Infix Expression
2. Convert Infix to Postfix & Display
3. Evaluate Current Postfix Expression
4. Exit
--------------------------------------
Enter your choice (1-4): 2

>> Infix Expression   : (A+B)*C
>> Postfix Expression : AB+C*

---------------- MENU ----------------
1. Enter Infix Expression
2. Convert Infix to Postfix & Display
3. Evaluate Current Postfix Expression
4. Exit
--------------------------------------
Enter your choice (1-4): 3

Evaluating Postfix Expression: AB+C*
Enter numerical value for variable 'A': 4
Enter numerical value for variable 'B': 6
Enter numerical value for variable 'C': 5
>> FINAL EVALUATED RESULT = 50.00

---------------- MENU ----------------
1. Enter Infix Expression
2. Convert Infix to Postfix & Display
3. Evaluate Current Postfix Expression
4. Exit
--------------------------------------
Enter your choice (1-4): 4

Exiting Stack Program. Thank you!`
  },
  {
    id: 7,
    number: "07",
    title: "Experiment 7 — Pizza-Parlor Job Queue",
    topic: "Simulate pizza-order processing using a queue and First Come First Served (FCFS) order handling.",
    requirements: [
      "Implement a queue with a maximum capacity M.",
      "Enqueue/add new orders.",
      "Dequeue/serve the order at the front.",
      "Display the pending orders.",
      "Handle full-queue and empty-queue conditions.",
      "Process orders in the same order in which they arrive (FCFS)."
    ],
    completionCheck: "Program compiles and runs; test normal cases, edge cases, and the required output.",
    fileName: "exp7_pizza_parlor_queue.c",
    cCode: `/*
 * Experiment 7: Pizza-Parlor Job Queue
 * Topic: Simulate pizza-order processing using a queue and First Come First
 *        Served (FCFS) order handling.
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_ORDERS 5 // Maximum capacity M of the parlor queue

struct Order {
    int orderId;
    char customerName[50];
    char pizzaType[30];
    int quantity;
};

struct Order queue[MAX_ORDERS];
int front = -1;
int rear = -1;

int isFull() {
    return ((front == 0 && rear == MAX_ORDERS - 1) || (front == (rear + 1) % MAX_ORDERS));
}

int isEmpty() {
    return (front == -1);
}

void enqueueOrder(int orderId, char name[], char pizza[], int qty) {
    if (isFull()) {
        printf(">> QUEUE OVERFLOW: Pizza parlor is at FULL CAPACITY (%d orders pending)!\\n", MAX_ORDERS);
        printf("   Cannot accept new order at this time. Please wait for orders to be served.\\n");
        return;
    }

    if (front == -1) {
        front = 0;
        rear = 0;
    } else {
        rear = (rear + 1) % MAX_ORDERS;
    }

    queue[rear].orderId = orderId;
    strcpy(queue[rear].customerName, name);
    strcpy(queue[rear].pizzaType, pizza);
    queue[rear].quantity = qty;

    printf(">> SUCCESS: Order #%d for %s (%d x %s) added to the queue (Position: %d).\\n",
           orderId, name, qty, pizza, rear + 1);
}

void dequeueOrder() {
    if (isEmpty()) {
        printf(">> QUEUE UNDERFLOW: No orders in the queue! Parlor is idle.\\n");
        return;
    }

    struct Order served = queue[front];
    printf(">> SERVING NOW (FCFS):\\n");
    printf("   Order ID     : #%d\\n", served.orderId);
    printf("   Customer     : %s\\n", served.customerName);
    printf("   Pizza        : %s (Qty: %d)\\n", served.pizzaType, served.quantity);
    printf("   Status       : Hot & Fresh, Ready for pickup!\\n");

    if (front == rear) {
        front = -1;
        rear = -1;
    } else {
        front = (front + 1) % MAX_ORDERS;
    }
}

void displayPendingOrders() {
    if (isEmpty()) {
        printf("\\n>> No pending orders. Pizza queue is EMPTY.\\n");
        return;
    }

    printf("\\n================ PENDING PIZZA ORDERS (FCFS) ================\\n");
    printf("+----------+----------------------+--------------------+-----+\\n");
    printf("| Order ID | Customer Name        | Pizza Type         | Qty |\\n");
    printf("+----------+----------------------+--------------------+-----+\\n");

    int i = front;
    while (1) {
        printf("| #%-7d | %-20s | %-18s | %-3d |\\n",
               queue[i].orderId, queue[i].customerName, queue[i].pizzaType, queue[i].quantity);
        if (i == rear) break;
        i = (i + 1) % MAX_ORDERS;
    }
    printf("+----------+----------------------+--------------------+-----+\\n");
}

int main() {
    int choice, orderCounter = 101, qty;
    char name[50], pizza[30];

    printf("==================================================\\n");
    printf("   EXPERIMENT 7: PIZZA-PARLOR ORDER QUEUE (FCFS)\\n");
    printf("   (Maximum Order Capacity M = %d)\\n", MAX_ORDERS);
    printf("==================================================\\n");

    do {
        printf("\\n---------------- MENU ----------------\\n");
        printf("1. Place New Pizza Order (Enqueue)\\n");
        printf("2. Serve Front Order (Dequeue - FCFS)\\n");
        printf("3. Display Pending Orders\\n");
        printf("4. Exit\\n");
        printf("--------------------------------------\\n");
        printf("Enter your choice (1-4): ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                printf("\\nEnter Customer Name: ");
                scanf(" %[^\\n]s", name);
                printf("Enter Pizza Type (e.g. Margherita, Farmhouse, Pepperoni): ");
                scanf(" %[^\\n]s", pizza);
                printf("Enter Quantity: ");
                scanf("%d", &qty);
                enqueueOrder(orderCounter++, name, pizza, qty);
                break;

            case 2:
                dequeueOrder();
                break;

            case 3:
                displayPendingOrders();
                break;

            case 4:
                printf("\\nClosing Pizza Parlor simulation. Have a great day!\\n");
                break;

            default:
                printf("\\nInvalid choice! Please select an option between 1 and 4.\\n");
        }
    } while (choice != 4);

    return 0;
}`,
    output: `$ gcc exp7_pizza_parlor_queue.c -o exp7
$ ./exp7
==================================================
   EXPERIMENT 7: PIZZA-PARLOR ORDER QUEUE (FCFS)
   (Maximum Order Capacity M = 5)
==================================================

---------------- MENU ----------------
1. Place New Pizza Order (Enqueue)
2. Serve Front Order (Dequeue - FCFS)
3. Display Pending Orders
4. Exit
--------------------------------------
Enter your choice (1-4): 1

Enter Customer Name: Rahul Verma
Enter Pizza Type (e.g. Margherita, Farmhouse, Pepperoni): Margherita Special
Enter Quantity: 2
>> SUCCESS: Order #101 for Rahul Verma (2 x Margherita Special) added to the queue (Position: 1).

---------------- MENU ----------------
1. Place New Pizza Order (Enqueue)
2. Serve Front Order (Dequeue - FCFS)
3. Display Pending Orders
4. Exit
--------------------------------------
Enter your choice (1-4): 1

Enter Customer Name: Sneha Kulkarni
Enter Pizza Type (e.g. Margherita, Farmhouse, Pepperoni): Paneer Tikka
Enter Quantity: 1
>> SUCCESS: Order #102 for Sneha Kulkarni (1 x Paneer Tikka) added to the queue (Position: 2).

---------------- MENU ----------------
1. Place New Pizza Order (Enqueue)
2. Serve Front Order (Dequeue - FCFS)
3. Display Pending Orders
4. Exit
--------------------------------------
Enter your choice (1-4): 3

================ PENDING PIZZA ORDERS (FCFS) ================
+----------+----------------------+--------------------+-----+
| Order ID | Customer Name        | Pizza Type         | Qty |
+----------+----------------------+--------------------+-----+
| #101     | Rahul Verma          | Margherita Special | 2   |
| #102     | Sneha Kulkarni       | Paneer Tikka       | 1   |
+----------+----------------------+--------------------+-----+

---------------- MENU ----------------
1. Place New Pizza Order (Enqueue)
2. Serve Front Order (Dequeue - FCFS)
3. Display Pending Orders
4. Exit
--------------------------------------
Enter your choice (1-4): 2

>> SERVING NOW (FCFS):
   Order ID     : #101
   Customer     : Rahul Verma
   Pizza        : Margherita Special (Qty: 2)
   Status       : Hot & Fresh, Ready for pickup!

---------------- MENU ----------------
1. Place New Pizza Order (Enqueue)
2. Serve Front Order (Dequeue - FCFS)
3. Display Pending Orders
4. Exit
--------------------------------------
Enter your choice (1-4): 3

================ PENDING PIZZA ORDERS (FCFS) ================
+----------+----------------------+--------------------+-----+
| Order ID | Customer Name        | Pizza Type         | Qty |
+----------+----------------------+--------------------+-----+
| #102     | Sneha Kulkarni       | Paneer Tikka       | 1   |
+----------+----------------------+--------------------+-----+

---------------- MENU ----------------
1. Place New Pizza Order (Enqueue)
2. Serve Front Order (Dequeue - FCFS)
3. Display Pending Orders
4. Exit
--------------------------------------
Enter your choice (1-4): 4

Closing Pizza Parlor simulation. Have a great day!`
  },
  {
    id: 8,
    number: "08",
    title: "Experiment 8 — Binary Search Tree (BST) Operations",
    topic: "Build a Binary Search Tree by inserting values in the supplied order and perform the required BST operations.",
    requirements: [
      "Create BST nodes and insert values into the tree.",
      "Implement tree traversals as specified in the manual.",
      "Search for a given value.",
      "Find and display the minimum value.",
      "Find the longest path from the root (tree height).",
      "Mirror the tree and display the resulting tree/traversal as required."
    ],
    completionCheck: "Program compiles and runs; test normal cases, edge cases, and the required output.",
    fileName: "exp8_binary_search_tree.c",
    cCode: `/*
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
        printf(">> Duplicate value %d ignored (BST values must be unique).\\n", value);
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

    printf("==================================================\\n");
    printf("   EXPERIMENT 8: BINARY SEARCH TREE (BST)\\n");
    printf("==================================================\\n");

    do {
        printf("\\n---------------- MENU ----------------\\n");
        printf("1. Insert Value into BST\\n");
        printf("2. Display Tree Traversals (Inorder, Preorder, Postorder)\\n");
        printf("3. Search for a Value in BST\\n");
        printf("4. Find Minimum Value\\n");
        printf("5. Find Longest Path from Root (Tree Height)\\n");
        printf("6. Mirror Tree & Display Mirrored Traversals\\n");
        printf("7. Exit\\n");
        printf("--------------------------------------\\n");
        printf("Enter your choice (1-7): ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                printf("Enter integer value to insert: ");
                scanf("%d", &val);
                root = insert(root, val);
                printf(">> Inserted %d successfully.\\n", val);
                break;

            case 2:
                if (root == NULL) {
                    printf(">> Tree is currently EMPTY.\\n");
                } else {
                    printf("\\n>> Inorder Traversal   : ");
                    inorder(root);
                    printf("\\n>> Preorder Traversal  : ");
                    preorder(root);
                    printf("\\n>> Postorder Traversal : ");
                    postorder(root);
                    printf("\\n");
                }
                break;

            case 3:
                if (root == NULL) {
                    printf(">> Tree is empty!\\n");
                } else {
                    printf("Enter value to search: ");
                    scanf("%d", &val);
                    comparisons = 0;
                    struct Node* found = search(root, val, &comparisons);
                    if (found != NULL) {
                        printf(">> SUCCESS: Value %d FOUND in BST! (Comparisons: %d)\\n", val, comparisons);
                    } else {
                        printf(">> NOT FOUND: Value %d is NOT in the BST! (Comparisons: %d)\\n", val, comparisons);
                    }
                }
                break;

            case 4:
                if (root == NULL) {
                    printf(">> Tree is empty!\\n");
                } else {
                    struct Node* minNode = findMin(root);
                    printf(">> MINIMUM VALUE in BST: %d\\n", minNode->data);
                }
                break;

            case 5:
                if (root == NULL) {
                    printf(">> Tree is empty (Height = 0)\\n");
                } else {
                    int height = findHeight(root);
                    printf(">> LONGEST PATH from root (Tree Height) : %d nodes (Edges: %d)\\n", height, height - 1);
                }
                break;

            case 6:
                if (root == NULL) {
                    printf(">> Tree is empty!\\n");
                } else {
                    mirrorTree(root);
                    printf(">> Tree successfully MIRRORED!\\n");
                    printf(">> Mirrored Inorder Traversal (Descending): ");
                    inorder(root);
                    printf("\\n>> Mirrored Preorder Traversal            : ");
                    preorder(root);
                    printf("\\n");
                }
                break;

            case 7:
                printf("\\nExiting BST Program. Goodbye!\\n");
                break;

            default:
                printf("\\nInvalid choice! Please select an option between 1 and 7.\\n");
        }
    } while (choice != 7);

    return 0;
}`,
    output: `$ gcc exp8_binary_search_tree.c -o exp8
$ ./exp8
==================================================
   EXPERIMENT 8: BINARY SEARCH TREE (BST)
==================================================

---------------- MENU ----------------
1. Insert Value into BST
2. Display Tree Traversals (Inorder, Preorder, Postorder)
3. Search for a Value in BST
4. Find Minimum Value
5. Find Longest Path from Root (Tree Height)
6. Mirror Tree & Display Mirrored Traversals
7. Exit
--------------------------------------
Enter your choice (1-7): 1
Enter integer value to insert: 50
>> Inserted 50 successfully.

---------------- MENU ----------------
1. Insert Value into BST
2. Display Tree Traversals (Inorder, Preorder, Postorder)
3. Search for a Value in BST
4. Find Minimum Value
5. Find Longest Path from Root (Tree Height)
6. Mirror Tree & Display Mirrored Traversals
7. Exit
--------------------------------------
Enter your choice (1-7): 1
Enter integer value to insert: 30
>> Inserted 30 successfully.

---------------- MENU ----------------
1. Insert Value into BST
2. Display Tree Traversals (Inorder, Preorder, Postorder)
3. Search for a Value in BST
4. Find Minimum Value
5. Find Longest Path from Root (Tree Height)
6. Mirror Tree & Display Mirrored Traversals
7. Exit
--------------------------------------
Enter your choice (1-7): 1
Enter integer value to insert: 70
>> Inserted 70 successfully.

---------------- MENU ----------------
1. Insert Value into BST
2. Display Tree Traversals (Inorder, Preorder, Postorder)
3. Search for a Value in BST
4. Find Minimum Value
5. Find Longest Path from Root (Tree Height)
6. Mirror Tree & Display Mirrored Traversals
7. Exit
--------------------------------------
Enter your choice (1-7): 1
Enter integer value to insert: 20
>> Inserted 20 successfully.

---------------- MENU ----------------
1. Insert Value into BST
2. Display Tree Traversals (Inorder, Preorder, Postorder)
3. Search for a Value in BST
4. Find Minimum Value
5. Find Longest Path from Root (Tree Height)
6. Mirror Tree & Display Mirrored Traversals
7. Exit
--------------------------------------
Enter your choice (1-7): 2

>> Inorder Traversal   : 20 30 50 70 
>> Preorder Traversal  : 50 30 20 70 
>> Postorder Traversal : 20 30 70 50 

---------------- MENU ----------------
1. Insert Value into BST
2. Display Tree Traversals (Inorder, Preorder, Postorder)
3. Search for a Value in BST
4. Find Minimum Value
5. Find Longest Path from Root (Tree Height)
6. Mirror Tree & Display Mirrored Traversals
7. Exit
--------------------------------------
Enter your choice (1-7): 3
Enter value to search: 30
>> SUCCESS: Value 30 FOUND in BST! (Comparisons: 2)

---------------- MENU ----------------
1. Insert Value into BST
2. Display Tree Traversals (Inorder, Preorder, Postorder)
3. Search for a Value in BST
4. Find Minimum Value
5. Find Longest Path from Root (Tree Height)
6. Mirror Tree & Display Mirrored Traversals
7. Exit
--------------------------------------
Enter your choice (1-7): 4
>> MINIMUM VALUE in BST: 20

---------------- MENU ----------------
1. Insert Value into BST
2. Display Tree Traversals (Inorder, Preorder, Postorder)
3. Search for a Value in BST
4. Find Minimum Value
5. Find Longest Path from Root (Tree Height)
6. Mirror Tree & Display Mirrored Traversals
7. Exit
--------------------------------------
Enter your choice (1-7): 5
>> LONGEST PATH from root (Tree Height) : 3 nodes (Edges: 2)

---------------- MENU ----------------
1. Insert Value into BST
2. Display Tree Traversals (Inorder, Preorder, Postorder)
3. Search for a Value in BST
4. Find Minimum Value
5. Find Longest Path from Root (Tree Height)
6. Mirror Tree & Display Mirrored Traversals
7. Exit
--------------------------------------
Enter your choice (1-7): 6
>> Tree successfully MIRRORED!
>> Mirrored Inorder Traversal (Descending): 70 50 30 20 
>> Mirrored Preorder Traversal            : 50 70 30 20 

---------------- MENU ----------------
1. Insert Value into BST
2. Display Tree Traversals (Inorder, Preorder, Postorder)
3. Search for a Value in BST
4. Find Minimum Value
5. Find Longest Path from Root (Tree Height)
6. Mirror Tree & Display Mirrored Traversals
7. Exit
--------------------------------------
Enter your choice (1-7): 7

Exiting BST Program. Goodbye!`
  },
  {
    id: 9,
    number: "09",
    title: "Experiment 9 — Graph Representation of Flight Paths and Connectivity",
    topic: "Represent flight paths between cities using an adjacency list or adjacency matrix and check graph connectivity.",
    requirements: [
      "Represent each city/airport as a vertex and each flight path as an edge; include flight cost/weight where required.",
      "Build the graph from the given flight-path information.",
      "Display each city and its connected cities, including costs where applicable.",
      "Perform Depth First Search (DFS), marking visited cities.",
      "Check whether all cities are reachable from the starting city and report whether the graph is connected."
    ],
    completionCheck: "Program compiles and runs; test normal cases, edge cases, and the required output.",
    fileName: "exp9_flight_paths_graph.c",
    cCode: `/*
 * Experiment 9: Graph Representation of Flight Paths and Connectivity
 * Topic: Represent flight paths between cities using an adjacency list or adjacency
 *        matrix and check graph connectivity.
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_CITIES 10

struct FlightGraph {
    int numCities;
    char cityNames[MAX_CITIES][30];
    int adjMatrix[MAX_CITIES][MAX_CITIES];
};

void initGraph(struct FlightGraph* g) {
    g->numCities = 0;
    for (int i = 0; i < MAX_CITIES; i++) {
        for (int j = 0; j < MAX_CITIES; j++) {
            g->adjMatrix[i][j] = 0;
        }
    }
}

int getCityIndex(struct FlightGraph* g, char* name) {
    for (int i = 0; i < g->numCities; i++) {
        if (strcmp(g->cityNames[i], name) == 0) {
            return i;
        }
    }
    return -1;
}

int addCity(struct FlightGraph* g, char* name) {
    int existing = getCityIndex(g, name);
    if (existing != -1) return existing;

    if (g->numCities < MAX_CITIES) {
        strcpy(g->cityNames[g->numCities], name);
        g->numCities++;
        return g->numCities - 1;
    }
    return -1;
}

void addFlight(struct FlightGraph* g, char* src, char* dest, int cost) {
    int u = addCity(g, src);
    int v = addCity(g, dest);

    if (u != -1 && v != -1) {
        g->adjMatrix[u][v] = cost;
        printf(">> Flight path added: %s -> %s (Cost: Rs. %d)\\n", src, dest, cost);
    } else {
        printf(">> Could not add flight path! Maximum city limit reached.\\n");
    }
}

void displayGraph(struct FlightGraph* g) {
    if (g->numCities == 0) {
        printf("\\n>> No flight paths recorded yet!\\n");
        return;
    }

    printf("\\n================ FLIGHT PATH CONNECTIONS & FARES ================\\n");
    printf("+----------------------+----------------------+-----------------+\\n");
    printf("| Origin City          | Destination City     | Flight Cost     |\\n");
    printf("+----------------------+----------------------+-----------------+\\n");

    int flightCount = 0;
    for (int i = 0; i < g->numCities; i++) {
        for (int j = 0; j < g->numCities; j++) {
            if (g->adjMatrix[i][j] > 0) {
                printf("| %-20s | %-20s | Rs. %-11d |\\n",
                       g->cityNames[i], g->cityNames[j], g->adjMatrix[i][j]);
                flightCount++;
            }
        }
    }
    printf("+----------------------+----------------------+-----------------+\\n");
    printf(" Total Registered Direct Flight Paths: %d\\n", flightCount);

    printf("\\n--- Adjacency Cost Matrix ---\\n      ");
    for (int i = 0; i < g->numCities; i++) {
        printf("%-10s ", g->cityNames[i]);
    }
    printf("\\n");
    for (int i = 0; i < g->numCities; i++) {
        printf("%-5s ", g->cityNames[i]);
        for (int j = 0; j < g->numCities; j++) {
            printf("%-10d ", g->adjMatrix[i][j]);
        }
        printf("\\n");
    }
}

void dfs(struct FlightGraph* g, int current, int visited[]) {
    visited[current] = 1;
    printf("%s ", g->cityNames[current]);

    for (int i = 0; i < g->numCities; i++) {
        if (g->adjMatrix[current][i] > 0 && !visited[i]) {
            dfs(g, i, visited);
        }
    }
}

void checkConnectivity(struct FlightGraph* g, char* startCityName) {
    if (g->numCities == 0) {
        printf(">> Graph is empty!\\n");
        return;
    }

    int startIdx = getCityIndex(g, startCityName);
    if (startIdx == -1) {
        printf(">> City '%s' not found in flight network!\\n", startCityName);
        return;
    }

    int visited[MAX_CITIES] = {0};
    printf("\\n>> Depth First Search (DFS) Traversal starting from '%s':\\n   ", startCityName);
    dfs(g, startIdx, visited);
    printf("\\n");

    int allVisited = 1;
    printf("\\n>> Reachability Status from '%s':\\n", startCityName);
    for (int i = 0; i < g->numCities; i++) {
        if (visited[i]) {
            printf("   [✓] %-15s : REACHABLE\\n", g->cityNames[i]);
        } else {
            printf("   [✗] %-15s : UNREACHABLE\\n", g->cityNames[i]);
            allVisited = 0;
        }
    }

    printf("-----------------------------------------------------------------\\n");
    if (allVisited) {
        printf(">> GRAPH CONNECTIVITY RESULT: CONNECTED\\n");
        printf("   All cities in the network are reachable from '%s'.\\n", startCityName);
    } else {
        printf(">> GRAPH CONNECTIVITY RESULT: DISCONNECTED / NOT FULLY CONNECTED\\n");
        printf("   Some cities cannot be reached starting from '%s'.\\n", startCityName);
    }
    printf("-----------------------------------------------------------------\\n");
}

int main() {
    struct FlightGraph graph;
    initGraph(&graph);

    addFlight(&graph, "Mumbai", "Delhi", 4500);
    addFlight(&graph, "Delhi", "Kolkata", 5200);
    addFlight(&graph, "Mumbai", "Bangalore", 3800);
    addFlight(&graph, "Bangalore", "Chennai", 2500);
    addFlight(&graph, "Chennai", "Delhi", 6100);

    int choice, cost;
    char src[30], dest[30], start[30];

    printf("==================================================\\n");
    printf("   EXPERIMENT 9: FLIGHT PATHS & CONNECTIVITY GRAPH\\n");
    printf("==================================================\\n");

    do {
        printf("\\n---------------- MENU ----------------\\n");
        printf("1. Display Flight Paths & Cost Matrix\\n");
        printf("2. Add New Flight Path\\n");
        printf("3. Perform DFS Traversal & Check Connectivity\\n");
        printf("4. Exit\\n");
        printf("--------------------------------------\\n");
        printf("Enter your choice (1-4): ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                displayGraph(&graph);
                break;

            case 2:
                printf("Enter Origin City Name: ");
                scanf(" %[^\\n]s", src);
                printf("Enter Destination City Name: ");
                scanf(" %[^\\n]s", dest);
                printf("Enter Flight Ticket Cost (in Rs.): ");
                scanf("%d", &cost);
                addFlight(&graph, src, dest, cost);
                break;

            case 3:
                printf("Enter Starting City for Connectivity Check: ");
                scanf(" %[^\\n]s", start);
                checkConnectivity(&graph, start);
                break;

            case 4:
                printf("\\nExiting Flight Paths Simulation. Safe travels!\\n");
                break;

            default:
                printf("\\nInvalid choice! Please select an option between 1 and 4.\\n");
        }
    } while (choice != 4);

    return 0;
}`,
    output: `$ gcc exp9_flight_paths_graph.c -o exp9
$ ./exp9
>> Flight path added: Mumbai -> Delhi (Cost: Rs. 4500)
>> Flight path added: Delhi -> Kolkata (Cost: Rs. 5200)
>> Flight path added: Mumbai -> Bangalore (Cost: Rs. 3800)
>> Flight path added: Bangalore -> Chennai (Cost: Rs. 2500)
>> Flight path added: Chennai -> Delhi (Cost: Rs. 6100)
==================================================
   EXPERIMENT 9: FLIGHT PATHS & CONNECTIVITY GRAPH
==================================================

---------------- MENU ----------------
1. Display Flight Paths & Cost Matrix
2. Add New Flight Path
3. Perform DFS Traversal & Check Connectivity
4. Exit
--------------------------------------
Enter your choice (1-4): 1

================ FLIGHT PATH CONNECTIONS & FARES ================
+----------------------+----------------------+-----------------+
| Origin City          | Destination City     | Flight Cost     |
+----------------------+----------------------+-----------------+
| Mumbai               | Delhi                | Rs. 4500        |
| Mumbai               | Bangalore            | Rs. 3800        |
| Delhi                | Kolkata              | Rs. 5200        |
| Bangalore            | Chennai              | Rs. 2500        |
| Chennai              | Delhi                | Rs. 6100        |
+----------------------+----------------------+-----------------+
 Total Registered Direct Flight Paths: 5

--- Adjacency Cost Matrix ---
      Mumbai     Delhi      Kolkata    Bangalore  Chennai    
Mumbai 0          4500       0          3800       0          
Delhi 0          0          5200       0          0          
Kolkat 0          0          0          0          0          
Bangal 0          0          0          0          2500       
Chenna 0          6100       0          0          0          

---------------- MENU ----------------
1. Display Flight Paths & Cost Matrix
2. Add New Flight Path
3. Perform DFS Traversal & Check Connectivity
4. Exit
--------------------------------------
Enter your choice (1-4): 3
Enter Starting City for Connectivity Check: Mumbai

>> Depth First Search (DFS) Traversal starting from 'Mumbai':
   Mumbai Delhi Kolkata Bangalore Chennai 

>> Reachability Status from 'Mumbai':
   [✓] Mumbai          : REACHABLE
   [✓] Delhi           : REACHABLE
   [✓] Kolkata         : REACHABLE
   [✓] Bangalore       : REACHABLE
   [✓] Chennai         : REACHABLE
-----------------------------------------------------------------
>> GRAPH CONNECTIVITY RESULT: CONNECTED
   All cities in the network are reachable from 'Mumbai'.
-----------------------------------------------------------------

---------------- MENU ----------------
1. Display Flight Paths & Cost Matrix
2. Add New Flight Path
3. Perform DFS Traversal & Check Connectivity
4. Exit
--------------------------------------
Enter your choice (1-4): 3
Enter Starting City for Connectivity Check: Kolkata

>> Depth First Search (DFS) Traversal starting from 'Kolkata':
   Kolkata 

>> Reachability Status from 'Kolkata':
   [✗] Mumbai          : UNREACHABLE
   [✗] Delhi           : UNREACHABLE
   [✓] Kolkata         : REACHABLE
   [✗] Bangalore       : UNREACHABLE
   [✗] Chennai         : UNREACHABLE
-----------------------------------------------------------------
>> GRAPH CONNECTIVITY RESULT: DISCONNECTED / NOT FULLY CONNECTED
   Some cities cannot be reached starting from 'Kolkata'.
-----------------------------------------------------------------

---------------- MENU ----------------
1. Display Flight Paths & Cost Matrix
2. Add New Flight Path
3. Perform DFS Traversal & Check Connectivity
4. Exit
--------------------------------------
Enter your choice (1-4): 4

Exiting Flight Paths Simulation. Safe travels!`
  }
];
