let timeout;

document.querySelectorAll('img').forEach(img => {
  img.addEventListener('mouseenter', event => {
    event.stopPropagation();
    timeout = setTimeout(() => {
      event.target.closest('figure').querySelector('figcaption').className = 'show';
    }, 2000);
  });
});

document.querySelectorAll('img').forEach(img => {
  img.addEventListener('mouseleave', event => {
    event.stopPropagation();
    event.target.closest('figure').querySelector('figcaption').className = 'hide';
    clearTimeout(timeout);
  });
});
