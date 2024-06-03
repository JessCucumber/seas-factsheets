const data = {
  ICEV: {
    Pickup: { efficiency: 100, ghg: "543-573" },
    SUV: { efficiency: 82, ghg: "435-485" },
    Sedan: { efficiency: 71, ghg: "373-420" }
  },
  HEV: {
    Pickup: { efficiency: 72, ghg: "388-410" },
    SUV: { efficiency: 59, ghg: "317-345" },
    Sedan: { efficiency: 49, ghg: "262-287" }
  },
  BEV: {
    Pickup: { efficiency: 35, ghg: "182-207" },
    SUV: { efficiency: 31, ghg: "162-170" },
    Sedan: { efficiency: 24, ghg: "129-136" }
  }
};

let selections = {
  car1: { type: null, ev: null },
  car2: { type: null, ev: null }
};

function compareResults() {
  const { car1, car2 } = selections;
  if (car1.type && car1.ev && car2.type && car2.ev) {
    const result1 = data[car1.ev][car1.type].efficiency;
    const result2 = data[car2.ev][car2.type].efficiency;
    const difference = (result2 - result1);
    document.getElementById('result').innerText = `Difference: ${difference.toFixed(2)}%`;
  }
}
function compareResults() {
  const { car1, car2 } = selections;
  if (car1.type && car1.ev && car2.type && car2.ev) {
    const result1 = data[car1.ev][car1.type].efficiency;
    const result2 = data[car2.ev][car2.type].efficiency;
    const difference = (result2 - result1);
    const range1 = data[car1.ev][car1.type].ghg;
    const range2 = data[car2.ev][car2.type].ghg;
    document.getElementById('result').innerText = `Efficiency Difference: ${difference.toFixed(2)}%`;
    document.getElementById('range-data').innerText = `GHG Emissions Range: Car 1: ${range1}, Car 2: ${range2}`;
  }
}

document.querySelectorAll('.grid-item').forEach(item => {
  item.addEventListener('click', () => {
    const car = item.dataset.car;
    const category = item.dataset.category;
    const value = item.dataset.value;

    selections[`car${car}`][category] = value;

    // Remove the selected class from other items in the same category and car
    document.querySelectorAll(`.grid-item[data-car="${car}"][data-category="${category}"]`).forEach(i => {
      i.classList.remove('selected');
    });

    // Add the selected class to the clicked item
    item.classList.add('selected');

    // Update the display and results
    updateDisplay(car, selections[`car${car}`].type, selections[`car${car}`].ev);
    compareResults();
  });
});

function compareResults() {
  const { car1, car2 } = selections;
  if (car1.type && car1.ev && car2.type && car2.ev) {
    const result1 = data[car1.ev][car1.type].efficiency;
    const result2 = data[car2.ev][car2.type].efficiency;
    const difference = (result2 - result1);
    const range1 = data[car1.ev][car1.type].ghg;
    const range2 = data[car2.ev][car2.type].ghg;
    document.getElementById('result').innerText = `Efficiency Difference: ${difference.toFixed(2)}%`;
    document.getElementById('range-data-car1').innerText = `GHG Emissions Range: ${range1}`;
    document.getElementById('range-data-car2').innerText = `GHG Emissions Range: ${range2}`;
  }
}


document.querySelectorAll('.grid-item').forEach(item => {
  item.addEventListener('click', () => {
    const car = item.dataset.car;
    const category = item.dataset.category;
    const value = item.dataset.value;

    selections[`car${car}`][category] = value;

    // Remove the selected class from other items in the same category and car
    document.querySelectorAll(`.grid-item[data-car="${car}"][data-category="${category}"]`).forEach(i => {
      i.classList.remove('selected');
    });

    // Add the selected class to the clicked item
    item.classList.add('selected');

    // Update the results
    compareResults();
  });
});

