// Your data
var treeData = {
    "name": "Total",
    "children": [
      { "name": "Drive Alone", "quantity": 115128, "fraction": "75%" },
      { "name": "Carpool", "quantity": 13605, "fraction": "9%" },
      { "name": "Public Transit", "quantity": 7045, "fraction": "5%" },
      { "name": "Work at Home", "quantity": 11153, "fraction": "7%" },
      { "name": "Walk", "quantity": 3955, "fraction": "3%" },
      { "name": "Bike", "quantity": 783, "fraction": "1%" },
      { "name": "Other (including taxi)", "quantity": 1997, "fraction": "1%" }
    ]
};

// Append the svg object to the body of the page
const svg = d3.select("#viz_container")
  .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", "-100 0 800 550") // Adjust the viewbox
    .attr("preserveAspectRatio", "xMinYMin");

// Get the width and height of the SVG
const width = +svg.node().getBoundingClientRect().width;
const height = +svg.node().getBoundingClientRect().height;

// Set dynamic margins
const margin = {
    top: height * 0.2,
    right: width * 0.05,
    bottom: height * 0.15,
    left: width * 0.3
};

// Calculate the width and height of the graph area
const graphWidth = width - margin.left - margin.right;
const graphHeight = height - margin.top - margin.bottom;

// Append a group element to the SVG, shifted according to the dynamic margins
svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Sort data in descending order by total value
treeData.children.sort((a, b) => b.quantity - a.quantity);

// X scale and Axis
const formater =  d3.format(".1s");
const xScale = d3.scaleLinear()
    .domain([0, d3.max(treeData.children, d => d.quantity)]) // Update the domain to reflect the quantity
    .range([0, width]);
svg.append('g')
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(xScale).ticks(7).tickSize(0).tickPadding(6).tickFormat(formater));

// Y scale and Axis
const yScale = d3.scaleBand()
  .domain(treeData.children.map(d => d.name)) // Use 'name' for Y axis
  .range([0, height])
  .padding(.2);
svg.append('g')
  .call(d3.axisLeft(yScale).tickSize(0).tickPadding(8))
    .call(g => g.select(".domain").remove()) // This line removes the Y-axis bar
  .selectAll('.tick') // Select all the ticks
  .on('mouseover', function(event, d) { // Add mouseover event
    d3.select(this).select('text').style('fill', 'orange').style('font-weight', 'bold'); // Change the color of the text to orange and make it bold on mouseover
    
    // Get the region data
    const regionData = treeData.children.find(data => data.name === d);

    // Define the tooltip
    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
    
    // Show the tooltip
    tooltip.style("opacity", 1);
    tooltip.html(
        `<div style="font-weight: bold; border-radius: 5px 5px 5px 5px; background-color: #f1eded;padding: 5px;">${regionData.name}</div>`
    )
    .style("left", (event.pageX + 10) + "px")
    .style("top", (event.pageY - 20) + "px");
  })
  .on('mouseout', function(d) { // Add a mouseout event
    d3.select(this).select('text').style('fill', '').style('font-weight', ''); // Reset the color and font weight of the text on mouseout
    // Hide the tooltip
    tooltip.style("opacity", 0);
  });

// Color palette
const color = d3.scaleOrdinal()
  .domain(treeData.children.map(d => d.name)) // Update the domain to reflect the names
  .range(['#18375F','#E2E27A','#386660','#8FC7E5','#FF5733','#C70039','#900C3F']); // Update the color palette

// Create bars
svg.selectAll("rect")
  .data(treeData.children)
  .enter()
  .append("rect")
      .attr("x", 0)
      .attr("y", d => yScale(d.name)) // Use 'name' for Y axis
      .attr("width",  d => xScale(d.quantity)) // Update the width to reflect the quantity
      .attr("height", yScale.bandwidth())
      .attr("fill", d => color(d.name)) // Update the fill to reflect the names







////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Your data
// var treeData = {
//     "name": "Total",
//     "children": [
//       { "name": "Drive Alone", "quantity": 115128, "fraction": "75%" },
//       { "name": "Carpool", "quantity": 13605, "fraction": "9%" },
//       { "name": "Public Transit", "quantity": 7045, "fraction": "5%" },
//       { "name": "Work at Home", "quantity": 11153, "fraction": "7%" },
//       { "name": "Walk", "quantity": 3955, "fraction": "3%" },
//       { "name": "Bike", "quantity": 783, "fraction": "1%" },
//       { "name": "Other (including taxi)", "quantity": 1997, "fraction": "1%" }
//     ]
// };

// // Append the svg object to the body of the page
// const svg = d3.select("#viz_container")
//   .append("svg")
//     .attr("width", "100%")
//     .attr("height", "100%")
//     .attr("viewBox", "-100 0 800 550") // Adjust the viewbox
//     .attr("preserveAspectRatio", "xMinYMin");

// // Get the width and height of the SVG
// const width = +svg.node().getBoundingClientRect().width;
// const height = +svg.node().getBoundingClientRect().height;

// // Set dynamic margins
// const margin = {
//     top: height * 0.2,
//     right: width * 0.05,
//     bottom: height * 0.15,
//     left: width * 0.3
// };

// // Calculate the width and height of the graph area
// const graphWidth = width - margin.left - margin.right;
// const graphHeight = height - margin.top - margin.bottom;

// // Append a group element to the SVG, shifted according to the dynamic margins
// svg.append("g")
//     .attr("transform", `translate(${margin.left}, ${margin.top})`);

// // Sort data in descending order by total value
// treeData.children.sort((a, b) => b.quantity - a.quantity);

// // X scale and Axis
// const formater =  d3.format(".1s");
// const xScale = d3.scaleBand()
//     .domain(treeData.children.map(d => d.name)) // Use 'name' for X axis
//     .range([0, width])
//     .padding(.2);
// svg.append('g')
//   .attr("transform", `translate(0, ${height})`)
//   .call(d3.axisBottom(xScale).tickSize(0).tickPadding(6));

// // Y scale and Axis
// const yScale = d3.scaleLinear()
//   .domain([0, d3.max(treeData.children, d => d.quantity)]) // Update the domain to reflect the quantity
//   .range([height, 0]);
// svg.append('g')
//   .call(d3.axisLeft(yScale).ticks(7).tickSize(0).tickPadding(8).tickFormat(formater))
//     .call(g => g.select(".domain").remove()) // This line removes the Y-axis bar

// // Color palette
// const color = d3.scaleOrdinal()
//   .domain(treeData.children.map(d => d.name)) // Update the domain to reflect the names
//   .range(['#18375F','#E2E27A','#386660','#8FC7E5','#FF5733','#C70039','#900C3F']); // Update the color palette

// // Create a tooltip div that is hidden by default
// const tooltip = d3.select("body")
//     .append("div")
//     .style("opacity", 0)
//     .attr("class", "tooltip")
//     .style("border", "2")
//     .style("border-width", "2px")
//     .style("border-radius", "5px")
//     .style("padding", "5px");

// // Create bars
// svg.selectAll("rect")
//   .data(treeData.children)
//   .enter()
//   .append("rect")
//       .attr("x", d => xScale(d.name)) // Use 'name' for X axis
//       .attr("y", d => yScale(d.quantity)) // Update the y position to reflect the quantity
//       .attr("width",  xScale.bandwidth())
//       .attr("height", d => height - yScale(d.quantity)) // Update the height to reflect the quantity
//       .attr("fill", d => color(d.name)) // Update the fill to reflect the names
//       .on("mouseover", function(event, d) { // Show tooltip on mouseover
//           d3.select(this).style("fill", "orange"); // Change the color of the bar to orange on mouseover
//           tooltip.style("opacity", 1);
//           tooltip.html(`<div class="tooltip-title" style="font-weight: bold; padding: 10px;"><span style="display: inline-block; width: 10px; height: 10px; background-color: ${color(d.name)}; margin-right: 5px;"></span>${d.name}: ${d.fraction}</div>`)
//             .style("left", (event.pageX + 15) + "px")
//             .style("top", (event.pageY + 25) + "px");
//       })
//       .on("mouseout", function() { // Hide tooltip on mouseout
//           d3.select(this).style("fill", d => color(d.name));
//           tooltip.style("opacity", 0);
//       });

//////////////////////////////////////////////////////////////////////////////////////////

// 

