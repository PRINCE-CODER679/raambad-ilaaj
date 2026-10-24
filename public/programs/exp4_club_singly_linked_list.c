/*
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
        printf("Memory allocation failed!\n");
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
    printf(">> SUCCESS: President '%s' (PRN: %d) appointed at the first position.\n", name, prn);
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
    printf(">> SUCCESS: Secretary '%s' (PRN: %d) appointed at the last position.\n", name, prn);
}

void addOrdinaryMember(struct Member** head, int prn, char name[]) {
    if (*head == NULL) {
        printf(">> NOTICE: No President exists yet. Please appoint a President first!\n");
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
    printf(">> SUCCESS: Member '%s' (PRN: %d) added to the club.\n", name, prn);
}

void deleteMember(struct Member** head, int prn) {
    if (*head == NULL) {
        printf(">> Club list is empty!\n");
        return;
    }

    if ((*head)->prn == prn) {
        printf(">> ACCESS DENIED: Cannot delete the President (%s) as an ordinary member!\n", (*head)->name);
        return;
    }

    struct Member* temp = *head;
    struct Member* prev = NULL;
    while (temp->next != NULL) {
        prev = temp;
        temp = temp->next;
    }

    if (temp->prn == prn) {
        printf(">> ACCESS DENIED: Cannot delete the Secretary (%s) as an ordinary member!\n", temp->name);
        return;
    }

    temp = (*head)->next;
    prev = *head;
    while (temp != NULL && temp->next != NULL) {
        if (temp->prn == prn) {
            prev->next = temp->next;
            printf(">> SUCCESS: Member '%s' (PRN: %d) has been deleted.\n", temp->name, temp->prn);
            free(temp);
            return;
        }
        prev = temp;
        temp = temp->next;
    }

    printf(">> NOT FOUND: Member with PRN %d does not exist in the club.\n", prn);
}

int displayAndCount(struct Member* head) {
    if (head == NULL) {
        printf("\n>> Club list is currently EMPTY.\n");
        return 0;
    }

    printf("\n================ CLUB MEMBERS LIST ================\n");
    int count = 0;
    struct Member* temp = head;

    while (temp != NULL) {
        count++;
        if (count == 1) {
            printf(" [PRESIDENT]  PRN: %-6d | Name: %s\n", temp->prn, temp->name);
        } else if (temp->next == NULL && count > 1) {
            printf(" [SECRETARY]  PRN: %-6d | Name: %s\n", temp->prn, temp->name);
        } else {
            printf(" [MEMBER %2d]  PRN: %-6d | Name: %s\n", count - 1, temp->prn, temp->name);
        }
        temp = temp->next;
    }
    printf("---------------------------------------------------\n");
    printf(" Total Registered Club Members: %d\n", count);
    printf("===================================================\n");
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
    printf(">> SUCCESS: Division lists concatenated successfully.\n");
}

int main() {
    struct Member* clubList = NULL;
    struct Member* divisionBList = NULL;
    int choice, prn;
    char name[50];

    printf("==================================================\n");
    printf("   EXPERIMENT 4: CLUB MEMBER MANAGEMENT SYSTEM\n");
    printf("==================================================\n");

    do {
        printf("\n---------------- MENU ----------------\n");
        printf("1. Add / Replace President (First Node)\n");
        printf("2. Add / Appoint Secretary (Last Node)\n");
        printf("3. Add Ordinary Member\n");
        printf("4. Delete Member by PRN\n");
        printf("5. Display Member List & Total Count\n");
        printf("6. Concatenate with Another Division List\n");
        printf("7. Exit\n");
        printf("--------------------------------------\n");
        printf("Enter your choice (1-7): ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                printf("Enter President PRN: ");
                scanf("%d", &prn);
                printf("Enter President Name: ");
                scanf(" %[^\n]s", name);
                addPresident(&clubList, prn, name);
                break;

            case 2:
                printf("Enter Secretary PRN: ");
                scanf("%d", &prn);
                printf("Enter Secretary Name: ");
                scanf(" %[^\n]s", name);
                addSecretary(&clubList, prn, name);
                break;

            case 3:
                printf("Enter Member PRN: ");
                scanf("%d", &prn);
                printf("Enter Member Name: ");
                scanf(" %[^\n]s", name);
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
                printf("\nCreating sample Division B list to concatenate...\n");
                divisionBList = createMember(201, "DivB_President");
                divisionBList->next = createMember(202, "DivB_Kavya");
                divisionBList->next->next = createMember(203, "DivB_Secretary");
                concatenateLists(&clubList, divisionBList);
                printf("Displaying combined list after concatenation:\n");
                displayAndCount(clubList);
                break;

            case 7:
                printf("\nExiting Club Management System. Goodbye!\n");
                break;

            default:
                printf("\nInvalid choice! Please select an option between 1 and 7.\n");
        }
    } while (choice != 7);

    return 0;
}
