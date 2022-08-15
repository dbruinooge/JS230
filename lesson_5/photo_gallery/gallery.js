document.addEventListener('DOMContentLoaded', () => {

  const thumbnails = document.querySelector('ul');
  const photos = document.querySelectorAll('figure img');
  thumbnails.addEventListener('click', event => {
    event.preventDefault();
    photos.forEach(photo => photo.classList.remove('active'));
    const photoName = event.target.dataset.photo;
    document.querySelector(`[data-photo=${photoName}]`).classList.add('active');
    document.querySelector('figcaption').textContent = event.target.title;
    thumbnails.querySelectorAll('li img').forEach(thumbnail => thumbnail.classList.remove('selected'));
    event.target.classList.add('selected');
  });
});