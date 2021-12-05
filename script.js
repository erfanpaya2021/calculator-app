// CALCULATOR CLASS
class Calculator {
    constructor(currentOperandTextElement, previousOperandTextElement) {
        this.currentOperandTextElement = currentOperandTextElement;
        this.previousOperandTextElement = previousOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === "." && this.currentOperand.includes(".")) return;
        this.currentOperand =
            this.currentOperand.toString() + number.toString();
    }

    chooseOperand(operation) {
        if (this.currentOperand === "") return;
        if (this.previousOperand !== "") {
            this.compute();
        }

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case "+":
                computation = prev + current;
                break;
            case "-":
                computation = prev - current;
                break;

            case "*":
                computation = prev * current;
                break;

            case "÷":
                computation = prev / current;
                break;
            default:
                break;
        }

        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = "";
    }

    getDisplayNumber(number) {
        const stringNumbers = number.toString();
        const integerDigits = parseFloat(stringNumbers.split(".")[0]);
        const decimalDigits = stringNumbers.split(".")[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = "";
        } else {
            integerDisplay = integerDigits.toLocaleString("en", {
                maximumFractionDigits: 0,
            });
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(
            this.currentOperand,
        );
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
                this.previousOperand,
            )} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = "";
        }
    }
}

// DOM VARIABLES
const numberButtons = document.querySelectorAll("[data-number]"),
    operationButtons = document.querySelectorAll("[data-operation]"),
    equalsButton = document.querySelector("[data-equals]"),
    deleteButton = document.querySelector("[data-delete]"),
    allClearButton = document.querySelector("[data-all-clear]"),
    currentOperandTextElement = document.querySelector(
        "[data-current-operand]",
    ),
    previousOperandTextElement = document.querySelector(
        "[data-previous-operand]",
    );

// VARIBALES
const calculator = new Calculator(
    currentOperandTextElement,
    previousOperandTextElement,
);

// EVENTS
numberButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        calculator.chooseOperand(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener("click", (e) => {
    calculator.compute();
    calculator.updateDisplay();
});

deleteButton.addEventListener("click", (e) => {
    calculator.delete();
    calculator.updateDisplay();
});

allClearButton.addEventListener("click", (e) => {
    calculator.clear();
    calculator.updateDisplay();
});
