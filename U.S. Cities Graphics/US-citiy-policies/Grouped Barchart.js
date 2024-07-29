// // Data
// var dataset = {
//   GHGEmissions: {
//     "GHG Emissions Tracking": { "Policies/Activities Underway": "76%" }
//   },
//   Transportation: {
//     "Bus Transit": { "Policies/Activities Underway": "94%" },
//     "Bike Lanes": { "Policies/Activities Underway": "90%" },
//     "Promote Bicycle commuting": { "Policies/Activities Underway": "85%" },
//     "Bike-Share Program": { "Policies/Activities Underway": "58%" },
//     "Partner with Business to Advance Climate Solutions in Transportation": { "Policies/Activities Underway": "30%" }
//   },
//   GreenVehicles: {
//     "Green Vehicle Procurement Policy": { "Policies/Activities Underway": "71%" },
//     "Promote Installation of Private EV Charging Stations": { "Policies/Activities Underway": "50%" }
//   },
//   RenewableEnergy: {
//     "Purchase Renewable Electricity for City Operations": { "Policies/Activities Underway": "67%" },
//     "Partner with Local governments to Advance Climate Solutions in energy": { "Policies/Activities Underway": "51%" },
//     "Partner with Local Governments to Advance Renewable Electricity": { "Policies/Activities Underway": "41%" }
//   },
//   Buildings: {
//     "Energy Efficiency Policies for Existing Municipal Buildings": { "Policies/Activities Underway": "64%" },
//     "Routine Energy Audits for Municipal Buildings / Operations": { "Policies/Activities Underway": "62%" },
//     "Percentage of Cities": { "Policies/Activities Underway": "57%" },
//     "Partner with Local Governments to Advance Building Energy Efficiency": { "Policies/Activities Underway": "41%" },
//     "Partner with Business to Advance Building Energy Efficiency": { "Policies/Activities Underway": "31%" },
//     "Energy Efficiency Policies for new Municipal Buildings": { "Policies/Activities Underway": "30%" },
//   },
// };

// // Transform the data into a format suitable for the chart
// var data = [];
// for (var category in dataset) {
//   for (var policy in dataset[category]) {
//     for (var status in dataset[category][policy]) {
//       data.push({
//         category: category,
//         policy: policy,
//         status: status,
//         percentage: parseFloat(dataset[category][policy][status])
//       });
//     }
//   }
// }

// // Set the dimensions and margins of the graph
// const margin = {top: 100, right: 20, bottom: 50, left: 40};
// const width = 450 - margin.left - margin.right;
// const height = 350 - margin.top - margin.bottom;

// // Append the svg object to the body of the page
// const svg = d3.select("#column-chart")
//   .append("svg")
//     .attr("width", "100%")
//     .attr("height", "100%")
//     .attr("viewBox", "0 0 450 350")
//     .attr("preserveAspectRatio", "xMinYMin")
//   .append("g")
//     .attr("transform", `translate(${margin.left}, ${margin.top})`);

// // Define the order of categories
// var categoriesOrder = ["Transportation", "GHGEmissions", "GreenVehicles", "RenewableEnergy", "Buildings"];

// // X scale and Axis
// const xScale = d3.scaleBand()
//   .domain(categoriesOrder) // Use the defined order of categories
//   .range([0, width])
//   .padding(.93);

// const xAxis = svg
//   .append('g')
//   .attr("transform", `translate(0,${height})`)
//   .call(d3.axisBottom(xScale).tickSize(0).tickPadding(8));

//   xAxis
//   .selectAll("text")  
//   .style("text-anchor", "end")
//   .attr("dx", "-.8em")
//   .attr("dy", ".15em")
//   .each(function(d) {
//     const text = d3.select(this);
//     const words = d.split(/(?=[A-Z])/); // Split the label at each capital letter
//     text.text(''); // Clear the current text
//     for (let i = 0; i < words.length; i++) {
//       text.append('tspan') // Append a new 'tspan' element for each word
//         .text(words[i])
//         .attr('x', 0)
//         .attr('dy', i ? '1.2em' : 0); // Move subsequent words down
//     }
//   });



// // Y scale and Axis
// const yScale = d3.scaleLinear()
//     .domain([0, 100])
//     .range([height, 0]);

// svg
//   .append('g')
//   .call(d3.axisLeft(yScale)
//     .ticks(5)
//     .tickSize(0)
//     .tickPadding(6)
//     .tickFormat(d => `${d}%`)); // This is the new line

// // Define the color scale
// var color = d3.scaleOrdinal()
//   .domain(["Policy1", "Policy2", "Policy3", "Policy4", "Policy5", "Policy6", "Policy7", "Policy8", "Policy9", "Policy10", "Policy11", "Policy12", "Policy13", "Policy14", "Policy15", "Policy16", "Policy17"])
//   .range(["#CE5845", "#8FC8E5", "#3167A4","#17476D", "#1C476D", "#00274c",  "#32a28d", "#386660", "#E2E27A","#FED679", "#FFCB05", "#ED974A","#E2A15E","#D18146","#C67046","#A25627","#343333" ]);

// // Calculate the maximum number of policies in any category
// var maxNumPolicies = Math.max(...Object.values(dataset).map(d => Object.keys(d).length));

// // Set a fixed width for the bars
// const barWidth = xScale.bandwidth()*12 / maxNumPolicies; // Adjust the bar width based on the number of policies

// // Modify the x-position of each bar
// bars = svg.append("g")
//   .selectAll("g")
//   .data(data)
//   .join("g")
//      .attr("transform", d => "translate(" + xScale(d.category) +", -.5)")
//   .selectAll("rect")
//   .data(d => [d])
//   .join("rect")
//   .attr("x", d => {
//     // Get the index of the policy within the category
//     var policyIndex = Object.keys(dataset[d.category]).indexOf(d.policy);
//     // Calculate the x-position based on the policy index and bar width
//     return policyIndex * barWidth-30;
//   })
//   .attr("y", d => yScale(d.percentage))
//   .attr("width", barWidth) // Use the calculated bar width
//   .attr("height", d => height - yScale(d.percentage))
//   .attr("fill", d => color(d.policy));

// // Create a tooltip div that is hidden by default:
// const tooltip = d3.select("#tooltip");

// bars.on("mouseover", function(event, d) {
//   // This is where the tooltip generation starts
//   let tooltipHtml = "<table>";

//   // Add a title row to the tooltip
//   tooltipHtml += `
//     <tr>
//       <th class="tooltip-title" colspan="2">${d.category}</th>
//     </tr>
//   `;

//   // Iterate over the policies in the same category and add each one to the tooltip
//   for (const [policy, values] of Object.entries(dataset[d.category])) {
//     var value = parseFloat(values["Policies/Activities Underway"]);
//     tooltipHtml += `
//       <tr>
//         <td>
//           <span class="color-legend" style="background-color: ${color(policy)};"></span>
//           ${policy}
//         </td>
//         <td class="value">${value}%</td>
//       </tr>
//     `;
//   }

//   tooltipHtml += "</table>";

//   // Show the tooltip
//   tooltip.html(tooltipHtml)
//     .style("left", (event.pageX + 15) + "px")
//     .style("top", (event.pageY - 28) + "px")
//     .transition()
//     .duration(200)
//     .style("opacity", .9);
// })

// .on("mouseout", function(d) {
//   // Hide the tooltip
//   tooltip.transition()
//     .duration(500)
//     .style("opacity", 0);
// });


// //create a different static version: table vs just the graph
// //here's an example, for more information, or a better vrsion, visit ccss,..... 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var treeData = {
  "name": "Total",
  "children": [
      {
          "name": "GHG Emissions",
          "children": [
              { "name": "GHG Emissions Tracking", "quantity": 76, "fraction": "76%" }
          ]
      },
      {
          "name": "Transportation",
          "children": [
              { "name": "Bus Transit", "quantity": 94, "fraction": "94%" },
              { "name": "Bike Lanes", "quantity": 90, "fraction": "90%" },
              { "name": "Promote Bicycle commuting", "quantity": 85, "fraction": "85%" },
              { "name": "Bike-Share Program", "quantity": 58, "fraction": "58%" },
              { "name": "Partner with Business to Advance Climate Solutions in Transportation", "quantity": 30, "fraction": "30%" }
          ]
      },
      {
          "name": "Green Vehicles",
          "children": [
              { "name": "Green Vehicle Procurement Policy", "quantity": 71, "fraction": "71%" },
              { "name": "Promote Installation of Private EV Charging Stations", "quantity": 50, "fraction": "50%" }
          ]
      },
      {
          "name": "Renewable Energy",
          "children": [
              { "name": "Purchase Renewable Electricity for City Operations", "quantity": 67, "fraction": "67%" },
              { "name": "Partner with Local governments to Advance Climate Solutions in energy", "quantity": 51, "fraction": "51%" },
              { "name": "Partner with Local Governments to Advance Renewable Electricity", "quantity": 41, "fraction": "41%" }
          ]
      },
      {
          "name": "Buildings",
          "children": [
              { "name": "Energy Efficiency Policies for Existing Municipal Buildings", "quantity": 64, "fraction": "64%" },
              { "name": "Routine Energy Audits for Municipal Buildings / Operations", "quantity": 62, "fraction": "62%" },
              { "name": "Percentage of Cities", "quantity": 57, "fraction": "57%" },
              { "name": "Partner with Local Governments to Advance Building Energy Efficiency", "quantity": 41, "fraction": "41%" },
              { "name": "Partner with Business to Advance Building Energy Efficiency", "quantity": 31, "fraction": "31%" },
              { "name": "Energy Efficiency Policies for new Municipal Buildings", "quantity": 30, "fraction": "30%" }
          ]
      }
  ]
};


  var margin = {top: 20, right: 90, bottom: 30, left: 90},
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;
  
  var svg = d3.select("#viz_container").append("svg")
  .attr("width", width + margin.right + margin.left)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  var treemap = d3.treemap()
  .size([width, height])
  .padding(2);
  
  var color = d3.scaleOrdinal()
  .domain(["GHG Emissions", "Transportation", "Green Vehicles", "Renewable Energy", "Buildings"])
  .range(["#C6E3E0", "#E2E27A", "#386660", "#8FC7E5", "#3167A3", "#1D476D", "#A6B93D"]);
  
  function drawTreeMap(data) {
    svg.selectAll("*").remove();  // Clear the existing tree map
  
var root = d3.hierarchy(data)
    .eachBefore(function(d) {
        d.data.value = d.data.children ? 
            d3.sum(d.data.children, function(c) { return c.quantity; }) : // Calculate the sum if there are children
            d.data.quantity;  // Otherwise, use the quantity attribute
    })
    .sum(function(d) { return d.value; })
    .sort(function(a, b) { return b.height - a.height || b.value - a.value; });

  
    treemap(root);
  
    var tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .style("z-index", "10");  // Add a high z-index
  
    var nodes = svg.selectAll("g")
      .data(root.children)  // Use children to get only the categories
      .enter()
      .append("g")
      .attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; });
  
// ... rest of your code ...

nodes.append("rect")
    .attr("width", function(d) { return d.x1 - d.x0; })
    .attr("height", function(d) { return d.y1 - d.y0; })
    .style("fill", function(d) { return color(d.data.name); })  // Use the color scale
    .on("mouseover", function(event, d) {
        // Store the original color
        d3.select(this).attr('data-original-color', d3.select(this).style("fill"));
        // Highlight the bar
        d3.select(this).style("fill", "orange");

        // Prepare the tooltip data
        var tooltipData = d.data.children.map(child => {
            return `<tr>
                <td><div style="width:10px; height:10px; background-color:${color(child.name)};"></div></td>
                <td>${child.name}</td>
                <td style="text-align: right">${child.fraction}</td> <!-- Add the style here -->
                </tr>`;
        }).join("");

        // Show the tooltip
        tooltip.style("opacity", 1);
        tooltip.html(
            `<div style="font-weight: bold; border-radius: 5px 5px 0 0; background-color: #f1eded;padding: 5px;">${d.data.name}</div>
            <table>
                ${tooltipData}
            </table>`
        )
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 28) + "px");
    })
    .on("mousemove", function(event, d) {
        // Update the tooltip position as the mouse moves
        tooltip.style("left", (event.pageX + 10) + "px")
               .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseleave", function(d) {
        d3.select(this).style("fill", d3.select(this).attr('data-original-color'));  // Restore the original color on mouseout
        tooltip.style("opacity", 0);

        // Remove the transition that makes the tooltip fade away
    });


    nodes.append("text")
      .each(function(d) {
          var boxWidth = (d.x1 - d.x0) - 20;  // Subtract a value to make the box narrower
          var words = d.data.name.split(' ');
          var text = '';
          var tspan = d3.select(this).append('tspan')
              .attr("x", function(d) { return (d.x1 - d.x0) / 2; })
              .attr("y", function(d) { return (d.y1 - d.y0) / 2; })
              .attr("text-anchor", "middle")
              .attr("dominant-baseline", "middle")
              .style("font-size", "20px");  // Set a fixed font size
  
          for (var i = 0; i < words.length; i++) {
              tspan.text(text + ' ' + words[i]);
              if (tspan.node().getComputedTextLength() > boxWidth) {
                  text = words[i];
                  tspan = d3.select(this).append('tspan')
                      .attr("x", function(d) { return (d.x1 - d.x0) / 4; })
                      .attr("dy", "1.2em")
                      .attr("text-anchor", "middle")
                      .attr("dominant-baseline", "middle")
                      .style("font-size", "20px")  // Set a fixed font size
                      .text(text);
              } else {
                  text = tspan.text();
              }
          }
      });
  }
  
  drawTreeMap(treeData);
  