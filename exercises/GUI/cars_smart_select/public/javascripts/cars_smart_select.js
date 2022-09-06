const cars = [
  { make: 'Honda', image: 'images/honda-accord-2005.jpg', model: 'Accord', year: 2005, price: 7000 },
  { make: 'Honda', image: 'images/honda-accord-2008.jpg', model: 'Accord', year: 2008, price: 11000 },
  { make: 'Toyota', image: 'images/toyota-camry-2009.jpg', model: 'Camry', year: 2009, price: 12500 },
  { make: 'Toyota', image: 'images/toyota-corrolla-2016.jpg', model: 'Corolla', year: 2016, price: 15000 },
  { make: 'Suzuki', image: 'images/suzuki-swift-2014.jpg', model: 'Swift', year: 2014, price: 9000 },
  { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 25000 },
  { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 26000 },
];

function uniqueValues(object, key) {
  const result = [];
  object.forEach(car => {
    if (!result.includes(car[key])) {
      result.push(car[key]);
    }
  });

  return result;
}

function filterObject(object, criteria) {
  return object.filter(item => {
    return Object.keys(criteria).every(key => {
      return item[key] === criteria[key] || criteria[key] === 'Any';
    });
  });
}

const form = document.querySelector('form');
const template = Handlebars.compile(document.querySelector('#template').innerHTML);
document.querySelector('main').innerHTML = template({cars});

function populateSelects(carObject) {
  document.querySelectorAll('select').forEach(select => {
    let values = ['Any'];
    values = values.concat(uniqueValues(carObject, select.id));
    select.innerHTML = values.map(value => {
      if (value === +select.value || value === select.value) {
        return `<option value="${value}" selected>${value}</option>`
      } else {
        return `<option value="${value}">${value}</option>`;
      }
    }).join('');
  });
}
populateSelects(cars);

form.addEventListener('submit', event=> {
  event.preventDefault();
  const filteredCars = filterObject(cars, {
    make: form.elements.make.value,
    model: form.elements.model.value,
    price: +form.elements.price.value || 'Any',
    year: +form.elements.year.value || 'Any',
  });
  console.log(filteredCars);
  document.querySelector('main').innerHTML = template({cars: filteredCars});
});

form.addEventListener('input', event => {
  const filteredCars = filterObject(cars, {
    make: form.elements.make.value,
    model: form.elements.model.value,
    price: +form.elements.price.value || 'Any',
    year: +form.elements.year.value || 'Any',
  });
  populateSelects(filteredCars);
});

