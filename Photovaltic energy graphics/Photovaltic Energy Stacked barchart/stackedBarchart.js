//Data/////////////////////////////////////////////////////
const data = [
  { year: 2005, usGW: 0.19, restOfWorldGW: 3.772 },
  { year: 2006, usGW: 0.295, restOfWorldGW: 5.003 },
  { year: 2007, usGW: 0.455, restOfWorldGW: 7.073 },
  { year: 2008, usGW: 0.753, restOfWorldGW: 13.015 },
  { year: 2009, usGW: 1.188, restOfWorldGW: 20.134 },
  { year: 2010, usGW: 2.017, restOfWorldGW: 35.556 },
  { year: 2011, usGW: 3.973, restOfWorldGW: 63.136 },
  { year: 2012, usGW: 7.13, restOfWorldGW: 86.59 },
  { year: 2013, usGW: 12.076, restOfWorldGW: 114.462 },
  { year: 2014, usGW: 18.321, restOfWorldGW: 142.094 },
  { year: 2015, usGW: 25.821, restOfWorldGW: 177.583 },
  { year: 2016, usGW: 40.975, restOfWorldGW: 316.083 },
  { year: 2017, usGW: 51.818, restOfWorldGW: 399.186 },
  { year: 2018, usGW: 62.484, restOfWorldGW: 487.601 },
  { year: 2019, usGW: 76.274, restOfWorldGW: 599.414 },
  { year: 2020, usGW: 96.131, restOfWorldGW: 726.219 },
  { year: 2021, usGW: 123.004, restOfWorldGW: 822.35 },
  { year: 2022, usGW: 141.566, restOfWorldGW: 900.323 }
];

// Get the container and its dimensions
const container = document.getElementById("viz_container");
const containerWidth = container.offsetWidth; // Use offsetWidth for full element width
const aspectRatio = 0.75; // Adjust this value as needed
const containerHeight = containerWidth * aspectRatio; // Calculate the height based on the width and aspect ratio

// set the dimensions and margins of the graph
const margin = {top: 100, right: 130, bottom: 50, left: 70};
const width = containerWidth - margin.left - margin.right;
const height = containerHeight - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#viz_container")
  .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", `0 0 ${containerWidth + 10} ${containerHeight}`) // update viewbox to match container dimensions
    .attr("preserveAspectRatio", "xMinYMin")
  .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)
    .style("font-family", "'IBM Plex Sans', sans-serif"); 
  
// stack the data
const stackGenerator = d3.stack().keys(["restOfWorldGW","usGW"]);
const stackedData = stackGenerator(data);
  
// X scale and Axis
const xScale = d3.scaleBand()
    .domain(data.map(d => d.year))
    .range([0, width + 10])
    .padding(.2);

    svg
    .append('g')
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale).tickSize(0).tickPadding(10).tickValues(data.filter((d, i) => i % 4 === 0 || d.year === 2022).map(d => d.year))); 

// Y scale and Axis
const yScale = d3.scaleLinear()
.domain([0, 1200])  // scale the y axis to 1200
.range([height, 0]);

let yAxis = svg.append('g')
    .call(d3.axisLeft(yScale).ticks(5).tickSize(0).tickPadding(10));



// Add Y axis label
svg.append("text")
    .attr("y", 0 - margin.left+30)
    .attr("x", 100 - (height/10))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Total installed PV Capacity");
// Add Y axis label

svg.append("text")
    .attr("y", 0 - margin.left+45)
    .attr("x", 100 - (height/10))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("(In Thousands)");

// color palette
const color = d3.scaleOrdinal()
    .domain(["usGW", "restOfWorldGW"])
    .range(['#8FC8E5','#1C476D']);

// Create the bars
let bars = svg.append("g")
.selectAll("g")
.data(stackedData)
.join("g")
  .attr("fill", d => color(d.key))
.selectAll("rect")
.data(d => d)
.join("rect")
  .attr("x", d => xScale(d.data.year))
  .attr("y", d => yScale(d[1]))
  .attr("height", d => yScale(d[0]) - yScale(d[1]))
  .attr("width", xScale.bandwidth());

// create a tooltip
const tooltip = d3.select("body")
    .append("div")
      .attr("id", "chart")
      .attr("class", "tooltip")
      .style("background", "white")
      .style("opacity", ".9")
      .style("border-radius", "5px")
      .style("color", "#1E1A1D")
      .style("font-family", "sans-serif")
      .style("position", "absolute")
      .style("transition", "opacity 0.35s");

// append a div for the total row
const tooltipContent = tooltip.append("div")
      .attr("class", "tooltip-content")
      .style("background", "white");  // Set the background color of the content

tooltipContent.append("div")
      .attr("class", "total")
      .style("font-weight", "bold");  // make the total row bold

// Three function that change the tooltip when user hover / move / leave a cell
const mouseover = function(d) {
  tooltip
    .transition()
    .duration(200)
    .style("opacity", .9);
  d3.select(this)
    .style("opacity", .9);
}

const mousemove = function(event, d) {
tooltip
  .style("left", (event.pageX + 15) + "px")
  .style("top", (event.pageY - 28) + "px");
}

const mouseleave = function(d) {
  tooltip
    .transition()
    .duration(500)
    .style("opacity", 0);
  d3.select(this)
    .style("opacity", 1);
}

bars.on("mouseover", function(event, d) {
  // This is where the tooltip generation starts
  let tooltipHtml = "<table>";
  
// Add a title row to the tooltip
tooltipHtml += `
  <tr>
    <td colspan="2">
      <div class="tooltip-title">
        <strong>${d.data.year}</strong>
      </div>
    </td>
  </tr>
`;

// Calculate the total
let total = d.data.usGW + d.data.restOfWorldGW;

// Calculate the installed capacity for US and Rest of the World
let usGW = d.data.usGW;
let restOfWorldGW = d.data.restOfWorldGW;

const formatter = d3.format(",.0f");

// Add each category to the tooltip
tooltipHtml += `
  <tr>
    <td>
      <span class="color-legend" style="background-color: #686868;"></span>
      US GW
    </td>
    <td class="value">${formatter(usGW * 1000)}</td>
  </tr>
  <tr>
    <td>
      <span class="color-legend" style="background-color: rgb(50, 162, 141);"></span>
      Rest of World GW
    </td>
    <td class="value">${formatter(restOfWorldGW * 1000)}</td>
  </tr>
`;

// Add the total row as a separate div
tooltipHtml += `
  <tr>
    <td colspan="2">
      <div class="tooltip-total">
        <strong>World GW</strong>
        <span class="value" style="float: right;">${formatter(total * 1000)}</span>
      </div>
    </td>
  </tr>
`;


  // Close the table tag
  tooltipHtml += "</table>";
  
  // Show the tooltip
  tooltip.html(tooltipHtml)
    .style("left", (event.pageX + 15) + "px")
    .style("top", (event.pageY - 28) + "px")
    .transition()
    .duration(200)
    .style("opacity", .9);
})
.on("mouseout", function(d) {
  // Hide the tooltip
  tooltip.transition()
    .duration(500)
    .style("opacity", 0);
});

// Define the legend
let legend = svg.selectAll(".legend")
    .data(color.domain())
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(0," + (i * 20 + 10) + ")"; }); // Adjust vertical position

// Draw legend text
legend.append("text")
    .attr("x", width+10) // Move text further right
    .attr("y", 60)
    .attr("dy", ".35em")
    .style("text-anchor", "start") // Align text to the right
    .text(function(d) { 
        let words = d.split(/(?=[A-Z][a-z]|[A-Z][A-Z])/); // split the string into words at each uppercase letter followed by a lowercase letter or another uppercase letter
        words = words.map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1); // capitalize the first letter of each word
        });
        return words.join(' '); // join the words back together with a space
    });
