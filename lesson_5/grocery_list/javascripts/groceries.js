document.addEventListener('DOMContentLoaded', () => {

  const nameInput = document.querySelector('#name');
  const quantityInput = document.querySelector('#quantity');
  const submitButton = document.querySelector('input[type=submit]');
  const groceryList = document.querySelector('#grocery-list');
  const form = document.querySelector('form');

  submitButton.addEventListener('click', event => {
    event.preventDefault();
    const name = nameInput.value;
    if (name) {
      const quantity = quantityInput.value || '1';
      const newItem = document.createElement('li');
      newItem.textContent = (quantity + ' ' + name).trim();
      groceryList.appendChild(newItem);
      form.reset();
    }
  });
});