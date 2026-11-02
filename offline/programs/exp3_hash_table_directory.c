/*
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
    for (int i = 0; phone[i] != '\0'; i++) {
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
    for (int i = 0; phone[i] != '\0'; i++) {
        sum += phone[i];
    }
    return PRIME - (sum % PRIME);
}

void initTable(struct Entry table[]) {
    for (int i = 0; i < TABLE_SIZE; i++) {
        table[i].isOccupied = 0;
        table[i].name[0] = '\0';
        table[i].phone[0] = '\0';
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
    printf("\n+-------+----------------------+-----------------+\n");
    printf("| Index | Name                 | Phone Number    |\n");
    printf("+-------+----------------------+-----------------+\n");
    for (int i = 0; i < TABLE_SIZE; i++) {
        if (table[i].isOccupied) {
            printf("| %-5d | %-20s | %-15s |\n", i, table[i].name, table[i].phone);
        } else {
            printf("| %-5d | --- (Empty) ---      | ---             |\n", i);
        }
    }
    printf("+-------+----------------------+-----------------+\n");
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

    printf("========================================================\n");
    printf("   EXPERIMENT 3: TELEPHONE DIRECTORY HASH TABLE\n");
    printf("   (Table Size: %d, Secondary Prime: %d)\n", TABLE_SIZE, PRIME);
    printf("========================================================\n");

    do {
        printf("\n---------------------- MENU ----------------------\n");
        printf("1. Insert Contact into Directory\n");
        printf("2. Search Contact & Compare Probe Counts\n");
        printf("3. Display Hash Tables for All 3 Techniques\n");
        printf("4. Exit\n");
        printf("--------------------------------------------------\n");
        printf("Enter your choice (1-4): ");
        scanf("%d", &choice);

        switch (choice) {
            case 1: {
                printf("\nEnter Contact Name: ");
                scanf(" %[^\n]s", name);
                printf("Enter Phone Number (digits): ");
                scanf("%s", phone);

                int pL, pQ, pD;
                int idxL = insertLinear(tableLinear, name, phone, &pL);
                int idxQ = insertQuadratic(tableQuadratic, name, phone, &pQ);
                int idxD = insertDoubleHash(tableDouble, name, phone, &pD);

                printf("\n>> INSERTION SUMMARY & PROBE COMPARISON:\n");
                if (idxL != -1)
                    printf("  - Linear Probing    : Inserted at index %d (Probes: %d)\n", idxL, pL);
                else
                    printf("  - Linear Probing    : Table Full!\n");

                if (idxQ != -1)
                    printf("  - Quadratic Probing : Inserted at index %d (Probes: %d)\n", idxQ, pQ);
                else
                    printf("  - Quadratic Probing : Table Full or resolution failed!\n");

                if (idxD != -1)
                    printf("  - Double Hashing    : Inserted at index %d (Probes: %d)\n", idxD, pD);
                else
                    printf("  - Double Hashing    : Table Full!\n");
                break;
            }

            case 2: {
                printf("\nEnter Phone Number to Search: ");
                scanf("%s", phone);

                int p1, p2, p3;
                int r1 = searchEntry(tableLinear, phone, 1, &p1);
                int r2 = searchEntry(tableQuadratic, phone, 2, &p2);
                int r3 = searchEntry(tableDouble, phone, 3, &p3);

                printf("\n>> SEARCH RESULTS & COMPARISON:\n");
                if (r1 != -1) {
                    printf("  - Found Name: %s\n", tableLinear[r1].name);
                    printf("  - Probes with Linear Probing    : %d (Index: %d)\n", p1, r1);
                    printf("  - Probes with Quadratic Probing : %d (Index: %d)\n", p2, r2);
                    printf("  - Probes with Double Hashing    : %d (Index: %d)\n", p3, r3);
                } else {
                    printf(">> NOT FOUND: Phone number %s is not present in the directory.\n", phone);
                    printf("  - Comparisons checked: Linear=%d, Quadratic=%d, Double=%d\n", p1, p2, p3);
                }
                break;
            }

            case 3:
                printf("\n--- 1. Linear Probing Hash Table ---");
                displayTable(tableLinear);
                printf("\n--- 2. Quadratic Probing Hash Table ---");
                displayTable(tableQuadratic);
                printf("\n--- 3. Double Hashing Table ---");
                displayTable(tableDouble);
                break;

            case 4:
                printf("\nExiting Telephone Directory. Thank you!\n");
                break;

            default:
                printf("\nInvalid choice! Please choose between 1 and 4.\n");
        }
    } while (choice != 4);

    return 0;
}
