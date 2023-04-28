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
let result = "";

function modulus(a, b) {
    return a % b;
}

function divide(a, b) {
    return Math.round(((a / b)+Number.EPSILON) * 100) / 100;
}

function multiply(a, b) {
    return Math.round(((a * b)+Number.EPSILON) * 100) / 100;
}

function subtract(a, b) {
    return a - b;
}

function add(a, b) {
    return a + b;
}

clear.addEventListener("pointerdown", () => {
    firstNumber = "";
    secondNumber = ""
    initialDisplay = "";
    currentDisplay.textContent = defaultDisplay;
    previousDisplay.textContent = "";
    decimal.value = ".";
});

backspace.addEventListener("pointerdown", () => {
    currentDisplay.textContent = currentDisplay.textContent.slice(0, -1);
    initialDisplay = currentDisplay.textContent;
    if (currentDisplay.textContent.length == 0) {
        currentDisplay.textContent = defaultDisplay;
    }
    else if (previousDisplay.textContent.includes("=")) {
        previousDisplay.textContent = previousDisplay.textContent;
        currentDisplay.textContent = secondNumber;
    }
});

digits.forEach(digit => updateDisplay(digit));

function updateDisplay(arg) {
    if (arg) {
        arg.addEventListener("pointerdown", e => {
            if (initialDisplay === "" && e.target.id === "decimal") {
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
        if (currentDisplay.textContent == "-" || 
            currentDisplay.textContent.includes("-") && currentDisplay.textContent == 0 || 
            currentDisplay.textContent.at(-1) == ".") {
            previousDisplay.textContent = "";
        }
        else {
        operator = e.target.value;
        previousDisplay.textContent = currentDisplay.textContent + operator;
        initialDisplay = "";
        }
    });
}

equal.addEventListener("pointerdown", () => {

    operator = previousDisplay.textContent.at(-1);
    firstNumber = previousDisplay.textContent.slice(0, -1);
    secondNumber = currentDisplay.textContent;
    if (secondNumber == 0) {
        previousDisplay.textContent += secondNumber + "=";
        currentDisplay.textContent = "nice try"
    }
    else if (secondNumber !== "-") {
       if (operator == "%") {
        previousDisplay.textContent += secondNumber + "=";
        currentDisplay.textContent = modulus(firstNumber, secondNumber);
       }
       else if (operator == "÷") {
        previousDisplay.textContent += secondNumber + "=";
        currentDisplay.textContent = divide(firstNumber, secondNumber);
       }
       else if (operator == "×") {
        previousDisplay.textContent += secondNumber + "=";
        currentDisplay.textContent = multiply(firstNumber, secondNumber);
       }
       else if (operator == "+") {
        previousDisplay.textContent += secondNumber + "=";
        currentDisplay.textContent = add(firstNumber, secondNumber);
       }
       else if (operator == "-") {
        previousDisplay.textContent += secondNumber + "=";
        currentDisplay.textContent = subtract(firstNumber, secondNumber);
       }
   }
   console.log(firstNumber);
   console.log(operator);
   console.log(secondNumber);
   console.log(previousDisplay.textContent);
   console.log(currentDisplay.textContent);
});