const data = [
    {
      Year: 2001,
      Electricity: 9,
      NaturalGas: 5,
      Chemicals: 10
    },
    {
      Year: 2002,
      Electricity: 9,
      NaturalGas: 6,
      Chemicals: 9
    },
    {
      Year: 2003,
      Electricity: 8,
      NaturalGas: 9,
      Chemicals: 8
    },
    {
      Year: 2004,
      Electricity: 9,
      NaturalGas: 8,
      Chemicals: 7
    },
    {
      Year: 2005,
      Electricity: 9,
      NaturalGas: 7,
      Chemicals: 8
    }
];

const tooltip = d3.select("#tooltip");

const categories = ['Electricity', 'NaturalGas', 'Chemicals'];

// Get the width and height of the window's content area
let fullWidth = window.innerWidth*.5;
let fullHeight = window.innerHeight*.3;

// Define the margins
const margin = { top: 30, right: 30, bottom: 40, left: 40 };

// Calculate the width and height for the chart by subtracting the margins
let width = fullWidth - margin.left - margin.right;
let height = fullHeight - margin.top - margin.bottom;

window.addEventListener('resize', function() {
    // Get the new window size
    fullWidth = window.innerWidth;
    fullHeight = window.innerHeight;

    // Update the width and height for the chart
    width = fullWidth - margin.left - margin.right;
    height = fullHeight - margin.top*4 - margin.bottom;

    // Update the SVG container's size
    svg.attr("width", fullWidth)
       .attr("height", fullHeight);
});


const svg = d3.select("#viz_container").append("svg")
.attr("width", width*1.4 + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", `translate(${margin.left},${margin.top})`);

const x = d3.scaleBand()
.domain(data.map(d => d.Year))
.rangeRound([0, width])
.paddingInner(0.1);

const y = d3.scaleLinear()
.domain([0, d3.max(data, d => d.Electricity + d.NaturalGas + d.Chemicals)]) // Update the domain here
.range([height, 0]);

const color = d3.scaleOrdinal()
.domain(categories)
.range(["#CECECE","#8FC8E5","#3167A4",]);

const stack = d3.stack()
.keys(categories)
.order(d3.stackOrderNone)
.offset(d3.stackOffsetNone);

const series = stack(data);

svg.append("g")
.selectAll("g")
.data(series)
.enter().append("g")
.attr("fill", d => color(d.key))
.selectAll("rect")
.data(d => d)
.enter().append("rect")
.attr("x", (d, i) => x(data[i].Year))
.attr("y", d => y(d[1]))
.attr("height", d => y(d[0]) - y(d[1]))
.attr("width", x.bandwidth());

svg.append("g")
.attr("class", "axis diagram-labels")
.attr("transform", `translate(0,${height})`)
.call(d3.axisBottom(x).tickSize(0));

svg.append("g")
.attr("class", "axis diagram-labels")
.call(d3.axisLeft(y).ticks(5));
svg.append("text")
    .attr("y", 0 - margin.left -10)
    .attr("x",10)
    .attr("dy", "2em")
    .style("text-anchor", "middle")
    .text("JG / MG-Yr");
// Create bars
svg.append("g")
  .selectAll("g")
  .data(series)
  .join("g")
      .attr("fill", d => color(d.key))
    .selectAll("rect")
    .data(d => d)
    .join("rect")
      .attr("x", d => x(d.data.Year))
      .attr("y", d => y(d[1]))
      .attr("height", d => y(d[0]) - y(d[1]))
      .attr("width", x.bandwidth())


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
          <td style="text-align: right">${d.data[key]}%</td> <!-- Add the style here -->
          </tr>`;
  }).join("");

  // Show the tooltip
  tooltip.style("opacity", 1);
  tooltip.html(
      `<div style="font-weight: bold; border-radius: 5px 5px 0 0; background-color: #f1eded;padding: 5px;">${d.data.Year}</div>
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
// Create a group for the labels
const labels = svg.append("g")
  .attr("class", "labels");

// Add text for each category
series.forEach((category, i) => {
  category.forEach(d => {
    if (d.data.Year === 2005) {
      labels.append("text")
        .attr("x", x(d.data.Year) + x.bandwidth() + 5) // 5 is for padding
        .attr("y", y((d[0] + d[1]) / 2))
        .attr("dy", "0.35em")
        .attr("text-anchor", "start")
        .attr("fill", color(category.key))
        .text(category.key);
    }
  });
});

