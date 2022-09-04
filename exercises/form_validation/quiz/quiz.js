const questions = [
  {
    id: 1,
    description: "Who is the author of <cite>The Hitchhiker's Guide to the Galaxy</cite>?",
    options: ['Dan Simmons', 'Douglas Adams', 'Stephen Fry', 'Robert A. Heinlein'],
  },
  {
    id: 2,
    description: 'Which of the following numbers is the answer to Life, the \
                  Universe and Everything?',
    options: ['66', '13', '111', '42'],
  },
  {
    id: 3,
    description: 'What is Pan Galactic Gargle Blaster?',
    options: ['A drink', 'A machine', 'A creature', 'None of the above'],
  },
  {
    id: 4,
    description: 'Which star system does Ford Prefect belong to?',
    options: ['Aldebaran', 'Algol', 'Betelgeuse', 'Alpha Centauri'],
  },
];

const answerKey = { '1': 'Douglas Adams', '2': '42', '3': 'A drink', '4': 'Betelgeuse' };

document.addEventListener('DOMContentLoaded', () => {

  const questionTemplate = Handlebars.compile(document.querySelector('#question_template').innerHTML);
  const resultTemplate = Handlebars.compile(document.querySelector('#result_template').innerHTML);
  document.querySelector('#questions').innerHTML = questionTemplate({questions});

  const form = document.querySelector('form');
  const reset = document.querySelector('#reset_button');
  const submit = document.querySelector('#submit_button');
  const fieldsets = document.querySelectorAll('fieldset');

  reset.addEventListener('click', event => {
    event.preventDefault();
    form.reset();
    document.querySelectorAll('.result').forEach(result => result.innerHTML = '');
    enable(submit);
  });

  submit.addEventListener('click', event => {
    event.preventDefault();
    disable(submit);
    checkAllAnswers();
  });

  function checkAllAnswers() {
    fieldsets.forEach(fieldset => {
      const result = fieldset.querySelector('.result');
      const message = questionResult(fieldset);
      result.innerHTML = resultTemplate({message});
    });
  }

  function questionResult(fieldset) {
    const id = fieldset.querySelector('legend').id;
    let value;
    const checked = document.querySelector(`input[name=Q${id}]:checked`);
    if (checked) {
      value = checked.value;
    } else {
      return `You did not answer this question. Correct answer is: "${answerKey[id]}".`;
    }
    const correct = (value === answerKey[id]);
    if (correct) {
      return "Correct Answer";
    } else {
      return `Wrong Answer. The correct answer is: "${answerKey[id]}".`;
    }
  }

  function disable(element) {
    element.style.pointerEvents = "none";
    element.style.cursor = "default";
  }

  function enable(element) {
    element.style.pointerEvents = "auto";
    element.style.cursor = "pointer";
  }

});