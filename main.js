let num1 = "";
let num2 = "";
let operator = "";

let clear = document.querySelector("#clear");
let plusMinus = document.querySelector("#plus-minus");
let decimal = document.querySelector("#decimal");
let backspace = document.querySelector("#backspace");
let equal = document.querySelector("#equal");

let numbers = document.querySelectorAll(".number");
let operators = document.querySelectorAll(".operator");

let previousDisplay = document.querySelector(".previous");
let currentDisplay = document.querySelector(".current");

let defaultScreen = currentDisplay.textContent = "0";

clear.addEventListener("pointerdown", () => {
    num1 = "";
    num2 = ""
    currentDisplay.textContent = defaultScreen;
    previousDisplay.textContent = "";
});

backspace.addEventListener("pointerdown", () => {
    currentDisplay.textContent = currentDisplay.textContent.slice(0, -1);
    num1 = currentDisplay.textContent;
    num2 = currentDisplay.textContent;
    if (currentDisplay.textContent.length == 0) {
        currentDisplay.textContent = defaultScreen;
    }
});

numbers.forEach(number => getNumberValue(number));

function getNumberValue(key) {
    key.addEventListener("pointerdown", e => {
        num1 += e.target.textContent;
        currentDisplay.textContent = num1.substring(0, 11);
})}

function modulus(num1, num2) {
    return num1 % num2;
}

function divide(num1, num2) {
    return Math.round(((num1 / num2)+Number.EPSILON) * 1000) / 1000;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function add(num1, num2) {
    return num1 + num2;
}

function operate() {
}