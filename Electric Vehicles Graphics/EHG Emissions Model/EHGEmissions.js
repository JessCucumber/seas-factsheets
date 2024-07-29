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
    const range1 = data[car1.ev][car1.type].ghg;
    const range2 = data[car2.ev][car2.type].ghg;
    document.getElementById('result').innerText = `Change in Emissions: ${difference.toFixed(2)}%` ;
    document.getElementById('range-data-car1').innerText = `GHG Emissions Range: ${range1}`;
    document.getElementById('range-data-car2').innerText = `GHG Emissions Range: ${range2}`;

    // Set the color based on the difference value
    let resultColor;
    if (difference === 0) {
      resultColor = 'gray'; // Set to gray if the difference is 0.00%
    } else {
      resultColor = difference < 0 ? 'green' : 'red';
    }
    document.getElementById('result').style.color = resultColor;
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

function calculateColor(value, minVal = 129, maxVal = 550) {
  // Normalize the value to a range of 0 to 1
  const normalized = (value - minVal) / (maxVal - minVal);

  // Initialize red, green, and blue components
  let red = 0, green = 0, blue = 0;

  // Calculate the color based on the normalized value
  if (normalized < 0.5) {
    // Transition from red to yellow (green increases)
    green = 255;
    red = Math.round(2 * normalized * 255);
  } else {
    // Transition from yellow to green (red decreases)
    green = Math.round((1 - 2 * (normalized - 0.5)) * 255);
    red = 255;
  }

  // Set the opacity to 50%
  const opacity = 0.5;

  // Return the color in rgba format with the specified opacity
  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
}


function compareResults() {
  const { car1, car2 } = selections;
  if (car1.type && car1.ev && car2.type && car2.ev) {
    const result1 = data[car1.ev][car1.type].efficiency;
    const result2 = data[car2.ev][car2.type].efficiency;
    let difference = (result2 - result1);
    const range1 = data[car1.ev][car1.type].ghg;
    const range2 = data[car2.ev][car2.type].ghg;

    // Add a plus sign if the difference is a positive number
    difference = difference > 0 ? `+${difference.toFixed(2)}` : difference.toFixed(2);

    document.getElementById('result').innerText = `Change in Emissions: ${difference}%` ;
    document.getElementById('range-data-car1').innerText = `GHG Emissions Range: ${range1}`;
    document.getElementById('range-data-car2').innerText = `GHG Emissions Range: ${range2}`;

    // Set the color based on the difference value
    let resultColor;
    if (difference === 0) {
      resultColor = 'gray'; // Set to gray if the difference is 0.00%
    } else {
      resultColor = difference < 0 ? 'green' : 'red';
    }
    document.getElementById('result').style.color = resultColor;
  }


  // Get the GHG values for car1 and car2
  const ghg1 = parseInt(data[car1.ev][car1.type].ghg.split('-')[0]);
  const ghg2 = parseInt(data[car2.ev][car2.type].ghg.split('-')[0]);

  // Calculate the colors for each GHG value
  const color1 = calculateColor(ghg1);
  const color2 = calculateColor(ghg2);

  // Set the background color of the GHG range elements
  document.getElementById('range-data-car1').style.backgroundColor = color1;
  document.getElementById('range-data-car2').style.backgroundColor = color2;
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