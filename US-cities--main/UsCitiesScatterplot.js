//Data///////////////////////////////////////////////////////////////////////////////////////////

// Data for the scatter plot (converted from the CSV)
var data = [
  { city: "Sacramento", density: 12.7, energy: 76673 },
  { city: "Houston", density: 9.5, energy: 71624 },
  { city: "Phoenix", density: 10.5, energy: 64641 },
  { city: "San Diego", density: 13.1, energy: 67248 },
  { city: "Denver", density: 12.8, energy: 68286 },
  { city: "San Francisco", density: 16, energy: 65890 },
  { city: "Detroit", density: 12.8, energy: 62744 },
  { city: "Los Angeles", density: 23.9, energy: 62167 },
  { city: "Washington", density: 13.7, energy: 60454 },
  { city: "Boston", density: 12, energy: 58391 },
  { city: "Chicago", density: 16.6, energy: 56121 },
  { city: "New York", density: 19.2, energy: 51626 },
  { city: "Calgary", density: 20.8, energy: 47133 },
  { city: "Canberra", density: 9.5, energy: 44995 },
  { city: "Brisbane", density: 9.8, energy: 41395 },
  { city: "Perth", density: 10.6, energy: 41395 },
  { city: "Melbourne", density: 14.9, energy: 39277 },
  { city: "Winnipeg", density: 21.3, energy: 39366 },
  { city: "Vancouver", density: 20.8, energy: 37211 },
  { city: "Adelaide", density: 11.8, energy: 37103 },
  { city: "Hamburg", density: 39.8, energy: 36716 },
  { city: "Frankfurt", density: 46.6, energy: 38293 },
  { city: "Zurich", density: 47.1, energy: 25244 },
  { city: "Stockholm", density: 53.1, energy: 26817 },
  { city: "Brussels", density: 74.9, energy: 28895 },
  { city: "Paris", density: 46.1, energy: 24241 },
  { city: "London", density: 42.3, energy: 23374 },
  { city: "Kuala Lumpur", density: 58.7, energy: 20017 },
  { city: "Amsterdam", density: 48.8, energy: 19843 },
  { city: "Copenhagen", density: 28.6, energy: 20385 },
  { city: "Vienna", density: 68.3, energy: 20603 },
  { city: "Tokyo", density: 71, energy: 18243 },
  { city: "Bangkok", density: 149.3, energy: 18176 },
  { city: "Munich", density: 53.6, energy: 18107 },
  { city: "Singapore", density: 86.8, energy: 18079 },
  { city: "Seoul", density: 244.8, energy: 9615 },
  { city: "Hong Kong", density: 300.5, energy: 9612 },
  { city: "Jakarta", density: 170.8, energy: 9072 },
  { city: "Manila", density: 198, energy: 7335 },
  { city: "Surabaya", density: 176.9, energy: 5611 }
];




//Adding Graph & setting dimensions///////////////////////////////////////////////////////////////

// Function to calculate responsive margins
function getResponsiveMargins() {
  var screenWidth = window.innerWidth;
  var screenHeight = window.innerHeight;
  var margin = { top: 40, right: 20, bottom: 60, left: 90 };

  // Adjust margins if the screen is too big
  if (screenWidth > 500) {
    margin.left = screenWidth * 0.15;
    margin.right = screenWidth * 0.2;
  }

  if (screenHeight > 500) {
    margin.top = screenHeight * 0.1;
    margin.bottom = screenHeight * .3;
  }

  return margin;
}

// Set the original width and the target width
var originalWidth = 440; // The width you're scaling from
var targetWidth = 360;   // The desired width

// Calculate the aspect ratio for the responsive design
var aspectRatio = targetWidth / originalWidth;

// Get responsive margins
var margin = getResponsiveMargins();

// Calculate width and height based on current window size and responsive margins
var width = Math.min(targetWidth, window.innerWidth - margin.left - margin.right);
var height = width * aspectRatio;

// Append the svg object to the body of the page
var svg = d3.select("#scatter")
  .append("svg")
    // Using th 'viewBox' attribute to make the SVG responsive
    .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
    // Optionally, set the 'preserveAspectRatio' attribute to keep the SVG centered
    .attr("preserveAspectRatio", "xMidYMid meet")
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
   
//Axis/////////////////////////////////////////////////////////////////////////////////////////////
// Add X axis
var x = d3.scaleLinear()
  .domain([0, d3.max(data, function(d) { return d.density; }) + 50])
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
  .text("(Inhabitants per Hectare)")



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

// Define the power regression function
powerRegression = d3.regressionPow()
  .x(d => d.density)
  .y(d => d.energy)
  .domain(d3.extent(data, d => d.density));

// Compute the power regression line
var trendline = powerRegression(data);

// Define the line
var line = d3.line()
  .x(function(d) { return x(d[0]); })
  .y(function(d) { return y(d[1]); });

// Add the trend line to the graph
svg.append("path")
  .datum(trendline)
  .attr("fill", "none")
  .attr("stroke", "gray")
  .attr("stroke-width", 2)
  .attr("d", line);

// Define a color scale with a domain of continents and a range of desired colors
var colorScale = d3.scaleOrdinal()
.domain(["North America", "Europe", "Asia", "Australia"])
.range(["#8FC7E5", "#386660", "#3167A3", "#1D476D"]);

// Modify the data array to include a 'continent' property for each city
data.forEach(function(d) {
  if (["Sacramento", "Houston", "Phoenix", "San Diego", "San Francisco", "Denver", "Los Angeles", "Detroit", "Boston", "Washington", "Chicago", "New York", "Toronto", "Calgary", "Winnipeg", "Vancouver", "Ottawa"].includes(d.city)) {
      d.continent = "North America";
  } else if (["Frankfurt", "Brussels", "Hamburg", "Zurich", "Stockholm", "Vienna", "Copenhagen", "Paris", "Munich", "Amsterdam", "London"].includes(d.city)) {
      d.continent = "Europe";
  } else if (["Singapore", "Tokyo", "Hong Kong", "Kuala Lumpur", "Jakarta", "Bangkok", "Seoul", "Manila", "Surabaya"].includes(d.city)) {
      d.continent = "Asia";
  } else if (["Perth", "Brisbane", "Melbourne", "Sydney", "Canberra", "Adelaide"].includes(d.city)) {
      d.continent = "Australia";
  }
});



//Plot Points////////////////////////////////////////////////////////////////////////////////////////

// Add dots with hover functionality
const circles = svg.append('g')
  .selectAll("circle")
  .data(data)
  .join("circle")
    .attr("cx", d => x(d.density))
    .attr("cy", d => y(d.energy))
    .attr("r", 5)
    .style("fill", d => colorScale(d.continent))
// Add mouseover event
.on("mouseover", function(event, d) {
  // Change the circle color to light orange
  d3.select(this)
    .transition()
    .duration(100)
    .attr("r", 7) // Optionally increase the radius
    .style("fill", "#E2E27A");

  // Create a label for the city name with a white background
  var text = svg.append("text")
    .attr("id", "t" + d.city.replace(/\s+/g, ''))
    .attr("x", x(d.density))
    .attr("y", y(d.energy) - 10)
    .text(d.city)
    .style("font-size", "12px")
    .style("font-weight", "bold")
    .style("font-family", "Arial")
    .style("text-anchor", "right")
    .style("pointer-events", "none");

  // Create a white rectangle behind the text for better visibility
  var bbox = text.node().getBBox();
  var padding = 2;
  svg.insert("rect", "#t" + d.city.replace(/\s+/g, ''))
    .attr("x", bbox.x - padding)
    .attr("y", bbox.y - padding)
    .attr("width", bbox.width + (padding * 2))
    .attr("height", bbox.height + (padding * 2))
    .attr("id", "r" + d.city.replace(/\s+/g, ''))
    .style("fill", "white")
    .style("pointer-events", "none");
})
// Add mouseout event
.on("mouseout", function(event, d) {
  // Reset the circle color
  d3.select(this)
    .transition()
    .duration(100)
    .attr("r", 5)
    .style("fill", d => colorScale(d.continent));

  // Remove the city name label and the white rectangle
  d3.select("#t" + d.city.replace(/\s+/g, '')).remove();
  d3.select("#r" + d.city.replace(/\s+/g, '')).remove();
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

