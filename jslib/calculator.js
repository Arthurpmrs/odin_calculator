function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return false;
    }
    return a / b;
}

export function operationFactory(symbol) {
    switch (symbol) {
        case "+":
            return add;
        case "-":
            return subtract;
        case "x":
            return multiply;
        case "÷":
            return divide;
        default:
          return false;
      }
}