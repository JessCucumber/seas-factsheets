// data////////////////////////////////////////////////////////////////////////////////////////////

var dataset = {
  GHG_Emissions: {
    "GHG Emissions Tracking": { "Policies/Activities Underway": "76%" }
  },
  Transportation: {
    "Bike Lanes": { "Policies/Activities Underway": "90%" },
    "Bus Transit": { "Policies/Activities Underway": "94%" },
    "Promote Bicycle commuting": { "Policies/Activities Underway": "85%" },
    "Bike-Share Program": { "Policies/Activities Underway": "58%" },
    "Partner with Business to Advance Climate Solutions in Transportation": { "Policies/Activities Underway": "30%" }
  },
  Green_Vehicles: {
    "Green Vehicle Procurement Policy": { "Policies/Activities Underway": "71%" },
    "Promote Installation of Private EV Charging Stations": { "Policies/Activities Underway": "50%" }
  },
  Renewable_Energy: {
    "Partner with Local governments to Advance Climate Solutions in energy": { "Policies/Activities Underway": "51%" },
    "Purchase Renewable Electricity for City Operations": { "Policies/Activities Underway": "67%" },
    "Partner with Local Governments to Advance Renewable Electricity": { "Policies/Activities Underway": "41%" }
  },
  Buildings: {
    "Partner with Local Governments to Advance Building Energy Efficiency": { "Policies/Activities Underway": "41%" },
    "Partner with Business to Advance Building Energy Efficiency": { "Policies/Activities Underway": "31%" },
    "Routine Energy Audits for Municipal Buildings / Operations": { "Policies/Activities Underway": "62%" },
    "Energy Efficiency Policies for new Municipal Buildings": { "Policies/Activities Underway": "30%" },
    "Energy Efficiency Policies for Existing Municipal Buildings": { "Policies/Activities Underway": "64%" },
    "Percentage of Cities": { "Policies/Activities Underway": "57%" }
  },


};




// Create an array from your dataset for easier processing
var data = [];
for (var category in dataset) {
  var underwaySum = 0;
  var consideringSum = 0;
  var count = 0;
  var items = [];
  for (var item in dataset[category]) {
    underwaySum += parseFloat(dataset[category][item]["Policies/Activities Underway"]);
    consideringSum += parseFloat(dataset[category][item]["Considering"]);
    items.push(item);
    count++;
  }
  // Format the category label to add spaces
  var formattedCategory = category.replace(/([A-Z])/g, ' $1').trim();
  data.push({
    category: formattedCategory, // Use the formatted category label
    type: "Policies/Activities Underway",
    value: underwaySum / count,
    items: items.join("\n")
  });
  data.push({
    category: formattedCategory, // Use the formatted category label
    type: "Considering",
    value: consideringSum / count,
    items: items.join("\n")
  });
}



// Set the dimensions and margins of the graph
var margin = {top: 20, right: 30, bottom: 40, left: 200},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// Append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Add X axis
var x = d3.scaleBand()
  .range([0, width])
  .domain(data.map(function(d) { return d.category; }))
  .padding(.3);

svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text") // slects x axis labels
  .style("font-size", "14px");

// Y axis
var y = d3.scaleLinear()
  .domain([0, 100])
  .range([height, 0]);

svg.append("g")
  .call(d3.axisLeft(y).tickFormat(function(d) {
    return d + "%"; // Add the percentage symbol to the labels
  }).tickValues([0, 40, 60, 80])) // Specify the ticks to display
  .select(".domain").style("display", "none"); // Hide the y-axis line

// Increase the base font size
var baseFontSize = 16; // Adjust this value as needed


  // Bars with animation
svg.selectAll("mybar")
  .data(data)
  .enter()
  .append("rect")
    .attr("x", function(d) { return x(d.category); })
    .attr("y", function(d) { return y(0); }) // Start at the bottom of the chart
    .attr("width", x.bandwidth())
    .attr("height", 0) // Start with a height of 0
    .attr("fill", "#69b3a2")
    .transition() // Start the animation
    .duration(2000) // Animation duration in milliseconds
    .attr("y", function(d) { return y(d.value); }) // End at the correct y position
    .attr("height", function(d) { return height - y(d.value); }); // End with the correct height

// Bars
svg.selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
    .attr("x", function(d) { return x(d.category); })
    .attr("y", function(d) { return y(d.value); }) 
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return height - y(d.value); }) 
    .attr("fill", "#69b3a2")

// Tooltip
var tooltip = d3.select("#my_dataviz")
  .append("div")
  .style("opacity", 0)
  .attr("class", "tooltip")
  // .style("position", "absolute")
  //.style("font-size: 16px")
  .style("background-color", "white")
  .style("border", "solid")
  .style("border-width", "1px")
  .style("border-color", "#CBE8EC")
  .style("border-radius", "5px")
  .style("padding", "10px")
  .style("box-shadow", "0px 0px 10px rgba(0, 0, 0, 0.5)") // Drop shadow
  //.style("max-width", "250px");

// Three functions that change the tooltip when user hover / move / leave a cell
var mouseover = function(d) {
  var items = d.items.split("\n");
  var longestItem = items.reduce(function(a, b) { return a.length > b.length ? a : b; }); // Find the longest item
  var textWidth = getTextWidth(longestItem, "1em sans-serif"); // Calculate the width of the longest item

  var htmlContent = "<div style='font-size: 1.25em; border-radius: 5px; background-color: #CBE8EC; padding: 5px;'><span style='font-weight: bold;'>" + d.value.toFixed(2) + "%</span></div>" +
                    "<div style='padding: 5px; text-align: left;'><span style='font-weight: bold; font-size: 1em;'>Policies:</span><br>" +
                    items.map(function(item) {
                      var percentage = dataset[d.category.replace(/ /g, '')][item]["Policies/Activities Underway"];
                      return "<span style='font-size: 1.5em;'>■</span> <span style='font-weight: bold;'>" + item + "</span> " + percentage;
                    }).join("<br>") + "</div>";

  tooltip.html(htmlContent)
    .style("opacity", 1)
    .style("left", (d3.mouse(this)[0]+70) + "px")
    .style("top", (d3.mouse(this)[1]) + "px")
    .style("width", textWidth + 100 + "px") // Set the width based on the longest item
    .style("height", "auto") // Set height to auto
    .style("visibility", "visible");
}


// Helper function to calculate text width
function getTextWidth(text, font) {
  // re-use canvas object for better performance
  var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
  var context = canvas.getContext("2d");
  context.font = font;
  var metrics = context.measureText(text);
  return metrics.width;
}



var mousemove = function(d) {
  tooltip.style("left", (d3.mouse(this)[0]+70) + "px")
    .style("top", (d3.mouse(this)[1]) + "px");
}
var mouseleave = function(d) {
  tooltip.style("opacity", 0);
}

// Add the mouseover, mousemove, and mouseleave functions to the bars
svg.selectAll("rect")
  .on("mouseover", mouseover)
  .on("mousemove", mousemove)
  .on("mouseleave", mouseleave);





