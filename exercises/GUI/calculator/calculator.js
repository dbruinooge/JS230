const operationFuncs = {
  '+': function(a, b) {
    return a + b;
  },

  '-': function(a, b) {
    return a - b;
  },

  '*': function(a, b) {
    return a * b;
  },

  '/': function(a, b) {
    return a / b;
  },

  '%': function(a, b) {
    return a % b;
  },
};

const calculator = (() => {
  let operation = [];
  let entry = '0';
  let replaceNumber = true;

  return {
    displayOperation() {
      return operation.join(' ').slice(0, 40);
    },

    displayEntry() {
      return entry.slice(0, 19);
    },

    inputOperator(operator) {
      if (operation.length >= 2) {
        this.performOperation();
      } else {
        operation.push(entry);
      }
      operation.push(operator);
      replaceNumber = true;
    },

    inputNumber(number) {
      if (replaceNumber && number === '0') {
        entry = number;
      } else if (replaceNumber) {
        entry = number;
        replaceNumber = false;
      } else {
        entry += number;
      }
    },

    performOperation() {

      if (operation.length < 2) {
        return;
      }

      operation.push(entry);
      const operationCopy = operation.slice();
      let result = Number(operationCopy.shift());
      let operator;
      while (operationCopy.length > 0) {
        operator = operationCopy.shift();
        const number = Number(operationCopy.shift());
        result = operationFuncs[operator](result, number);
      }

      entry = String(result);
    },

    resetOperation() {
      operation = [];
      replaceNumber = true;
    },

    resetEntry() {
      entry = '0';
      replaceNumber = true;
    },

    switchSign() {
      entry = String(-Number(entry));
    },
  };
})();

document.addEventListener('DOMContentLoaded', () => {

  const NUMS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const OPERATORS = ['+', '-', '*', '/', '%'];
  const OPERATOR_NAMES = ['plus', 'minus', 'multiply', 'divide', 'modulo'];

  const entry = document.querySelector('#entry');
  const operation = document.querySelector('#operation');

  function updateDisplay() {
    entry.textContent = calculator.displayEntry();
    operation.textContent = calculator.displayOperation();
  }

  NUMS.forEach(num => {
    document.querySelector(`#${num}`).addEventListener('click', event => {
      event.preventDefault();
      calculator.inputNumber(String(NUMS.indexOf(num)));
      updateDisplay();
    });
  });

  OPERATOR_NAMES.forEach(operator => {
    document.querySelector(`#${operator}`).addEventListener('click', event => {
      event.preventDefault();
      calculator.inputOperator(event.target.textContent);
      updateDisplay();
    })
  });

  document.querySelector('#equals').addEventListener('click', event => {
    event.preventDefault();
    calculator.performOperation();
    entry.textContent = calculator.displayEntry();
    calculator.resetOperation();
    updateDisplay();
  });

  document.querySelector('#C').addEventListener('click', event => {
    event.preventDefault();
    calculator.resetEntry();
    updateDisplay();
  });

  document.querySelector('#CE').addEventListener('click', event => {
    event.preventDefault();
    calculator.resetEntry();
    calculator.resetOperation();
    updateDisplay();
  })

  document.querySelector('#NEG').addEventListener('click', event => {
    event.preventDefault();
    calculator.switchSign();
    updateDisplay();
  });

  document.querySelector('#dot').addEventListener('click', event => {
    event.preventDefault();
    calculator.inputNumber('.');
    updateDisplay();
  })

  updateDisplay();
});