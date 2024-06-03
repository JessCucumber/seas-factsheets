// Read the data
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
    { year: 2001, production: 9 },
    { year: 2002, production: 10 },
    { year: 2003, production: 14 },
    { year: 2004, production: 28 },
    { year: 2005, production: 91 },
    { year: 2006, production: 250 },
    { year: 2007, production: 490 },
    { year: 2008, production: 678 },
    { year: 2009, production: 516 },
    { year: 2010, production: 343 },
    { year: 2011, production: 967 },
    { year: 2012, production: 991 },
    { year: 2013, production: 1359 },
    { year: 2014, production: 1279 },
    { year: 2015, production: 1263 },
    { year: 2016, production: 1568 },
    { year: 2017, production: 1596 },
    { year: 2018, production: 1857 },
    { year: 2019, production: 1725 },
    { year: 2020, production: 1815 },
    { year: 2021, production: 1709 },
    { year: 2022, production: 1620 }
];

// Set the dimensions and margins of the graph
var margin = { top: 30, right: 0, bottom: 30, left: 100 },
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// Append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", (height + margin.top + margin.bottom) * 2) // Multiply by 2 for two charts
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Create a function to draw the line chart
function drawLineChart(data, yPosition, title, yAxisLabel, lineColor) {
    // Parse years into date objects
    data.forEach(function (d) {
        d.year = new Date(d.year.toString()); // Convert year to Date object
    });

    // Add X axis
    var x = d3.scaleTime()
        .domain(d3.extent(data, function (d) { return d.year; }))
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + (height + yPosition) + ")")
        .call(d3.axisBottom(x).ticks(d3.timeYear.every(5)).tickFormat(d3.timeFormat("%Y")))
        .selectAll("text")
        .style("font-size", "14px") // Increase font size for x-axis labels
        .style("fill", "#333"); // Change the color to dark grey

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, d3.max(data, function (d) { return d.value || d.production; })])
        .range([height, 0]);
    var yAxis = svg.append("g")
        .attr("transform", "translate(0," + yPosition + ")")
        .call(d3.axisLeft(y).ticks(5).tickFormat(function (d) {
            return d === 0 ? "" : d; // Exclude the tick at 0
        }))
        .style("color", "#333") // Change the color to dark grey
        .style("font-size", "14px"); // Increase font size for x-axis labels

    // Remove the y-axis line
    yAxis.select(".domain").remove();

    // Remove the extra ticks at 0 on the x and y axis
    yAxis.selectAll(".tick")
        .filter(function (d) { return d === 0; })
        .remove();

    // Add the line
    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", lineColor) // Set the color of the line
        .attr("stroke-width", 2.5)
        .attr("d", d3.line()
            .curve(d3.curveMonotoneX) // Apply smoothing to the line
            .x(function (d) { return x(d.year); })
            .y(function (d) { return y(d.value || d.production) + yPosition; })
        );

    // Add Y axis label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2 + yPosition))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style("font-family", "Helvetica Neue")
        .style("font-size", "16px") // Increase font size for y-axis label
        .style("fill", "#333") // Change the color to dark grey
        .text(yAxisLabel);
}

// Draw the line charts with the specified colors and updated details
drawLineChart(ethanolData, 0, "Ethanol Production Over Time", "Ethanol Production (million gallons)", "steelblue"); // Color for the first line
drawLineChart(biodieselData, height + margin.top + margin.bottom, "Biodiesel Production Over Time", "Biodiesel Production (thousand gallons)", "green"); // Color for the second line

// Hover tooltip feature //

// Function to create the vertical line
function createVerticalLine(svg, height, margin) {
    var verticalLine = svg.append('line')
        .attr('opacity', 0) // Initially hidden
        .attr('y1', 0)
        .attr('y2', height * 2 + margin.top + margin.bottom) // Span both charts
        .attr('stroke', 'black')
        .attr('stroke-width', 1)
        .style('pointer-events', 'none'); // Ignore pointer events

    return verticalLine;
}

// Function to create the tooltip
function createTooltip(svg) {
    var tooltip = svg.append('text')
        .attr('opacity', 0) // Initially hidden
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
        .style('pointer-events', 'none'); // Ignore pointer events

    return tooltip;
}


// Create the vertical line and tooltip
var verticalLine = createVerticalLine(svg, height, margin);
var tooltip = createTooltip(svg);

// Add mousemove event listener to the SVG to update line and tooltip
svg.selectAll('path').on('mousemove', function (d) {
  verticalLine.attr('opacity', 100); // Hide the line
  tooltip.attr('opacity', 100); // Hide the tooltip
  var mouseX = d3.mouse(this)[0]; // Get the mouse x position using d3.mouse
  updateLineAndTooltip(mouseX, verticalLine, tooltip, x, d); // Update for the current data
});

// Add mouseout event listener to hide the line and tooltip when not hovering
svg.selectAll('path').on('mouseout', function () {
  verticalLine.attr('opacity', 0); // Hide the line
  tooltip.attr('opacity', 0); // Hide the tooltip
});


// Function to update the vertical line and tooltip position
function updateLineAndTooltip(mouseX, verticalLine, tooltip, xScale, data) {
  var year = xScale.invert(mouseX), // Get the year from the x scale
      closestData = data.reduce(function (prev, curr) {
          return (Math.abs(curr.year - year) < Math.abs(prev.year - year) ? curr : prev);
      }); // Find the closest data point

  verticalLine
      .attr('x1', xScale(closestData.year))
      .attr('x2', xScale(closestData.year))
      .attr('opacity', 1); // Show the line

  tooltip
      .attr('x', xScale(closestData.year))
      .attr('y', -10) // Position above the line
      .text(`Year: ${closestData.year.getFullYear()}
             Value: ${closestData.value || closestData.production}`) // Update the text
      .attr('opacity', 1); // Show the tooltip
}