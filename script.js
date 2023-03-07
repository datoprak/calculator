const numbers = document.querySelectorAll(".number");
const screen = document.querySelector(".screen");
const equalButton = document.querySelector(".equal");
const operands = document.querySelectorAll(".operand");
const clearButton = document.querySelector(".clear-button");
const floatButton = document.querySelector(".float");
const backspaceButton = document.querySelector(".backspace-button");
const body = document.querySelector("body");

let firstInput;
let operand;
let secondInput;
let screenText;

const add = (a, b) => +a + +b;
const subtract = (a, b) => +a - +b;
const multiply = (a, b) => +a * +b;
const divide = (a, b) => {
  if (b === "0") {
    return "ERROR";
  } else {
    return +a / +b;
  }
};

const operate = (a, b, operand) => {
  switch (operand) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "x":
      return multiply(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    case "÷":
      return divide(a, b);
  }
};

const display = e => {
  if (screen.textContent === "" || !screenText) {
    screen.textContent = e.target ? e.target.textContent : e;
  } else {
    screen.textContent += e.target ? e.target.textContent : e;
  }
  screenText = screen.textContent;
};

const execute = e => {
  if (e.target ? e.target.textContent === "=" : e === "Enter") {
    if (!firstInput) {
      screenText = null;
    } else {
      secondInput = screen.textContent;
      let ans = operate(firstInput, secondInput, operand);
      let roundedAns = round(ans, 15);
      screen.textContent = roundedAns;
      operand = null;
      screenText = null;
      firstInput = null;
      secondInput = null;
    }
  } else {
    if (!firstInput) {
      firstInput = screen.textContent;
      operand = e.target ? e.target.textContent : e;
      screenText = null;
    } else {
      secondInput = screen.textContent;
      let ans = operate(firstInput, secondInput, operand);
      let roundedAns = round(ans, 15);
      screen.textContent = roundedAns;
      screenText = null;
      firstInput = roundedAns.toString();
      operand = e.target ? e.target.textContent : e;
    }
  }
};

const round = (value, precision) => {
  if (typeof value === "number") {
    const multiplier = Math.pow(10, precision);
    return Math.round(value * multiplier) / multiplier;
  } else {
    return "ERROR";
  }
};

const clear = () => {
  firstInput = null;
  operand = null;
  secondInput = null;
  screenText = null;
  screen.textContent = "";
};

const addFloat = () => {
  const point = [...screen.textContent].find(char => char === ".");
  if (!point) {
    screen.textContent += "0.";
    screenText = "0.";
  }
};

const backspace = () => {
  if (screen.textContent.length === 1) {
    screen.textContent = "";
    screenText = null;
  } else {
    screen.textContent = screen.textContent.substring(
      0,
      screen.textContent.length - 1
    );
  }
};

const useKeyboard = e => {
  if (
    e.key === "0" ||
    e.key === "1" ||
    e.key === "2" ||
    e.key === "3" ||
    e.key === "4" ||
    e.key === "5" ||
    e.key === "6" ||
    e.key === "7" ||
    e.key === "8" ||
    e.key === "9"
  ) {
    display(e.key);
  } else if (
    e.key === "+" ||
    e.key === "-" ||
    e.key === "*" ||
    e.key === "/" ||
    e.key === "Enter"
  ) {
    e.preventDefault();
    execute(e.key);
  } else if (e.key === "Escape" || e.key === "Delete") {
    clear();
  } else if (e.key === "." || e.key === ",") {
    addFloat();
  } else if (e.key === "Backspace") {
    backspace();
  } else {
    e.preventDefault();
  }
};

numbers.forEach(number => {
  number.addEventListener("click", display);
});

operands.forEach(operand => {
  operand.addEventListener("click", execute);
});

equalButton.addEventListener("click", execute);

clearButton.addEventListener("click", clear);

floatButton.addEventListener("click", addFloat);

backspaceButton.addEventListener("click", backspace);

body.addEventListener("keydown", useKeyboard);
