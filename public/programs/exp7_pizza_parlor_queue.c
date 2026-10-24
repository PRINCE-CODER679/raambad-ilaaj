/*
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
        printf(">> QUEUE OVERFLOW: Pizza parlor is at FULL CAPACITY (%d orders pending)!\n", MAX_ORDERS);
        printf("   Cannot accept new order at this time. Please wait for orders to be served.\n");
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

    printf(">> SUCCESS: Order #%d for %s (%d x %s) added to the queue (Position: %d).\n",
           orderId, name, qty, pizza, rear + 1);
}

void dequeueOrder() {
    if (isEmpty()) {
        printf(">> QUEUE UNDERFLOW: No orders in the queue! Parlor is idle.\n");
        return;
    }

    struct Order served = queue[front];
    printf(">> SERVING NOW (FCFS):\n");
    printf("   Order ID     : #%d\n", served.orderId);
    printf("   Customer     : %s\n", served.customerName);
    printf("   Pizza        : %s (Qty: %d)\n", served.pizzaType, served.quantity);
    printf("   Status       : Hot & Fresh, Ready for pickup!\n");

    if (front == rear) {
        front = -1;
        rear = -1;
    } else {
        front = (front + 1) % MAX_ORDERS;
    }
}

void displayPendingOrders() {
    if (isEmpty()) {
        printf("\n>> No pending orders. Pizza queue is EMPTY.\n");
        return;
    }

    printf("\n================ PENDING PIZZA ORDERS (FCFS) ================\n");
    printf("+----------+----------------------+--------------------+-----+\n");
    printf("| Order ID | Customer Name        | Pizza Type         | Qty |\n");
    printf("+----------+----------------------+--------------------+-----+\n");

    int i = front;
    while (1) {
        printf("| #%-7d | %-20s | %-18s | %-3d |\n",
               queue[i].orderId, queue[i].customerName, queue[i].pizzaType, queue[i].quantity);
        if (i == rear) break;
        i = (i + 1) % MAX_ORDERS;
    }
    printf("+----------+----------------------+--------------------+-----+\n");
}

int main() {
    int choice, orderCounter = 101, qty;
    char name[50], pizza[30];

    printf("==================================================\n");
    printf("   EXPERIMENT 7: PIZZA-PARLOR ORDER QUEUE (FCFS)\n");
    printf("   (Maximum Order Capacity M = %d)\n", MAX_ORDERS);
    printf("==================================================\n");

    do {
        printf("\n---------------- MENU ----------------\n");
        printf("1. Place New Pizza Order (Enqueue)\n");
        printf("2. Serve Front Order (Dequeue - FCFS)\n");
        printf("3. Display Pending Orders\n");
        printf("4. Exit\n");
        printf("--------------------------------------\n");
        printf("Enter your choice (1-4): ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                printf("\nEnter Customer Name: ");
                scanf(" %[^\n]s", name);
                printf("Enter Pizza Type (e.g. Margherita, Farmhouse, Pepperoni): ");
                scanf(" %[^\n]s", pizza);
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
                printf("\nClosing Pizza Parlor simulation. Have a great day!\n");
                break;

            default:
                printf("\nInvalid choice! Please select an option between 1 and 4.\n");
        }
    } while (choice != 4);

    return 0;
}
