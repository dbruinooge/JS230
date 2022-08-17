const todos = [
  { id: 1, title: 'Homework' },
  { id: 2, title: 'Shopping' },
  { id: 3, title: 'Calling Mom' },
  { id: 4, title: 'Coffee with John '}
];

document.addEventListener('DOMContentLoaded', () => {

  const templates = {};
  document.querySelectorAll("[type='text/x-handlebars-template']").forEach(template => {
    const key = template.id.replace('_template', '');
    templates[key] = Handlebars.compile(template.innerHTML);
  });

  const todoList = document.querySelector('#todos');
  const contextMenu = document.querySelector('.context_menu');
  const overlay = document.querySelector('.overlay');
  const confirmPrompt = document.querySelector('.confirm_prompt');

  document.addEventListener('click', event => {
    hideContextMenu();
  });

  function renderTodos() {
    todoList.innerHTML = templates.todos({todos});
    document.querySelectorAll('#todos li').forEach(item => {
      item.addEventListener('contextmenu', renderContextMenu);
    });
  }

  renderTodos();

  function renderContextMenu(event) {
    event.preventDefault();
    const todo = todos.find(todo => todo.id === Number(event.target.dataset.id));
    contextMenu.innerHTML = templates.context_menu(todo);
    contextMenu.style.top = event.clientY + 'px';
    contextMenu.style.left = event.clientX + 'px';
    contextMenu.style.display = 'block';
    contextMenu.querySelector('.remove').addEventListener('click', event => {
      hideContextMenu();
      overlay.style.display = 'block';
      const todo = todos.find(todo => todo.id === Number(event.target.dataset.id));
      confirmPrompt.innerHTML = templates.confirm(todo);
      confirmPrompt.style.display = 'block';
      confirmPrompt.querySelector('.confirm_yes').addEventListener('click', confirmYes);
      confirmPrompt.querySelector('.confirm_no').addEventListener('click', confirmNo);
    })
  }

  function hideContextMenu() {
    contextMenu.style.display = 'none';
  }

  function hideConfirmPrompt() {
    confirmPrompt.style.display = 'none';
    overlay.style.display = 'none';
  }

  function confirmYes(event) {
    event.preventDefault();
    const id = document.querySelector('.confirm_wrapper').dataset.id;
    const index = todos.findIndex(todo => todo.id === Number(id));
    todos.splice(index, 1);
    hideConfirmPrompt();
    renderTodos();
  }

  function confirmNo(event) {
    event.preventDefault();
    hideConfirmPrompt();
  }




});