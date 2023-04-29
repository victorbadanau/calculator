const clear = document.querySelector("#clear");
const backspace = document.querySelector("#backspace");
const equal = document.querySelector("#equal");
const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const plusMinus = document.querySelector("#plus-minus");
const decimal = document.querySelector("#decimal");

let previousDisplay = document.querySelector(".previous");
let currentDisplay = document.querySelector(".current");

const defaultDisplay = "0";
let initialDisplay = "";
currentDisplay.textContent = defaultDisplay;
let firstNumber = "";
let secondNumber = "";
let operator = "";

function modulus(a, b) {
    return Math.round(((a % b)+Number.EPSILON) * 100) / 100;
}

function divide(a, b) {
    return Math.round(((a / b)+Number.EPSILON) * 100) / 100;
}

function multiply(a, b) {
    return Math.round(((a * b)+Number.EPSILON) * 100) / 100;
}

function subtract(a, b) {
    return Math.round(((a - b)+Number.EPSILON) * 100) / 100;
}

function add(a, b) {
    return Math.round(((a + b)+Number.EPSILON) * 100) / 100;
}
function clearDisplay() {
    firstNumber = "";
    secondNumber = ""
    initialDisplay = "";
    currentDisplay.textContent = defaultDisplay;
    previousDisplay.textContent = "";
    decimal.value = ".";
}

clear.addEventListener("pointerdown", () => clearDisplay());

backspace.addEventListener("pointerdown", () => {
    if (previousDisplay.textContent.includes("=")) {
        return
    }
    else if (currentDisplay.textContent.length == 0) {
        currentDisplay.textContent = defaultDisplay;
    }
    currentDisplay.textContent = currentDisplay.textContent.slice(0, -1);
    initialDisplay = currentDisplay.textContent;
});

digits.forEach(digit => updateDisplay(digit));

function updateDisplay(arg) {
    if (arg) {
        arg.addEventListener("pointerdown", e => {
            if (previousDisplay.textContent.includes("=") && e.target.id === "decimal") {
                clearDisplay();
                initialDisplay = "0";
                currentDisplay.textContent = initialDisplay;
            }
            else if (previousDisplay.textContent.includes("=") && e.target.id === "plus-minus") {
                clearDisplay();
                initialDisplay = "-" + initialDisplay;
                currentDisplay.textContent = initialDisplay;
            }
            else if (previousDisplay.textContent.includes("=")) {
                clearDisplay();
            }
            else if (initialDisplay === "" && e.target.id === "decimal") {
                initialDisplay = "0";
                currentDisplay.textContent = initialDisplay;
            }
            else if (initialDisplay === "-" && e.target.id === "decimal") {
                e.target.value = "";
            }
            else if (initialDisplay.includes(".") && e.target.id === "decimal") {
                e.target.value = "";
            }
            else if (e.target.id === "decimal" && !initialDisplay.includes(".")) {
                e.target.value = ".";
            }
            else if (e.target.id === "plus-minus" && !initialDisplay.includes("-")) {
                initialDisplay = "-" + initialDisplay;
            }
            else if (initialDisplay.includes("-") && e.target.id === "plus-minus") {
                initialDisplay = initialDisplay.slice(1);
            }
            else if (initialDisplay === "-0" || initialDisplay === "0") {
                initialDisplay += ".";
            }
            
            initialDisplay += e.target.value;
            currentDisplay.textContent = initialDisplay;
        });
    }
}

operators.forEach(operator => getOperator(operator));

function getOperator(arg) {
    arg.addEventListener("pointerdown", e => {
        if (currentDisplay.textContent == "-" && !previousDisplay.textContent || 
            currentDisplay.textContent.includes("-") && currentDisplay.textContent == 0 && !previousDisplay.textContent || 
            currentDisplay.textContent.at(-1) == "." && !previousDisplay.textContent) {
            return
        }
        else if (previousDisplay.textContent.includes("=")) {
            previousDisplay.textContent = "";
            previousDisplay.textContent = currentDisplay.textContent + e.target.value;
            initialDisplay = "";
            currentDisplay.textContent = defaultDisplay;
        }
        else if (isNaN(previousDisplay.textContent)) {
            previousDisplay.textContent = previousDisplay.textContent.slice(0, -1) + e.target.value;
        }
        else {
        operator = e.target.value;
        previousDisplay.textContent = currentDisplay.textContent + operator;
        initialDisplay = "";
        currentDisplay.textContent = defaultDisplay;
        }
    });
}

function operate() {
    if (operator == "%") {
        currentDisplay.textContent = modulus(firstNumber, secondNumber);
    }
    else if (operator == "÷") {
        currentDisplay.textContent = divide(firstNumber, secondNumber);
    }
    else if (operator == "×") {
        currentDisplay.textContent = multiply(firstNumber, secondNumber);
    }
    else if (operator == "+") {
        currentDisplay.textContent = add(firstNumber, secondNumber);
    }
    else if (operator == "-") {
        currentDisplay.textContent = subtract(firstNumber, secondNumber);
    }
}

equal.addEventListener("pointerdown", () => {
    operator = previousDisplay.textContent.at(-1);
    firstNumber = Number(previousDisplay.textContent.slice(0, -1));
    secondNumber = Number(currentDisplay.textContent);
    if (isNaN(secondNumber) || previousDisplay.textContent.includes("=") || operator == null) {
        return
    }
    if (secondNumber == 0 && operator == "÷") {
        previousDisplay.textContent += secondNumber + "=";
        currentDisplay.textContent = "nice try"
    }
    else if (secondNumber < 0) {
        previousDisplay.textContent += `(${secondNumber})` + "=";
        operate();
    }
    else {
        previousDisplay.textContent += secondNumber + "=";
        operate();
   }
});