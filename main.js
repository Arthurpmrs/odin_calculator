import { operationFactory } from "./jslib/calculator.js"

function itemsOnDisplay(displayContent) {
    displayContent = displayContent.trim();
    const sections = displayContent.split(" ");
    return sections.length;
}

function addToDisplay(display, content) {
    if (display.textContent === "0") {
        display.textContent = content;
    } else {
        display.textContent += content;
    }
}

function addAnsToDisplay(display, ans) {
    const sections = display.textContent.split(" ");
    sections[sections.length - 1] = ans;
    display.textContent = sections.join(" ");
}

function addOperationToDisplay(display, event, elements) {
    if (event.target.textContent === "-" && display.textContent === "0") {
        display.textContent = "-";
    } else if (event.target.textContent === "-" && 
               display.textContent[display.textContent.length - 1] === " ") {
        display.textContent += "-";
    } else if (itemsOnDisplay(display.textContent) == 2) {
        alert("Type a number value.");
    } else if (itemsOnDisplay(display.textContent) == 3) {
        const result = evaluateOperation(display);
        elements.setAnsValue(result);
        display.textContent += ` ${event.target.textContent} `;
    } else {
        display.textContent += ` ${event.target.textContent} `;
    }
}

function backOneCharacter(display) {
    let content = display.textContent;
    let lastChar = content[display.textContent.length - 1];
    
    if (content.length == 1) {
        display.textContent = "0";
    } else if (lastChar === " ") {
        display.textContent = display.textContent.substring(0, display.textContent.length - 3);
    } else {
        display.textContent = display.textContent.substring(0, display.textContent.length - 1);
    }
}

function evaluateOperation(display) {
    const content = display.textContent;

    if (itemsOnDisplay(content) < 3) {
        alert("Please, finish typing the expression!");
        return -1;
    }
    const sections = content.split(" ");
    const operand1 = Number(sections[0]);
    const symbol = sections[1];
    const operand2 = Number(sections[2]);
    
    if (operand1 == NaN || operand2 == NaN) {
        alert("Iligal operation!");
        display.textContent = "0";
        return -1;
    }
    
    const operationFunction = operationFactory(symbol);
    
    if (operationFactory) {
        const result = operationFunction(operand1, operand2);
        console.log(result)
        if (result || result === 0) {
            const rounded = result.toFixed(3);
            const integer = result.toFixed(0);
            if (result > integer) {
                return rounded;
            } else {
                return integer;
            }
        } else {
            alert("Iligal operation!");
            display.textContent = "0";
            return -1;
        }
    } else {
        alert("Something went wrong.");
        return -1;
    }
}

(function main() {
    const elements = {
        display: document.querySelector(".display"),
        numbers: document.querySelectorAll("button.number"),
        operations: document.querySelectorAll("button.operation"),
        clear: document.querySelector("#btn-clear"),
        back: document.querySelector("#btn-back"),
        ans: document.querySelector("#btn-ans"),
        dot: document.querySelector("#btn-dot"),
        res: document.querySelector("#btn-res"),
        ansValue: 0,
        setAnsValue(newValue) {
            if (newValue !== -1) {
                this.ansValue = newValue;
                this.display.textContent = this.ansValue;
            }
        },
        setup() {
            this.display.textContent = this.ansValue;

            this.numbers.forEach(number => {
                number.addEventListener("click", e => {
                    addToDisplay(this.display, e.target.textContent);
                })
            })

            this.dot.addEventListener("click", e => {
                addToDisplay(this.display, e.target.textContent);
            })

            this.operations.forEach(op => {
                op.addEventListener("click", e => {
                    addOperationToDisplay(this.display, e, this);
                })
            })

            this.back.addEventListener("click", e => {
                backOneCharacter(this.display, e);
            })

            this.res.addEventListener("click", e => {
                const result = evaluateOperation(this.display);
                this.setAnsValue(result);
            })

            this.ans.addEventListener("click", e => {
                addAnsToDisplay(this.display, this.ansValue);
            })

            this.clear.addEventListener("click", e => {
                this.display.textContent = "0";
                this.ansValue = 0;
            })
        }
    };

    elements.setup();
})()