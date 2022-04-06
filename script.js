const numberButtons = document.querySelectorAll("[data-number]")
const operatorButtons = document.querySelectorAll("[data-operator]")
const clearButton = document.querySelector("#clearBtn")
const equalButton = document.querySelector("#equalBtn")
const deleteButton = document.querySelector("#deleteBtn")
const pointButton = document.querySelector("#pointBtn")
const previousScreen = document.querySelector("#previousOperation")
const currentScreen = document.querySelector("#currentOperation")

let firstOperand = ""
let secondOperand = ""
let currentOperator = null
let shouldResetScreen = false

equalButton.addEventListener("click", evaluate)
clearButton.addEventListener("click", clickClear)
deleteButton.addEventListener("click", deleteNumber)
pointButton.addEventListener("click", addPoint)

numberButtons.forEach((button) => 
  button.addEventListener("click", () => clickNumber(button.textContent))
);

operatorButtons.forEach((button) => 
  button.addEventListener("click", () => clickOperator(button.textContent))
);

function clickNumber (number) {
  if (currentScreen.textContent === "0" || shouldResetScreen) 
    resetScreen()
  currentScreen.textContent += number
}

function resetScreen() {
  currentScreen.textContent = ""
  shouldResetScreen = false
}

function clickClear () {
  currentScreen.textContent = "0";
  previousScreen.textContent = "0";
  firstOperand = "";
  secondOperand = "";
  currentOperator = null;
}

function addPoint() {
  if (shouldResetScreen) resetScreen()
  if (currentScreen.textContent === "") 
    currentScreen.textContent = "0"
  if (currentScreen.textContent.includes(".")) return
  currentScreen.textContent += "."
}

function deleteNumber() {
  currentScreen.textContent = currentScreen.textContent
    .toString()
    .slice(0, -1)
}

function clickOperator (operator) {
  if (currentOperator !== null) evaluate()
  firstOperand = currentScreen.textContent
  currentOperator = operator
  previousScreen.textContent = `${firstOperand} ${currentOperator}`
  shouldResetScreen = true;
}

function evaluate() {
  if(currentOperator === null || shouldResetScreen) return
  if (currentOperator === "/" && currentScreen.textContent === "0") {
    alert("You cannot divide by 0!")
    return
  }
  secondOperand = currentScreen.textContent
  currentScreen.textContent = roundResult(
    operate(currentOperator, firstOperand, secondOperand)
  )
  previousScreen.textContent = `${firstOperand} ${currentOperator} ${secondOperand} =`
  currentOperator = null;
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000
};



function add(a, b) {
  return a + b
}

function subtract(a, b) {
  return a - b
}

function multiply(a, b) {
  return a * b
}

function divide(a, b) {
  return a / b
}

function operate(operator, a, b) {
  a = Number(a)
  b = Number(b)
  switch (operator) {
    case '+':
      return add(a, b)
    case '-':
      return subtract(a, b)
    case '*':
      return multiply(a, b)
    case '/':
      if (b === 0) return null
      else return divide(a, b)
    default:
      return null
  }
}
