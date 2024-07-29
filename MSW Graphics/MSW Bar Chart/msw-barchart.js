const data = [
    {
      year: 1960,
      Recycled: 6.4,
      Composted: 0.0,
      OtherFoodManagement: 0.0,
      Combustion: 0.0,
      Landfill: 93.6
    },
    {
      year: 1970,
      Recycled: 6.6,
      Composted: 0.0,
      OtherFoodManagement: 0.0,
      Combustion: 0.4,
      Landfill: 93.0
    },
    {
      year: 1980,
      Recycled: 9.6,
      Composted: 0.0,
      OtherFoodManagement: 0.0,
      Combustion: 1.8,
      Landfill: 88.6
    },
    {
      year: 1990,
      Recycled: 13.9,
      Composted: 2.0,
      OtherFoodManagement: 0.0,
      Combustion: 14.3,
      Landfill: 69.8
    },
    {
      year: 2000,
      Recycled: 21.8,
      Composted: 6.8,
      OtherFoodManagement: 0.0,
      Combustion: 13.8,
      Landfill: 57.6
    },
    {
      year: 2005,
      Recycled: 23.3,
      Composted: 8.1,
      OtherFoodManagement: 0.0,
      Combustion: 12.5,
      Landfill: 56.1
    },
    {
      year: 2010,
      Recycled: 26.0,
      Composted: 8.0,
      OtherFoodManagement: 0.0,
      Combustion: 11.7,
      Landfill: 54.3
    },
    {
      year: 2015,
      Recycled: 25.8,
      Composted: 8.9,
      OtherFoodManagement: 0.0,
      Combustion: 12.8,
      Landfill: 52.5
    },
    {
      year: 2017,
      Recycled: 24.9,
      Composted: 10.0,
      OtherFoodManagement: 0.0,
      Combustion: 12.7,
      Landfill: 52.3
    },
    {
      year: 2018,
      Recycled: 23.6,
      Composted: 8.5,
      OtherFoodManagement: 6.1,
      Combustion: 11.8,
      Landfill: 50.0
    }
  ];
  
const tooltip = d3.select("#tooltip");

const categories = ['Landfill','Recycled','Combustion', 'Composted', 'OtherFoodManagement'];

// Get the width and height of the window's content area
const fullWidth = window.innerWidth;
const fullHeight = window.innerHeight;

// Define the margins
const margin = { top: 20, right: 30, bottom: 40, left: 40 };

// Calculate the width and height for the chart by subtracting the margins
const width = fullWidth - margin.left - margin.right;
const height = fullHeight - margin.top - margin.bottom;
window.addEventListener('resize', function() {
    // Get the new window size
    const fullWidth = window.innerWidth;
    const fullHeight = window.innerHeight;

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

const x = d3.scaleBand()
.domain(data.map(d => d.year))
.rangeRound([0, width])
.paddingInner(0.1);

const y = d3.scaleLinear()
.domain([0, 100])
.nice()
.range([height, 0]);

const color = d3.scaleOrdinal()
.domain(categories)
.range(["#1D476D","#C6E3E0","#A6B93D","#8FC7E5","#3167A3"]);

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
.attr("x", (d, i) => x(data[i].year))
.attr("y", d => y(d[1]))
.attr("height", d => y(d[0]) - y(d[1]))
.attr("width", x.bandwidth());

svg.append("g")
.attr("class", "axis")
.attr("transform", `translate(0,${height})`)
.call(d3.axisBottom(x).tickSize(0));

svg.append("g")
.attr("class", "axis")
.call(d3.axisLeft(y).ticks(5));


// Create bars
svg.append("g")
  .selectAll("g")
  .data(series)
  .join("g")
      .attr("fill", d => color(d.key))
    .selectAll("rect")
    .data(d => d)
    .join("rect")
      .attr("x", d => x(d.data.year))
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
      `<div style="font-weight: bold; border-radius: 5px 5px 0 0; background-color: #f1eded;padding: 5px;">${d.data.year}</div>
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



//update colors on the hover tooltip
//create space between bars
//put landfill on the bottom