
// Operations functions
function add (a,b) {
    let equal = Number(a)+Number(b);
    return roundNumber(equal);
}
function subtract (a,b) {
    let equal = Number(a)-Number(b);
    return roundNumber(equal);
}
function multiply (a,b) {
    let equal = Number(a)*Number(b);
    return roundNumber(equal);
}
function divide (a,b) {
    let equal = Number(a)/Number(b);
    return roundNumber(equal);
}

// Number rounding function
function roundNumber (num) {
    return (Math.round((num + Number.EPSILON) * 1000000) / 1000000);
    //return (Number(num) % 1 != 0) ? num.toFixed(5) : num;
}

// Transform the typing in operating
function operate (operator, a, b) {
    if (operator === "+") {
        return add(a,b);
    } else if (operator === "-") {
        return subtract(a,b);
    } else if (operator === "*") {
        return multiply(a,b);
    } else if (operator === "/") {
        return divide(a,b);
    } else {
        return "ERROR";
    };
};

//Defining operating variables
let a;
let b;
let operator;
let result;

// Selecting buttons & display
const displayZone = document.querySelector('div.display');
const numberButtons = document.querySelectorAll('.number-button');
const operatorButtons = document.querySelectorAll('.operator-button');
const resultButton = document.querySelector('.result-button');
const clearButton = document.querySelector('.clear-button');

// Event trigger for number click
numberButtons.forEach((number) => {
    number.addEventListener('click', numberClickEvent)
});

// Event trigger for operator click
operatorButtons.forEach((operator) => {
    operator.addEventListener('click', operatorClickEvent)
});

// Event trigger for result click
resultButton.addEventListener('click', resultClickEvent)

// Event trigger for clear click
clearButton.addEventListener('click', clearClickEvent)

// Event for operator click
function operatorClickEvent (e) {
    if (!operator) {
        operator = e.target.value;
    } else {
        computeAndShowResult(e.target.value);
    }
}

// Event for number click
function numberClickEvent (e) {
    let val = e.target.value;
    if (!operator) {
        storeNumber("a",val);
        displayZone.textContent = a;
    } else {
        storeNumber("b",val);
        displayZone.textContent = b;
    }
};

// Event for result click
function resultClickEvent (e) {
    computeAndShowResult();
}

// Event for clear click
function clearClickEvent (e) {
    a = "";
    b = "";
    operator = "";
    result = "";
    displayZone.textContent = "";
}

// Store numbers
function storeNumber (aOrB,val) {
    if (aOrB === "a") {
        if (!a) {
            a = val;
        } else {
            a = a+val;
        }
    } else {
        if (!b) {
            b = val;
        } else {
            b = b+val;
        }
    };
}

function computeAndShowResult(newOperator) {
    if (!b) {
        result = a;
        displayZone.textContent = result;
        return;
    } else {
        result = operate(operator,a,b);
    };
    if (newOperator) {
        operator = newOperator;
        a = result;
        b = "";
    } else {
        a = "";
        b = "";
    };
    displayZone.textContent = result;
}