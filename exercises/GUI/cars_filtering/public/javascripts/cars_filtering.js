const cars = [
  { make: 'Honda', image: 'images/honda-accord-2005.jpg', model: 'Accord', year: 2005, price: 7000 },
  { make: 'Honda', image: 'images/honda-accord-2008.jpg', model: 'Accord', year: 2008, price: 11000 },
  { make: 'Toyota', image: 'images/toyota-camry-2009.jpg', model: 'Camry', year: 2009, price: 12500 },
  { make: 'Toyota', image: 'images/toyota-corrolla-2016.jpg', model: 'Corolla', year: 2016, price: 15000 },
  { make: 'Suzuki', image: 'images/suzuki-swift-2014.jpg', model: 'Swift', year: 2014, price: 9000 },
  { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 25000 },
  { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 26000 },
];

document.addEventListener('DOMContentLoaded', () => {

  const filtersTemplate = Handlebars.compile(document.querySelector('#filters_template').innerHTML);
  const carsTemplate = Handlebars.compile(document.querySelector('#cars_template').innerHTML);
  Handlebars.registerPartial('car_template', document.querySelector('#car_template').innerHTML);

  const filters = document.querySelector('#filters');

  function uniqueValues(array, property) {
    const values = [];
    array.forEach(element => {
      if (values.indexOf(element[property]) === -1) {
        values.push(element[property]);
      }
    });

    return values;
  }

  const filtersObj = {
    makes: uniqueValues(cars, 'make'),
    models: uniqueValues(cars, 'model'),
    prices: uniqueValues(cars, 'price'),
    years: uniqueValues(cars, 'year'),
  };

  filters.innerHTML = filtersTemplate(filtersObj);

  document.querySelector('.filter_btn').addEventListener('click', event => {
    event.preventDefault();
    const filteredCars = cars.filter(car => {
      return [car.make, ''].includes(document.querySelector('#make_select').value) &&
             [car.model, ''].includes(document.querySelector('#model_select').value) &&
             [String(car.price), ''].includes(document.querySelector('#price_select').value) &&
             [String(car.year), ''].includes(document.querySelector('#year_select').value);
    });

    document.querySelector('#cars').innerHTML = carsTemplate({cars: filteredCars});

  });

  document.querySelector('#cars').innerHTML = carsTemplate({cars});

});