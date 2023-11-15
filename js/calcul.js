
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
    if (Number(b)===0) {
        clearAll();
        displayZone.textContent = "Can't div by 0";
    } else {
        let equal = Number(a)/Number(b);
        return roundNumber(equal);
    }
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
const decimalButton = document.querySelector('.decimal-button');
const delButton = document.querySelector('.backspace-button');

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

// Event trigger for decimal click
decimalButton.addEventListener('click', decimalClickEvent)

// Event trigger for clear click
clearButton.addEventListener('click', clearClickEvent)

// Event trigger for del click
delButton.addEventListener('click', delClickEvent)

// Event for decimal click
function decimalClickEvent (e) {
    decimalButton.disabled = true;
    numberClickEvent(e);
}

// Event for operator click
function operatorClickEvent (e) {
    if (!operator) {
        operator = e.target.value;
        decimalButton.disabled = false;
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
    clearAll();
    displayZone.textContent = "";
    decimalButton.disabled = false;
}

function clearAll() {
    a = "";
    b = "";
    operator = "";
    result = "";
}

// Event for del click
function delClickEvent (e) {
    if (!operator) {
        a = a.slice(0,-1);
        displayZone.textContent = a;
    } else {
        b = b.slice(0,-1);
        displayZone.textContent = b;
    }
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
        operator = newOperator;
        return;
    } else {
        result = operate(operator,a,b);
    };
    if (newOperator) {
        operator = newOperator;
    };
    a = result;
    b = "";
    decimalButton.disabled = false;
    displayZone.textContent = result;
}