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


  [firstName, lastName, email, password, phoneNumber].forEach(input => {
    input.addEventListener('focus', event => {
      input.parentNode.querySelector('span.error').textContent = '';
    });
  });

  [firstName, lastName].forEach(name => {
    name.addEventListener('focusout', event => {
      const error = name.parentNode.querySelector('span.error');
      let prefix = name.id.split('_')[0];
      prefix = prefix[0].toUpperCase() + prefix.slice(1);
      if (name.validity.valid) {
        error.textContent = '';
        updateMainErrorMessage()
      } else if (name.validity.valueMissing) {
        error.textContent = `${prefix} name is required.`;
      }
    });
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
  })

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (event.target.checkValidity()) {
      console.log('everything ok here!')
    } else {
      document.querySelector('p.error').textContent = 'Fix errors before submitting this form.';
    }
  });

  function updateMainErrorMessage() {
    if (form.checkValidity()) {
      document.querySelector('p.error').textContent = '';
      console.log('everything fixed now!');
    }
  }

});