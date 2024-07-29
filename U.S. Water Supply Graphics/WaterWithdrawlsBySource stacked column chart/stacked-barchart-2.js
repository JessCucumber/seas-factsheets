const data = [
    {"Source": "Surface", "Saline": 38.6, "Fresh": 198.0},
    {"Source": "Ground", "Saline": 2.34, "Fresh": 82.3},
];


const tooltip = d3.select("#tooltip");

const categories = ['Fresh', 'Saline'];

// Get the width and height of the window's content area
const fullWidth = window.innerWidth * 0.5; // Reduce the width by 50%
const fullHeight = window.innerHeight * 0.25; // Reduce the height by 50%

// Define the margins
const margin = { top: 20, right: 65, bottom: 40, left: 40 };

// Calculate the width and height for the chart by subtracting the margins
const width = fullWidth - margin.left - margin.right;
const height = fullHeight - margin.top - margin.bottom;

window.addEventListener('resize', function() {
    // Get the new window size
    const fullWidth = window.innerWidth * 0.5; // Reduce the width by 50%
    const fullHeight = window.innerHeight * 0.5; // Reduce the height by 50%

    // Update the width and height for the chart
    const width = fullWidth - margin.left - margin.right;
    const height = fullHeight - margin.top*4 - margin.bottom;

    // Update the SVG container's size
    svg.attr("width", fullWidth)
       .attr("height", fullHeight);
});

const svg = d3.select("body").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", `translate(${margin.left},${margin.top})`);

const y = d3.scaleBand() // Change scaleBand to y
.domain(data.map(d => d.Source))
.rangeRound([0, height]) // Change width to height
.paddingInner(0.1);

const x = d3.scaleLinear() // Change scaleLinear to x
.domain([0, 250])
.range([0, width]); 

// Create x-axis
const xAxis = d3.axisBottom(x)
    .ticks(6)



const color = d3.scaleOrdinal()
.domain(categories)
.range(["#3167A4","#8FC8E5",]);

const stack = d3.stack()
.keys(categories)
.order(d3.stackOrderNone)
.offset(d3.stackOffsetNone);

const series = stack(data);

svg.append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0,${height})`)
    .call(xAxis)
    .append("text")
    .attr("class", "axis-label")
    .attr("y", -10)
    .attr("x", width)
    .attr("fill", "#000")
    .attr("text-anchor", "end")
    .text("Billions of gallons per day");

svg.append("g")
.attr("class", "axis")
.call(d3.axisLeft(y).tickSize(0)); // Change axisBottom to axisLeft

// Create bars
svg.append("g")
  .selectAll("g")
  .data(series)
  .join("g")
      .attr("fill", d => color(d.key))
    .selectAll("rect")
    .data(d => d)
    .join("rect")
      .attr("y", d => y(d.data.Source)) // Change x to y
      .attr("x", d => x(d[0])) // Change y to x
      .attr("width", d => x(d[1]) - x(d[0])) // Change height to width
      .attr("height", y.bandwidth()) // Change width to height

// On mouseover
.on("mouseover", function(event, d) {
  // Store the original color
  d3.select(this).attr('data-original-color', d3.select(this).style("fill"));
  // Highlight the bar
  d3.select(this).style("fill", "orange");

  // Prepare the tooltip data
  var tooltipData = categories.slice().reverse().map(key => {
      return `<tr>
          <td><div style="width:10px; height:10px; background-color:${color(key)};"></div></td>
          <td>${key}</td>
          <td style="text-align: right">${d.data[key]}</td> <!-- Add the style here -->
          </tr>`;
  }).join("");

  // Show the tooltip
  tooltip.style("opacity", 1);
  tooltip.html(
      `<div style="font-weight: bold; border-radius: 5px 5px 0 0; background-color: #f1eded;padding: 5px;">${d.data.Source}</div>
      <table>
          ${tooltipData}
      </table>`
  )
  .style("left", (event.pageX + 10) + "px")
  .style("top", (event.pageY - 28) + "px");
})
// On mouseout
.on("mouseout", function(d) {
  // Restore the original color
  d3.select(this).style("fill", d3.select(this).attr('data-original-color'));
  // Hide the tooltip
  tooltip.style("opacity", 0);
});

// Define the size and position of the legend
const legendWidth = 150;
const legendHeight = 50;
const legendX = width - legendWidth*.05;
const legendY = height - legendHeight *2.3; // Position the legend slightly higher

// Create a group for the legend
const legend = svg.append("g")
    .attr("transform", `translate(${legendX},${legendY})`);

// Add rectangles to the legend for each color
legend.selectAll("rect")
    .data(categories)
    .enter()
    .append("rect")
    .attr("x", -100) // Position the rectangle at the start of the legend
    .attr("y", (d, i) => i * 20) // Position each rectangle on a new line
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", d => color(d));

// Add labels to the legend for each color
legend.selectAll("text")
    .data(categories)
    .enter()
    .append("text")
    .attr("x", -75) // Position the label next to the rectangle
    .attr("y", (d, i) => i * 20 + 14) // Position each label on a new line, aligned with the rectangle
    .text(d => d);


