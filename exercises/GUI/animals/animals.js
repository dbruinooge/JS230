document.addEventListener('DOMContentLoaded', () => {

  let timeoutId;

  document.addEventListener('mouseover', event => {
    if (!event.target.tagName === 'IMG') {
      return;
    }

    timeoutId = setTimeout(() => {
      const element = event.target.parentElement.querySelector('p');
      element.classList.remove('invisible');
      element.classList.add('visible');
    }, 2000);
  });

  document.addEventListener('mouseout', event => {
    if (!event.target.tagName === 'IMG') {
      return;
    }

    if (timeoutId) clearTimeout(timeoutId);
    const element = event.target.parentElement.querySelector('p');
    element.classList.remove('visible');
    element.classList.add('invisible');
  });
});