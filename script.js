const numbers = document.querySelectorAll(".number");
const screen = document.querySelector(".screen");
const equal = document.querySelector(".equal");
const operands = document.querySelectorAll(".operand");

let firstInput;
let operand;
let secondInput;
let screenText;

const add = (a, b) => +a + +b;
const subtract = (a, b) => +a - +b;
const multiply = (a, b) => +a * +b;
const divide = (a, b) => +a / +b;

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
    secondInput = screen.textContent;
    ans = operate(firstInput, secondInput, operand);
    screen.textContent = ans;
    operand = null;
    screenText = null;
  } else {
    if (!firstInput) {
      firstInput = screen.textContent;
      operand = e.target.textContent;
      screenText = null;
    } else {
      secondInput = screen.textContent;
      ans = operate(firstInput, secondInput, operand);
      screen.textContent = ans;
      screenText = null;
      firstInput = ans;
      operand = e.target.textContent;
    }
  }
};

numbers.forEach(number => {
  number.addEventListener("click", display);
});

operands.forEach(operand => {
  operand.addEventListener("click", execute);
});

equal.addEventListener("click", execute);
