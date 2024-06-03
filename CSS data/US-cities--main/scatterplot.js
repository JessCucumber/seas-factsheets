//Data///////////////////////////////////////////////////////////////////////////////////////////

// Data for the scatter plot (converted from the CSV)
var data = [
    { city: "Houston", density: 15, energy: 71624 },
    { city: "Phoenix", density: 16, energy: 64641 },
    { city: "San Francisco", density: 25, energy: 65890 },
    { city: "Denver", density: 21, energy: 68286 },
    { city: "Los Angeles", density: 36, energy: 62167 },
    { city: "Detroit", density: 21, energy: 62744 },
    { city: "Boston", density: 19, energy: 58391 },
    { city: "Washington", density: 23, energy: 60454 },
    { city: "Chicago", density: 25, energy: 56121 },
    { city: "New York", density: 30, energy: 51626 },
    { city: "Perth", density: 15, energy: 44995 },
    { city: "Brisbane", density: 14, energy: 41395 },
    { city: "Melbourne", density: 21, energy: 39277 },
    { city: "Sydney", density: 24, energy: 37103 },
    { city: "Toronto", density: 65, energy: 33613 },
    { city: "Frankfurt", density: 90, energy: 38293 },
    { city: "Brussels", density: 122, energy: 28895 },
    { city: "Hamburg", density: 64, energy: 36716 },
    { city: "Zurich", density: 82, energy: 25244 },
    { city: "Stockholm", density: 92, energy: 26817 },
    { city: "Vienna", density: 106, energy: 20603 },
    { city: "Copenhagen", density: 45, energy: 20385 },
    { city: "Paris", density: 68, energy: 24241 },
    { city: "Munich", density: 91, energy: 18107 },
    { city: "Amsterdam", density: 137, energy: 19843 },
    { city: "London", density: 101, energy: 23374 },
    { city: "Singapore", density: 136, energy: 18079 },
    { city: "Tokyo", density: 178, energy: 18243 },
    { city: "Hong Kong", density: 440, energy: 9612 }

];


//Adding Graph & setting dimensions///////////////////////////////////////////////////////////////

// Set the dimensions and margins of the graph
var margin = {top: 40, right: 70, bottom: 60, left: 90},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// Append the svg object to the body of the page
var svg = d3.select("#scatter")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
          
//Axis/////////////////////////////////////////////////////////////////////////////////////////////
// Add X axis
var x = d3.scaleLinear()
  .domain([0, d3.max(data, function(d) { return d.density; }) + 10])
  .range([0, width]);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));


  
// Add X-axis label
  svg.append("text")
  .attr("class", "axis-label")
  .attr("x", width / 2)
  .attr("y", height + 40)
  .style("text-anchor", "middle")
  .style("font-family", "Arial, sans-serif")
  .attr("dy", "0em")
  .text("Population Density");

  svg.append("text")
  .attr("dy", "1.25em") // you can vary how far apart it shows up
  .attr("x", width / 2)
  .attr("y", height + 40)
  .style("text-anchor", "middle")
  .style("font-family", "Arial, sans-serif")
  .style("font-size", "12")
  .text("(Per Hectare)")



// Add Y axis
// Add Y axis with formatted labels
var y = d3.scaleLinear()
  .domain([0, 80000]) // Set the domain to go from 0 to 80000
  .range([height, 0]);

svg.append("g")
  .call(d3.axisLeft(y).tickFormat(function(d) {
     return d/1000; // Keep the division to display the value in '000s
  }));


// Add Y-axis label
svg.append("text")
  .attr("class", "axis-label")
  .attr("transform", "rotate(-90)")
  .attr("x", -height / 2)
  .attr("y", -60) 
  .style("text-anchor", "middle")
  .style("font-family", "Arial, sans-serif")
  .text("Energy Consumption (per 1000 MJ)");


// // Define the quadratic regression function
// function quadraticRegression(data) {
//   // Calculate the coefficients a, b, and c for the equation y = ax^2 + bx + c
//   var a = .716; // Adjust this coefficient to control the curvature
//   var b = -431.98;     // Adjust this coefficient to control the slope
//   var c = 62445; // Adjust this coefficient to set the starting point on the Y axis

//   // Return the path data for the quadratic curve
//   return d3.line()
//     .x(function(d) { return x(d.density); })
//     .y(function(d) { return y(a * Math.pow(d.density, 2) + b * d.density + c); })
//     .curve(d3.curveMonotoneX)(data);
// }

// y = 250838x-0.51

// // Append the quadratic trend line to the graph
// svg.append("path")
//   .datum(data) // Binds data to the line
//   .attr("fill", "none")
//   .attr("stroke", "red") // Use a different color to distinguish the trend line
//   .attr("stroke-width", 2)
//   .attr("d", quadraticRegression(data)); // Calls the quadratic regression function


// Calculate the curved line data using the provided equation
var curvedLine = d3.line()
  .x(function(d) { return x(d.density); })
  .y(function(d) { 
    // Use the provided equation to calculate y
    return y(250838 * d.density - 0.51); 
  })
  .curve(d3.curveMonotoneX)(data); // This will smooth the line

// Append the curved line to the graph
svg.append("path")
  .datum(data) // Binds data to the line
  .attr("fill", "none")
  .attr("stroke", "green") // Use a different color to distinguish the curved line
  .attr("stroke-width", 2)
  .attr("d", curvedLine); // Calls the line generator


// Define a color scale with a domain of continents and a range of desired colors
var colorScale = d3.scaleOrdinal()
.domain(["North America", "Europe", "Asia", "Australia"])
.range(["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728"]);

// Modify the data array to include a 'continent' property for each city
data.forEach(function(d) {
if (["Houston", "Phoenix", "San Francisco", "Denver", "Los Angeles", "Detroit", "Boston", "Washington", "Chicago", "New York", "Toronto"].includes(d.city)) {
  d.continent = "North America";
} else if (["Frankfurt", "Brussels", "Hamburg", "Zurich", "Stockholm", "Vienna", "Copenhagen", "Paris", "Munich", "Amsterdam", "London"].includes(d.city)) {
  d.continent = "Europe";
} else if (["Singapore", "Tokyo", "Hong Kong"].includes(d.city)) {
  d.continent = "Asia";
} else if (["Perth", "Brisbane", "Melbourne", "Sydney"].includes(d.city)) {
  d.continent = "Australia";
}
});


//Plot Points////////////////////////////////////////////////////////////////////////////////////////

  // Add dots
var circles = svg.append('g')
  .selectAll("dot")
  .data(data)
  .enter()
  .append("circle")
    .attr("cx", function (d) { return x(d.density); } )
    .attr("cy", function (d) { return y(d.energy); } )
    .attr("r", 5)
    .style("fill", "#69b3a2")
    // Apply the color scale to the fill style of the circles
    .style("fill", function(d) { return colorScale(d.continent); });

    



//hover feature//////////////////////////////////////////////////////////////////////////////////////

    // Add white background for labels
var labelBackgrounds = svg.append('g')
  .selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
    .attr("x", function (d) { return x(d.density) - -10; }) // Adjust the position as needed
    .attr("y", function (d) { return y(d.energy) - 25; }) // Adjust the position as needed
    .attr("width", 100) // Width of the white box
    .attr("height", 20) // Height of the white box
    .style("fill", "white")
    .style("visibility", "hidden"); // Initially hidden

// Add labels
var labels = svg.append('g')
  .selectAll("text")
  .data(data)
  .enter()
  .append("text")
    .attr("x", function (d) { return x(d.density); })
    .attr("y", function (d) { return y(d.energy); })
    .style("font-family", "Arial, sans-serif") // Set the font family
    .style("font-size", "14px") // Set the font size
    .style("fill", "black")
    .text(function (d) { return d.city; })
    .style("visibility", "hidden");


// Show the white background when hovering over a circle
circles
  .on("mouseover", function(d) {
    d3.select(this).style("fill", "orange");
    labels
      .filter(function(labelData) {
        return labelData.city === d.city;
      })
      .attr("x", function(labelData) {
        // Move the label slightly away from the cursor (adjust as needed)
        return x(labelData.density) + 10;
      })
      .attr("y", function(labelData) {
        // Move the label slightly away from the cursor (adjust as needed)
        return y(labelData.energy) - 10;
      })
      .style("visibility", "visible")
      .text(function(labelData) {
        // Display city name, density, and energy
        return `${labelData.city}`;
      });
    labelBackgrounds
      .filter(function(labelData) {
        return labelData.city === d.city;
      })
      .style("visibility", "visible");
  })
  .on("mouseout", function(d) {
    d3.select(this).style("fill", function() { return colorScale(d.continent); });
    labels.style("visibility", "hidden");
    labelBackgrounds.style("visibility", "hidden");
  });



// Legend setup
var legend = svg.selectAll(".legend")
  .data(colorScale.domain())
  .enter().append("g")
  .attr("class", "legend")
  .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

// Draw legend colored rectangles with rounded corners
legend.append("rect")
  .attr("x", width - 18)
  .attr("width", 18)
  .attr("height", 18)
  .style("fill", colorScale)
  .attr("rx", 3)
  .attr("ry", 3);

// Draw legend text with Arial font
legend.append("text")
  .attr("x", width - 24)
  .attr("y", 9)
  .attr("dy", ".35em")
  .style("text-anchor", "end")
  .style("font-family", "Arial, sans-serif") // Set the font to Arial
  .text(function(d) { return d; });

