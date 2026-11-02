/*
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
    printf("\n====================================================================\n");
    printf("                      CINEMAX SCREEN THIS WAY                       \n");
    printf("====================================================================\n");
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
        printf("\n");
    }
    printf("====================================================================\n");
    printf(" Legend:  [ O ] = Available / Open     [ B ] = Already Booked\n");
    printf("====================================================================\n");
}

void bookSeat(struct Seat* rows[], int rowNum, int seatNum) {
    if (rowNum < 1 || rowNum > TOTAL_ROWS || seatNum < 1 || seatNum > SEATS_PER_ROW) {
        printf(">> ERROR: Invalid row (%d) or seat number (%d). Please enter valid details!\n", rowNum, seatNum);
        return;
    }

    struct Seat* temp = rows[rowNum - 1];
    while (temp != NULL && temp->seatNumber != seatNum) {
        temp = temp->next;
    }

    if (temp != NULL) {
        if (temp->isBooked == 1) {
            printf(">> SORRY: Row %d, Seat S%d is ALREADY BOOKED! Please choose another seat.\n", rowNum, seatNum);
        } else {
            temp->isBooked = 1;
            printf(">> SUCCESS: Row %d, Seat S%d has been successfully BOOKED for you!\n", rowNum, seatNum);
        }
    }
}

void cancelBooking(struct Seat* rows[], int rowNum, int seatNum) {
    if (rowNum < 1 || rowNum > TOTAL_ROWS || seatNum < 1 || seatNum > SEATS_PER_ROW) {
        printf(">> ERROR: Invalid row (%d) or seat number (%d).\n", rowNum, seatNum);
        return;
    }

    struct Seat* temp = rows[rowNum - 1];
    while (temp != NULL && temp->seatNumber != seatNum) {
        temp = temp->next;
    }

    if (temp != NULL) {
        if (temp->isBooked == 0) {
            printf(">> NOTICE: Row %d, Seat S%d is ALREADY EMPTY (Not booked). Nothing to cancel!\n", rowNum, seatNum);
        } else {
            temp->isBooked = 0;
            printf(">> SUCCESS: Booking for Row %d, Seat S%d has been successfully CANCELLED.\n", rowNum, seatNum);
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

    printf("==================================================\n");
    printf("   EXPERIMENT 5: CINEMAX THEATRE TICKET BOOKING\n");
    printf("==================================================\n");

    do {
        printf("\n---------------- MENU ----------------\n");
        printf("1. Display Seat Availability Matrix\n");
        printf("2. Book a Seat\n");
        printf("3. Cancel a Seat Booking\n");
        printf("4. Exit\n");
        printf("--------------------------------------\n");
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
                printf("\nFreeing memory and exiting Cinemax system. Thank you!\n");
                freeCinema(cinemaRows);
                break;

            default:
                printf("\nInvalid choice! Please select an option between 1 and 4.\n");
        }
    } while (choice != 4);

    return 0;
}
