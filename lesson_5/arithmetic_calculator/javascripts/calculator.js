document.addEventListener('DOMContentLoaded', () => {

  const submitButton = document.querySelector('input[type=submit]');
  const operatorInput = document.querySelector('#operator');
  const num1Input = document.querySelector('#first-number');
  const num2Input = document.querySelector('#second-number');
  const resultDisplay = document.querySelector('#result');

  submitButton.addEventListener('click', event => {
    event.preventDefault();
    const num1 = Number(num1Input.value);
    const num2 = Number(num2Input.value);
    let result;
    switch (operatorInput.value) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '*':
        result = num1 * num2;
        break;
      case '/':
        result = num1 / num2;
        break;
    }

    resultDisplay.textContent = result;
  });
});