// Problem 1

function startCounting() {
  let number = 1;
  function count() {
    console.log(number);
    number += 1;
  }

  return setInterval(count, 1000);
}

// Problem 2

let id = startCounting();

function stopCounting() {
  clearInterval(id);
}

stopCounting(id);
