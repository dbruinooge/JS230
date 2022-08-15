var inventory;

(function() {
  inventory = {
    lastId: 0,
    collection: [],
    setDate: function() {
      var date = new Date();
      document.querySelector('#order_date').textContent = date.toUTCString();
    },
    cacheTemplate: function() {
      var iTmpl = document.querySelector('#inventory_item');
      this.template = Handlebars.compile(iTmpl.innerHTML);
      iTmpl.remove();
    },
    add: function() {
      this.lastId++;
      var item = {
        id: this.lastId,
        name: "",
        stock_number: "",
        quantity: 1
      };
      this.collection.push(item);

      return item;
    },
    remove: function(idx) {
      this.collection = this.collection.filter(function(item) {
        return item.id !== idx;
      });
    },
    get: function(id) {
      var found_item;

      this.collection.forEach(function(item) {
        if (item.id === id) {
          found_item = item;
          return false;
        }
      });

      return found_item;
    },
    update: function(itemElement) {
      let id = this.findID(itemElement);
      let item = this.get(id);

      item.name = itemElement.querySelector("[name^=item_name]").value;
      item.stock_number = itemElement.querySelector("[name^=item_stock_number]").value;
      item.quantity = itemElement.querySelector("[name^=item_quantity]").value;
    },
    newItem: function(e) {
      e.preventDefault();
      let item = this.add();
      document.querySelector('#inventory').insertAdjacentHTML('beforeend', this.template( {id: item.id}));
    },
    findParent: function(e) {
      return e.target.closest('tr');
    },
    findID: function(item) {
      return +item.querySelector("input[type=hidden]").value;
    },
    deleteItem: function(e) {
      e.preventDefault();
      var item = this.findParent(e);
      item.remove();

      this.remove(this.findID(item));
    },
    updateItem: function(e) {
      var item = this.findParent(e);

      this.update(item);
    },
    bindEvents: function() {
      document.querySelector('#add_item').addEventListener('click', this.newItem.bind(this));
      document.querySelector('#inventory').addEventListener('click', event => {
        if (event.target.tagName === 'A' && event.target.classList.contains('delete')) {
          this.deleteItem(event);
        }
      });
      document.querySelector('#inventory').addEventListener('focusout', event => {
        if (['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes(event.target.tagName)) {
          this.updateItem(event);
        }
      });
    },
    init: function() {
      this.setDate();
      this.cacheTemplate();
      this.bindEvents();
    }
  };
})();

document.addEventListener('DOMContentLoaded', inventory.init.bind(inventory));
