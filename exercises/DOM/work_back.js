console.log(document.head.childNodes.length === 3);
console.log(document.head.children[0].tagName === 'TITLE');
console.log(document.head.textContent);
console.log(document.body.children.length === 3);
console.log(document.body.childNodes.length === 5);
console.log(document.querySelector('div').parentNode.parentNode.tagName === 'BODY');
console.log(document.querySelector('div section').children[2].nextElementSibling === null);
console.log(document.querySelectorAll('div').length === 1);
var nodeA = document.body.firstElementChild;
console.log(document.querySelector('footer').children.length === 1);
console.log(document.querySelector('body').replaceChild(document.querySelector('footer'), document.body.firstElementChild).tagName === 'HEADER');
console.log(document.body.appendChild(nodeA));
console.log(document.querySelector('section').textContent.split("\n").map(function(text) {
  return text.trim();
}).filter(function(text) {
  return text.length > 0;
}));
console.log(document.querySelector('section').children);
console.log(document.querySelector('section').textContent);
console.log(document.querySelector('span.emphasis').parentNode.tagName === 'FOOTER');
