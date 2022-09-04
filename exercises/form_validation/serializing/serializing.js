document.addEventListener('DOMContentLoaded', () => {

  const form = document.querySelector('form');

  const firstName = document.querySelector('#first_name');
  const firstNameError = document.querySelector('#first_name + span.error');
  const lastName = document.querySelector('#last_name');
  const lastNameError = document.querySelector('#last_name + span.error');
  const email = document.querySelector('#email');
  const emailError = document.querySelector('#email + span.error');
  const password = document.querySelector('#password');
  const passwordError = document.querySelector('#password + span.error');
  const phoneNumber = document.querySelector('#phone_number');
  const phoneNumberError = document.querySelector('#phone_number + span.error');
  const creditCards = document.querySelectorAll('#credit_card input');
  const creditCardsError = document.querySelector('#credit_card span.error');


  [firstName, lastName, email, password, phoneNumber].forEach(input => {
    input.addEventListener('focus', event => {
      input.parentNode.querySelector('span.error').textContent = '';
    });
  });

  [firstName, lastName].forEach(name => {
    const error = name.parentNode.querySelector('span.error');
    const prefix = name.id.split('_')[0];
    const capPrefix = prefix[0].toUpperCase() + prefix.slice(1);
    name.addEventListener('focusout', event => {
      if (name.validity.valid) {
        error.textContent = '';
        updateMainErrorMessage();
      } else if (name.validity.valueMissing) {
        error.textContent = `${capPrefix} name is required.`;
      } else if (name.validity.patternMismatch) {
        error.textContent = `${capPrefix} contains invalid characters.`;
      }
    });

    name.addEventListener('keydown', event => {
      if (!event.key.match(/[a-zA-Z'\s]/)) {
        event.preventDefault();
        error.textContent = `Invalid character.`;
      } else {
        error.textContent = '';
        updateMainErrorMessage();
      }
    })
  });

  email.addEventListener('focusout', event => {
    if (email.validity.valid) {
      emailError.textContent = '';
      updateMainErrorMessage();
    } else {
      if (email.validity.valueMissing) {
        emailError.textContent = 'Email address is required.';
      } else if (email.validity.patternMismatch) {
        emailError.textContent = 'Entered value needs to be an email address.';
      }
    }
  });

  password.addEventListener('focusout', event => {
    if (password.validity.valid) {
      passwordError.textContent = '';
      updateMainErrorMessage();
    } else if (password.validity.valueMissing) {
      passwordError.textContent = 'Password is required.';
    } else if (password.validity.tooShort) {
      passwordError.textContent = 'Password must be at least 10 characters.';
    }
  });

  phoneNumber.addEventListener('focusout', event => {
    if (phoneNumber.validity.valid) {
      phoneNumberError.textContent = '';
      updateMainErrorMessage();
    } else if (phoneNumber.validity.patternMismatch) {
      phoneNumberError.textContent = 'Please enter a valid phone number in the format ###-###-####';
    }
  });

  creditCards.forEach(creditCard => {
    creditCard.addEventListener('keydown', event => {
      if (!event.key.match(/\d/)) {
        event.preventDefault();
      }
    });

    creditCard.addEventListener('focusout', event => {
      if (creditCard.validity.valid) {
        creditCardsError.textContent = '';
        updateMainErrorMessage();
      } else if (creditCard.validity.tooShort) {
        creditCardsError.textContent = 'Each credit card blank must have 4 digits.';
      }
    });

    creditCard.addEventListener('focus', event => {
      creditCardsError.textContent = '';
    });
  });

  [...creditCards].forEach((creditCard, idx) => {
    creditCard.addEventListener('input', event => {
      if (idx < 3 && creditCard.value.length === 4) {
        creditCards[idx + 1].focus();
      }
    });
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (event.target.checkValidity()) {
      submitForm();
    } else {
      document.querySelector('p.error').textContent = 'Fix errors before submitting this form.';
    }
  });

  function updateMainErrorMessage() {
    if (form.checkValidity()) {
      document.querySelector('p.error').textContent = '';
    }
  }

  function submitForm() {
    // const request = new XMLHttpRequest();
    // request.open('POST', '');
    // request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // request.addEventListener('load', event => {

    // });

    // request.send();
    let params = []

    const data = new FormData(form);
    params.push(`${encodeURIComponent('first_name')}=${encodeURIComponent(data.get('first_name'))}`);
    params.push(`${encodeURIComponent('last_name')}=${encodeURIComponent(data.get('last_name'))}`);
    params.push(`${encodeURIComponent('email')}=${encodeURIComponent(data.get('email'))}`);
    params.push(`${encodeURIComponent('password')}=${encodeURIComponent(data.get('password'))}`);
    if (data.get('phone_number')) {
      params.push(`${encodeURIComponent('phone_number')}=${encodeURIComponent(data.get('phone_number'))}`);
    }

    if (data.get('credit_card')) {
      params.push(`${encodeURIComponent('credit_card')}=${encodeURIComponent(data.getAll('credit_card').join(''))}`);
    }

    params = '?' + params.join('&');
    document.querySelector('#serialized_form').textContent = params;

  }

});