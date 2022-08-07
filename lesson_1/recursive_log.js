let toggle = document.getElementById('toggle');
let hidden = document.getElementById('notice');


toggle.onclick = (e) => {
  e.preventDefault();
  e.currentTarget.onclick = e2 => {
    e2.preventDefault();
    e.currentTarget.setAttribute('class', 'hidden');
  };
  hidden.classList.toggle('hidden');
};
