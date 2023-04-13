let firstNumber = "";
let secondNumber = "";
let operator = "";

let clear = document.querySelector("#clear");
let backspace = document.querySelector("#backspace");
let equal = document.querySelector("#equal");

let numbers = document.querySelectorAll(".number");
let operators = document.querySelectorAll(".operator");

let previousDisplay = document.querySelector(".previous");
let currentDisplay = document.querySelector(".current");

const defaultScreen = currentDisplay.textContent = "0";
let decimal = document.getElementById("decimal");

clear.addEventListener("pointerdown", () => {
    firstNumber = "";
    secondNumber = ""
    currentDisplay.textContent = defaultScreen;
    previousDisplay.textContent = "";
    decimal.value = ".";
});

backspace.addEventListener("pointerdown", () => {
    currentDisplay.textContent = currentDisplay.textContent.slice(0, -1);
    firstNumber = currentDisplay.textContent;
    secondNumber = currentDisplay.textContent;
    if (currentDisplay.textContent.length == 0) {
        currentDisplay.textContent = defaultScreen;
    }
});

numbers.forEach(number => updateDisplay(number));

function updateDisplay(arg) {
    if (arg) {
        arg.addEventListener("pointerdown", e => {
            if (firstNumber === "" && e.target.id === "decimal") {
                firstNumber = "0";
                currentDisplay.textContent = firstNumber;
            }
            else if (firstNumber === "-" && e.target.id === "decimal") {
                e.target.value = "";
            }
            else if (firstNumber.includes(".") && e.target.id === "decimal") {
                e.target.value = "";
            }
            else if (e.target.id === "decimal" && !firstNumber.includes(".")) {
                e.target.value = ".";
            }
            else if (e.target.id === "plus-minus" && !firstNumber.includes("-")) {
                firstNumber = "-" + firstNumber;
            }
            else if (firstNumber.includes("-") && e.target.id === "plus-minus") {
                firstNumber = firstNumber.slice(1);
            }
            else if (firstNumber === "-0" || firstNumber === "0") {
                firstNumber += ".";
            }
            
            firstNumber += e.target.value;
            currentDisplay.textContent = firstNumber.substring(0, 11);
        });
    }
}

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