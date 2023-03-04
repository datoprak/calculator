const numbers = document.querySelectorAll(".number");
const screen = document.querySelector(".screen");

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = (a, b, operand) => {
  switch (operand) {
    case "+":
      add(a, b);
      break;
    case "-":
      subtract(a, b);
      break;
    case "*":
      multiply(a, b);
      break;
    case "/":
      divide(a, b);
      break;
  }
};

const display = e => {
  if (screen.textContent === "0") {
    screen.textContent = e.target.textContent;
  } else {
    screen.textContent += e.target.textContent;
  }
};

numbers.forEach(number => {
  number.addEventListener("click", display);
});
