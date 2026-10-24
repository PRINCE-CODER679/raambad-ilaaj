/*
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
        printf(">> Flight path added: %s -> %s (Cost: Rs. %d)\n", src, dest, cost);
    } else {
        printf(">> Could not add flight path! Maximum city limit reached.\n");
    }
}

void displayGraph(struct FlightGraph* g) {
    if (g->numCities == 0) {
        printf("\n>> No flight paths recorded yet!\n");
        return;
    }

    printf("\n================ FLIGHT PATH CONNECTIONS & FARES ================\n");
    printf("+----------------------+----------------------+-----------------+\n");
    printf("| Origin City          | Destination City     | Flight Cost     |\n");
    printf("+----------------------+----------------------+-----------------+\n");

    int flightCount = 0;
    for (int i = 0; i < g->numCities; i++) {
        for (int j = 0; j < g->numCities; j++) {
            if (g->adjMatrix[i][j] > 0) {
                printf("| %-20s | %-20s | Rs. %-11d |\n",
                       g->cityNames[i], g->cityNames[j], g->adjMatrix[i][j]);
                flightCount++;
            }
        }
    }
    printf("+----------------------+----------------------+-----------------+\n");
    printf(" Total Registered Direct Flight Paths: %d\n", flightCount);

    printf("\n--- Adjacency Cost Matrix ---\n      ");
    for (int i = 0; i < g->numCities; i++) {
        printf("%-10s ", g->cityNames[i]);
    }
    printf("\n");
    for (int i = 0; i < g->numCities; i++) {
        printf("%-5s ", g->cityNames[i]);
        for (int j = 0; j < g->numCities; j++) {
            printf("%-10d ", g->adjMatrix[i][j]);
        }
        printf("\n");
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
        printf(">> Graph is empty!\n");
        return;
    }

    int startIdx = getCityIndex(g, startCityName);
    if (startIdx == -1) {
        printf(">> City '%s' not found in flight network!\n", startCityName);
        return;
    }

    int visited[MAX_CITIES] = {0};
    printf("\n>> Depth First Search (DFS) Traversal starting from '%s':\n   ", startCityName);
    dfs(g, startIdx, visited);
    printf("\n");

    int allVisited = 1;
    printf("\n>> Reachability Status from '%s':\n", startCityName);
    for (int i = 0; i < g->numCities; i++) {
        if (visited[i]) {
            printf("   [✓] %-15s : REACHABLE\n", g->cityNames[i]);
        } else {
            printf("   [✗] %-15s : UNREACHABLE\n", g->cityNames[i]);
            allVisited = 0;
        }
    }

    printf("-----------------------------------------------------------------\n");
    if (allVisited) {
        printf(">> GRAPH CONNECTIVITY RESULT: CONNECTED\n");
        printf("   All cities in the network are reachable from '%s'.\n", startCityName);
    } else {
        printf(">> GRAPH CONNECTIVITY RESULT: DISCONNECTED / NOT FULLY CONNECTED\n");
        printf("   Some cities cannot be reached starting from '%s'.\n", startCityName);
    }
    printf("-----------------------------------------------------------------\n");
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

    printf("==================================================\n");
    printf("   EXPERIMENT 9: FLIGHT PATHS & CONNECTIVITY GRAPH\n");
    printf("==================================================\n");

    do {
        printf("\n---------------- MENU ----------------\n");
        printf("1. Display Flight Paths & Cost Matrix\n");
        printf("2. Add New Flight Path\n");
        printf("3. Perform DFS Traversal & Check Connectivity\n");
        printf("4. Exit\n");
        printf("--------------------------------------\n");
        printf("Enter your choice (1-4): ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                displayGraph(&graph);
                break;

            case 2:
                printf("Enter Origin City Name: ");
                scanf(" %[^\n]s", src);
                printf("Enter Destination City Name: ");
                scanf(" %[^\n]s", dest);
                printf("Enter Flight Ticket Cost (in Rs.): ");
                scanf("%d", &cost);
                addFlight(&graph, src, dest, cost);
                break;

            case 3:
                printf("Enter Starting City for Connectivity Check: ");
                scanf(" %[^\n]s", start);
                checkConnectivity(&graph, start);
                break;

            case 4:
                printf("\nExiting Flight Paths Simulation. Safe travels!\n");
                break;

            default:
                printf("\nInvalid choice! Please select an option between 1 and 4.\n");
        }
    } while (choice != 4);

    return 0;
}
