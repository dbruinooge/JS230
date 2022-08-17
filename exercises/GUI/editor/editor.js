document.addEventListener('DOMContentLoaded', () => {

  const content = document.querySelector('#content');
  const bold = document.querySelector('#bold');
  const italics = document.querySelector('#italics');
  const underline = document.querySelector('#underline');
  const strikethrough = document.querySelector('#strikethrough');
  const orderedList = document.querySelector('#ordered_list');
  const unorderedList = document.querySelector('#unordered_list');
  const hyperlink = document.querySelector('#hyperlink');
  const justifyRight = document.querySelector('#justify_right');
  const justifyLeft = document.querySelector('#justify_left');
  const justifyCenter = document.querySelector('#justify_center');
  const justifyFully = document.querySelector('#justify_fully');

  bold.addEventListener('click', event => {
    event.preventDefault();
    document.execCommand('bold');
  });

  italics.addEventListener('click', event => {
    event.preventDefault();
    document.execCommand('italic');
  });

  underline.addEventListener('click', event => {
    event.preventDefault();
    document.execCommand('underline');
  });

  strikethrough.addEventListener('click', event => {
    event.preventDefault();
    document.execCommand('strikethrough');
  });

  hyperlink.addEventListener('click', event => {
    event.preventDefault();
    const link = window.prompt('Enter a link:');
    if (link) {
      document.execCommand('createLink', true, link);
    }
  });

  unorderedList.addEventListener('click', event => {
    event.preventDefault();
    document.execCommand('insertUnorderedList');
  });

  orderedList.addEventListener('click', event => {
    event.preventDefault();
    document.execCommand('insertOrderedList');
  });

  justifyRight.addEventListener('click', event => {
    event.preventDefault();
    document.execCommand('justifyRight');
  });

  justifyLeft.addEventListener('click', event => {
    event.preventDefault();
    document.execCommand('justifyLeft');
  });

  justifyCenter.addEventListener('click', event => {
    event.preventDefault();
    document.execCommand('justifyCenter');
  });

  justifyFully.addEventListener('click', event => {
    event.preventDefault();
    document.execCommand('justifyFull');
  });

});