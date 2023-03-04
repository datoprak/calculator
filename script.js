const numbers = document.querySelectorAll(".number");
const screen = document.querySelector(".screen");
const equalButton = document.querySelector(".equal");
const operands = document.querySelectorAll(".operand");
const clearButton = document.querySelector(".clear-button");
const floatButton = document.querySelector(".float");
const backspaceButton = document.querySelector(".backspace-button");

let firstInput;
let operand;
let secondInput;
let screenText;

const add = (a, b) => +a + +b;
const subtract = (a, b) => +a - +b;
const multiply = (a, b) => +a * +b;
const divide = (a, b) => {
  if (a === "0" || b === "0") {
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
    case "/":
      return divide(a, b);
  }
};

const display = e => {
  if (screen.textContent === "0" || !screenText) {
    screen.textContent = e.target.textContent;
  } else {
    screen.textContent += e.target.textContent;
  }
  screenText = screen.textContent;
};

const execute = e => {
  if (e.target.textContent === "=") {
    if (!firstInput) {
      screenText = null;
    } else {
      secondInput = screen.textContent;
      let ans = operate(firstInput, secondInput, operand);
      let roundedAns = round(ans, 5);
      screen.textContent = roundedAns;
      operand = null;
      screenText = null;
      firstInput = null;
      secondInput = null;
    }
  } else {
    if (!firstInput) {
      firstInput = screen.textContent;
      operand = e.target.textContent;
      screenText = null;
    } else {
      secondInput = screen.textContent;
      let ans = operate(firstInput, secondInput, operand);
      let roundedAns = round(ans, 5);
      screen.textContent = roundedAns;
      screenText = null;
      firstInput = roundedAns;
      operand = e.target.textContent;
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
  screen.textContent = "0";
};

const addFloat = () => {
  const point = [...screen.textContent].find(char => char === ".");
  if (!point) {
    screen.textContent += ".";
  }
};

const backspace = () => {
  if (screen.textContent.length === 1) {
    screen.textContent = "0";
  } else {
    screen.textContent = screen.textContent.substring(
      0,
      screen.textContent.length - 1
    );
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
