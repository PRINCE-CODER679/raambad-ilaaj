/*
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
    return '\0';
}

char peekChar() {
    if (charTop >= 0) {
        return charStack[charTop];
    }
    return '\0';
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

    for (int i = 0; infix[i] != '\0'; i++) {
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
    postfix[k] = '\0';
}

double evaluatePostfix(char* postfix) {
    valTop = -1;

    for (int i = 0; postfix[i] != '\0'; i++) {
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
                        printf(">> Error: Division by zero!\n");
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

    printf("==================================================\n");
    printf("   EXPERIMENT 6: INFIX TO POSTFIX CONVERSION\n");
    printf("                 AND EVALUATION USING STACK\n");
    printf("==================================================\n");

    do {
        printf("\n---------------- MENU ----------------\n");
        printf("1. Enter Infix Expression\n");
        printf("2. Convert Infix to Postfix & Display\n");
        printf("3. Evaluate Current Postfix Expression\n");
        printf("4. Exit\n");
        printf("--------------------------------------\n");
        printf("Enter your choice (1-4): ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                printf("Enter valid Infix expression (e.g. 5+3*2 or (A+B)*C): ");
                scanf("%s", infix);
                printf(">> Expression recorded: %s\n", infix);
                break;

            case 2:
                infixToPostfix(infix, postfix);
                printf("\n>> Infix Expression   : %s\n", infix);
                printf(">> Postfix Expression : %s\n", postfix);
                break;

            case 3:
                infixToPostfix(infix, postfix);
                printf("\nEvaluating Postfix Expression: %s\n", postfix);
                double result = evaluatePostfix(postfix);
                printf(">> FINAL EVALUATED RESULT = %.2f\n", result);
                break;

            case 4:
                printf("\nExiting Stack Program. Thank you!\n");
                break;

            default:
                printf("\nInvalid choice! Please select an option between 1 and 4.\n");
        }
    } while (choice != 4);

    return 0;
}
