const languages = [
  {
    name: 'Ruby',
    description: 'Ruby is a dynamic, reflective, object-oriented, ' +
    'general-purpose programming language. It was designed and developed in the mid-1990s ' +
    'by Yukihiro Matsumoto in Japan. According to its creator, Ruby was influenced by Perl, ' +
    'Smalltalk, Eiffel, Ada, and Lisp. It supports multiple programming paradigms, ' +
    'including functional, object-oriented, and imperative. It also has a dynamic type ' +
    'system and automatic memory management.'
  },

  {
    name: 'JavaScript',
    description: 'JavaScript is a high-level, dynamic, untyped, and interpreted ' +
    'programming language. It has been standardized in the ECMAScript language ' +
    'specification. Alongside HTML and CSS, JavaScript is one of the three core ' +
    'technologies of World Wide Web content production; the majority of websites employ ' +
    'it, and all modern Web browsers support it without the need for plug-ins. JavaScript ' +
    'is prototype-based with first-class functions, making it a multi-paradigm language, ' +
    'supporting object-oriented, imperative, and functional programming styles.'
  },

  {
    name: 'Lisp',
    description: 'Lisp (historically, LISP) is a family of computer programming languages ' +
    'with a long history and a distinctive, fully parenthesized prefix notation. ' +
    'Originally specified in 1958, Lisp is the second-oldest high-level programming ' +
    'language in widespread use today. Only Fortran is older, by one year. Lisp has changed ' +
    'since its early days, and many dialects have existed over its history. Today, the best '+
    'known general-purpose Lisp dialects are Common Lisp and Scheme.'
  }
];

document.addEventListener('DOMContentLoaded', () => {

  const container = document.querySelector('#container');
  const languageTemplate = Handlebars.compile(document.querySelector('#language_template').innerHTML);
  container.innerHTML = languageTemplate({languages});

  document.querySelectorAll('.description').forEach(description => {
    description.textContent = description.textContent.slice(0, 120) + ' ...';
  });

  document.querySelectorAll('.show_more').forEach(button => button.addEventListener('click', showText));

  function showText(event) {
    event.preventDefault();
    const title = event.target.parentNode.querySelector('h1').textContent;
    const article = event.target.parentNode.querySelector('article');
    article.textContent = languages.find(language => language.name === title).description;
    const newButton = document.createElement('a');
    newButton.textContent = 'Show Less';
    newButton.href = '#';
    newButton.addEventListener('click', hideText);
    const oldButton = event.target;
    oldButton.parentNode.appendChild(newButton);
    oldButton.parentNode.removeChild(oldButton);
  }

  function hideText(event) {
    event.preventDefault();
    const article = event.target.parentNode.querySelector('article');
    article.textContent = article.textContent.slice(0, 120) + ' ...';
    const oldButton = event.target;
    const newButton = document.createElement('a');
    newButton.textContent = 'Show More';
    newButton.href = '#';
    newButton.addEventListener('click', showText);
    oldButton.parentNode.appendChild(newButton);
    oldButton.parentNode.removeChild(oldButton);
  }

});