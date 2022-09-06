const form = document.querySelector('form');
let formInvalid = false;

function setSpanMessage(inputElement, message) {
  const span = inputElement.parentNode.querySelector('.error');
  span.textContent = message;
}

function handleBlur(event) {
  if (formInvalid) {
    checkFormValidity();
  } else {
    event.target.checkValidity();
  }
}

function handleFocus(event) {
  setSpanMessage(event.target, '')
  event.target.classList.remove('invalid');
}

function handleInvalid(event) {
  const validity = event.target.validity;
  event.target.classList.add('invalid');
  let message;
  if (validity.patternMismatch) {
    if (event.target.id === 'phone') {
      message = 'Please enter the phone number in the following format: ###-###-####.';
    } else if (event.target.id === 'email') {
      message = 'Please enter a valid email address.'
    } else if (event.target.classList.contains('name')) {
      message = "Names may contain only letters, spaces, and apostrophes."
    }
  } else if (validity.tooShort) {
    if (event.target.id === 'password') {
      message = 'Password is too short (min 10 characters).'
    }
  } else if (validity.tooLong) {
    if (event.target.id === 'credit_card') {
      message = "Please enter no more than 4 numbers per entry."
    }
  }
    else if (validity.valueMissing) {
    message = 'This field is required.'
  }

  setSpanMessage(event.target, message);
}

function checkFormValidity() {
  if (!form.checkValidity()) {
    document.querySelector('p.error').textContent = "Please fix errors.";
    formInvalid = true;
    return false;
  } else {
    document.querySelector('p.error').textContent = "";
    formInvalid = false;
    return true;
  }
}

[...form.elements].forEach(element => {
  element.addEventListener('blur', handleBlur);
  element.addEventListener('invalid', handleInvalid);
  element.addEventListener('focus', handleFocus);
});

form.addEventListener('submit', event => {
  event.preventDefault();
  if (checkFormValidity()) alert('Form successfully submitted.');
});

[...document.getElementsByClassName('name')].forEach(element => {
  element.addEventListener('keypress', event => {
    if (!event.key.match(/[a-zA-Z'\s]/)) {
      event.preventDefault();
    }
  });
});

[...document.getElementsByClassName('credit_card')].forEach((element, idx) => {
  element.addEventListener('keypress', event => {
    if (!event.key.match(/\d/)) {
      event.preventDefault();
    }
  });
  if (idx <= 2) {
    element.addEventListener('input', event => {
      if (element.value.length === 4) {
        element.nextElementSibling.focus();
      }
    })
  }
});

document.querySelector('#phone').addEventListener('keypress', event => {
  if (!event.key.match(/[\d\-]/)) {
    event.preventDefault();
  }
});