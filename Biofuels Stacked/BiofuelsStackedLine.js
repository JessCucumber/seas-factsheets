// data //
const ethanolData = [
    { year: 2001, value: 1765 },
    { year: 2002, value: 2140 },
    { year: 2003, value: 2804 },
    { year: 2004, value: 3404 },
    { year: 2005, value: 3904 },
    { year: 2006, value: 4884 },
    { year: 2007, value: 6521 },
    { year: 2008, value: 9309 },
    { year: 2009, value: 10938 },
    { year: 2010, value: 13298 },
    { year: 2011, value: 13929 },
    { year: 2012, value: 13218 },
    { year: 2013, value: 13293 },
    { year: 2014, value: 14313 },
    { year: 2015, value: 14807 },
    { year: 2016, value: 15413 },
    { year: 2017, value: 15936 },
    { year: 2018, value: 16091 },
    { year: 2019, value: 15778 },
    { year: 2020, value: 13941 },
    { year: 2021, value: 15016 },
    { year: 2022, value: 15365 }
];

const biodieselData = [
    { year: 2001, production: 0.009 },
    { year: 2002, production: 0.010 },
    { year: 2003, production: 0.014 },
    { year: 2004, production: 0.028 },
    { year: 2005, production: 0.091 },
    { year: 2006, production: 0.250 },
    { year: 2007, production: 0.490 },
    { year: 2008, production: 0.678 },
    { year: 2009, production: 0.516 },
    { year: 2010, production: 0.343 },
    { year: 2011, production: 0.967 },
    { year: 2012, production: 0.991 },
    { year: 2013, production: 1.359 },
    { year: 2014, production: 1.279 },
    { year: 2015, production: 1.263 },
    { year: 2016, production: 1.568 },
    { year: 2017, production: 1.596 },
    { year: 2018, production: 1.857 },
    { year: 2019, production: 1.725 },
    { year: 2020, production: 1.815 },
    { year: 2021, production: 1.709 },
    { year: 2022, production: 1.620 }
];


///set dimensiions//////////////////////////////////////////////////
// Set up the dimensions and margins of the graph
let container = document.getElementById("my_dataviz");
let containerWidth = Math.min(container.offsetWidth, 844);
let aspectRatio = 0.5;
let containerHeight = containerWidth * aspectRatio;


let dynamicMargin = {
  top: containerHeight * 0.05,
  right: containerWidth * 0.1,
  bottom: containerHeight * 0.1,
  left: containerWidth * 0.125
};

let width = containerWidth - dynamicMargin.left - dynamicMargin.right;
let height = containerHeight - dynamicMargin.top - dynamicMargin.bottom;

// Append SVG object
let svg = d3.select("#my_dataviz").append("svg")
  .attr('viewBox', `0 0 ${containerWidth} ${containerHeight}`)
  .attr('preserveAspectRatio', 'xMinYMin meet')
  .append('g')
  .attr('transform', `translate(${dynamicMargin.left},${dynamicMargin.top})`);

// Add X axis
const x = d3.scaleLinear()
  .domain([2001, 2022])
  .range([ 0, width ]);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x).ticks(7).tickFormat(d3.format("d")))
  .selectAll(".tick line").attr("stroke", "none");

// Add Y axis
const y0 = d3.scaleLinear()
  .domain([0, 2])
  .range([ height, height/1.67 ]);

// Create a group for the y0 axis and call the axis
const y0AxisGroup = svg.append("g")
  .attr("class", "chart-labels y0-axis")
  .call(d3.axisLeft(y0).ticks(5));

// Remove the stroke from the tick lines
y0AxisGroup.selectAll(".tick line").attr("stroke", "none");

const y1 = d3.scaleLinear()
  .domain([1500, 20000])
  .range([ height/2,10]);

// Create a group for the y1 axis and call the axis
const y1AxisGroup = svg.append("g")
  .attr("class", "chart-labels y1-axis")
  .call(d3.axisLeft(y1).ticks(4));

// Remove the stroke from the tick lines
y1AxisGroup.selectAll(".tick line").attr("stroke", "none");

// Calculate the y positions of the two graphs
let y0Bottom = y0.range()[0];
let y1Top = y1.range()[1];

// Determine the position of the chevron lines
let lineY1 = y1Top + (y0Bottom - y1Top) / 2;
let lineY2 = y1Top + 2 * (y0Bottom - y1Top) / 3.75;

// Define the chevron pattern
let chevronPattern = d3.line()
  .x((d, i) => i * 20) // Adjust this value to change the width of the chevrons
  .y((d, i) => (i % 2 === 0 ? 0 : 10)); // Adjust this value to change the height of the chevrons

// Create an array to hold the data for the chevron pattern
let chevronData = new Array(Math.ceil(width / 20)).fill(0); // Adjust the divisor to match the width of the chevrons

// Append two paths to the SVG to act as the chevron lines
svg.append("path")
  .attr("d", chevronPattern(chevronData))
  .attr("transform", `translate(0,${lineY1})`)
  .attr("fill", "none")
  .attr("stroke", "grey")
  .attr("stroke-width", 2);

svg.append("path")
  .attr("d", chevronPattern(chevronData))
  .attr("transform", `translate(0,${lineY2})`)
  .attr("fill", "none")
  .attr("stroke", "grey")
  .attr("stroke-width", 2);





// Define the lines
const lineEthanol = d3.line()
  .x(function(d) { return x(d.year); })
  .y(function(d) { return y1(d.value); })
  .curve(d3.curveBasis);

const lineBiodiesel = d3.line()
  .x(function(d) { return x(d.year); })
  .y(function(d) { return y0(d.production); })
  .curve(d3.curveBasis);

// Add an event listener to handle window resize
window.addEventListener("resize", function() {
  // Get the new container dimensions
  containerWidth = container.offsetWidth;
  containerHeight = containerWidth * aspectRatio;

  // Update the dynamic margins
  dynamicMargin = {
    top: containerHeight * 0.05,
    right: containerWidth * 0.1,
    bottom: containerHeight * 0.1,
    left: containerWidth * 0.05
  };

  // Update the width and height for the inner drawing area
  width = containerWidth - dynamicMargin.left - dynamicMargin.right;
  height = containerHeight - dynamicMargin.top - dynamicMargin.bottom;

  // Update the SVG dimensions and transformation
  svg
    .attr('viewBox', `0 0 ${containerWidth} ${containerHeight}`)
    .attr('transform', `translate(${dynamicMargin.left},${dynamicMargin.top})`);
});

// Ethanol line
svg.append("path")
  .datum(ethanolData)
  .attr("fill", "none")
  .attr("stroke", "#32A28D")
  .attr("stroke-width", 2)
  .attr("d", lineEthanol);

// Biodiesel line
svg.append("path")
  .datum(biodieselData)
  .attr("fill", "none")
  .attr("stroke", "#A6B93D")
  .attr("stroke-width", 2)
  .attr("d", lineBiodiesel);


// Define your dynamic variables
let yAxisLabelText = "Gallons (In Millions)";
let yAxisLabelXPosition = -dynamicMargin.top * 2.5; // Adjust this value as needed
let yAxisLabelYPosition = height / 2; // Adjust this value as needed

// Add the Y axis label
svg.append("text")
  .attr("class", "yAxisLabel") // Assign a class to the text element
  .attr("text-anchor", "middle")
  .attr("transform", `translate(${yAxisLabelXPosition *1.25}, ${yAxisLabelYPosition}) rotate(-90)`)
  .text(yAxisLabelText);



  

///hover tooltip///////////////////////////////////////////////////////////////////////
// Select the tooltip element
const tooltip = d3.select("#tooltip");

// Function to format a number with commas
function formatWithCommas(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Function to format a number with decimals
function formatWithDecimals(n) {
  return n.toFixed(1);
}

// Update tooltip function
function updateTooltip(event, year, ethanolValue, biodieselProduction) {
  const [xPos, yPos] = d3.pointer(event, svg.node());
  const ethanolColor = "#32A28D";
  const biodieselColor = "#A6B93D";
  var htmlContent = "";

  htmlContent += `
    <tr>
        <td>
            <span class="color-legend" style="background-color: ${ethanolColor};"></span>
            Ethanol
        </td>
        <td class="value">${formatWithCommas(ethanolValue)}</td>
    </tr>
    <tr>
        <td>
            <span class="color-legend" style="background-color: ${biodieselColor};"></span>
            Biodiesel
        </td>
        <td class="value">${formatWithDecimals(biodieselProduction)}</td>
    </tr>
  `;

  tooltip
    .style("opacity", 0.9)
    .html(`
        <div class="tooltip-title">${year}</div>
        <table class="tooltip-content">
            ${htmlContent}
        </table>
    `)
    .style("left", `${event.pageX+5}px`)
    .style("top", `${event.pageY+5}px`)
    .style("background-color","white");
}




// Function to handle mouse move event on the graph
function onMouseMove(event) {
  const [xPos] = d3.pointer(event, this);
  const year = Math.round(x.invert(xPos));
  const ethanolHoverData = ethanolData.find(d => d.year === year);
  const biodieselHoverData = biodieselData.find(d => d.year === year);

  if (ethanolHoverData && biodieselHoverData) {
    const xPosAdjusted = x(year);
    updateTooltip(event, year, ethanolHoverData.value, biodieselHoverData.production);
    tooltip.style("visibility", "visible")
    .style("font-family", "'IBM Plex Sans', sans-serif");

    // Make the mouse-line visible
    mouseG.select(".mouse-line")
      .style("opacity", "1")
      .attr("d", () => `M${xPos},${height} ${xPos},0`);

    // Add points on the lines
    mouseG.selectAll(".data-point").remove(); // Remove old points
    mouseG.append("circle")
      .attr("class", "data-point")
      .attr("cx", xPosAdjusted)
      .attr("cy", y1(ethanolHoverData.value))
      .attr("r", 5)
      .style("fill", "#32A28D");
    mouseG.append("circle")
      .attr("class", "data-point")
      .attr("cx", xPosAdjusted)
      .attr("cy", y0(biodieselHoverData.production))
      .attr("r", 5)
      .style("fill", "#A6B93D");

  } else {
    tooltip.style("visibility", "hidden");
  }
}

// Append a line that will follow the mouse cursor
const mouseG = svg.append("g")
  .attr("class", "mouse-over-effects");

mouseG.append("path")
  .attr("class", "mouse-line")
  .style("stroke", "#999")
  .style("stroke-width", "0.5px")
  .style("opacity", "0");

// Create a rect for listening to mouse events
svg.append('rect')
  .attr('class', 'listening-rect')
  .attr('width', width)
  .attr('height', height)
  .attr('fill', 'none')
  .attr('pointer-events', 'all')
  .on('mousemove', onMouseMove)
  .on('mouseout', () => {
    tooltip.style("visibility", "hidden");
    // Hide the mouse-line
    mouseG.select(".mouse-line")
      .style("opacity", "0");




  });


  //label to the right of the lines
// y axis labels are in the top
// wrap text wo fit within margin

