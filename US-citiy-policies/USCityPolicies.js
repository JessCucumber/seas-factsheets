// Function to add spaces between capitalized letters
function addSpaces(string) {
  if (string === "GHGEmissions") {
    return "GHG Emissions";
  }
  return string.replace(/([A-Z])/g, ' $1').trim();
}
// Data
var dataset = {
  GHGEmissions: {
      "GHG Emissions Tracking": { "Policies/Activities Underway": "76%" }
  },
  Transportation: {
      "Bike Lanes": { "Policies/Activities Underway": "90%" },
      "Bus Transit": { "Policies/Activities Underway": "94%" },
      "Promote Bicycle commuting": { "Policies/Activities Underway": "85%" },
      "Bike-Share Program": { "Policies/Activities Underway": "58%" },
      "Partner with Business to Advance Climate Solutions in Transportation": { "Policies/Activities Underway": "30%" }
  },
  GreenVehicles: {
      "Green Vehicle Procurement Policy": { "Policies/Activities Underway": "71%" },
      "Promote Installation of Private EV Charging Stations": { "Policies/Activities Underway": "50%" }
  },
  RenewableEnergy: {
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

(function () {
  const aspectRatio = 0.75; // Define an aspect ratio for the chart

  // Get the container and its dimensions
  const container = document.getElementById("interactive-map");
  const containerWidth = container.offsetWidth; // Use offsetWidth for full element width
  const containerHeight = containerWidth * aspectRatio; // Calculate the height based on the width and aspect ratio

  // Calculate the dynamic margins
  const dynamicMargin = {
      top: containerHeight * 0.05, // 5% of the container height
      right: containerWidth * 0.05, // 5% of the container width
      bottom: containerHeight * 0.15, // 15% of the container height
      left: containerWidth * 0.08, // 8% of the container width
  };

  // Calculate the width and height for the inner drawing area
  const width = containerWidth - dynamicMargin.left - dynamicMargin.right;
  const height = containerHeight - dynamicMargin.top - dynamicMargin.bottom;

  // Append SVG object
  const svg = d3
      .select("#column-chart")
      .append("svg")
      .attr("viewBox", `0 0 ${containerWidth} ${containerHeight}`)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .append("g")
      .attr("transform", `translate(${dynamicMargin.left},${dynamicMargin.top})`);
  
  // Define the tooltip
  var tooltip = d3.select("#tooltip");

// Calculate the average percentage for each category
var averages = {};
for (const [category, activities] of Object.entries(dataset)) {
  let sum = 0;
  let count = 0;
  for (const [activity, values] of Object.entries(activities)) {
      sum += parseInt(values["Policies/Activities Underway"]);
      count++;
  }
  let average = sum / count;
  averages[category] = {
      "Average Policies/Activities Underway": { "Policies/Activities Underway": average.toFixed(2) + "%" }
  };
}

// Transform the dataset into a suitable format
const data = [];
for (const [category, activities] of Object.entries(averages)) {
    for (const [activity, values] of Object.entries(activities)) {
        data.push({
            Category: category,
            Activity: activity,
            "Policies/Activities Underway": parseInt(values["Policies/Activities Underway"]),
        });
    }
}



  // List of subgroups
  const subgroups = ["Policies/Activities Underway"];
  
  // List of groups
  const groups = data.map(d => d.Category); // Change this line to use 'Category' instead of 'Activity'

  // Add X axis
  const x = d3.scaleBand().domain(groups).range([0, width]).padding(0.2);
  
  svg
      .append("g")
      .attr("class", "chart-labels")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).tickSize(0))
      .selectAll("text")
      .text(function(d) { return addSpaces(d); })
      .attr("y", 10)
      .attr("x", -30)
      .attr("dy", ".35em")
      .style("text-anchor", "start")
      .style("text-align", "center");

  // Add Y axis
  const y = d3
      .scaleLinear()
      .domain([0, 100])
      .nice()
      .range([height, 0]);
  
  svg
      .append("g")
      .attr("class", "chart-labels")
      .call(d3.axisLeft(y).tickFormat(d => `${d}%`).ticks(6));
  
  // Another scale for subgroup position
  const xSubgroup = d3
      .scaleBand()
      .domain(subgroups)
      .range([0, x.bandwidth()])
      .padding(0.05);
  
  // Color palette
  const color = d3
      .scaleOrdinal()
      .domain(subgroups)
      .range(["#3167a4"]);
  
  // Tooltip show function
  var showGroupTooltip = function (event, d) {
    // Get the activities for this category from the original dataset
    var activities = dataset[d.Category];

    // Start the HTML string for the tooltip
    var tooltipHtml = `<div class="tooltip-title">${d.Category}</div><table class="tooltip-content">`;

    // Initialize total
    var total = 0;

    // Iterate over the activities and add each one to the tooltip
    for (const [activity, values] of Object.entries(activities)) {
      var value = parseInt(values["Policies/Activities Underway"]);
      total += value;
      tooltipHtml += `
        <tr>
          <td>
            <span class="color-legend" style="background-color: ${color("Policies/Activities Underway")};"></span>
            ${activity}
          </td>
          <td class="value">${value}%</td>
        </tr>
      `;
    }

    // Add total to the tooltip
    tooltipHtml += `
      <table class="tooltip-total">
        <tr>
          <td>Average</td>
          <td class="value">${averages[d.Category]["Average Policies/Activities Underway"]["Policies/Activities Underway"]}</td>
        </tr>
      </table>
    `;

    // Close the HTML string for the tooltip
    tooltipHtml += `</table>`;

    // Set the HTML of the tooltip
    tooltip.style("opacity", 0.9).html(tooltipHtml).style("left", `${event.pageX}px`).style("top", `${event.pageY}px`);
  };

  // Tooltip hide function
  var hideGroupTooltip = function () {
    tooltip.style("opacity", 0);
  };

  // Grouped bar chart code
  svg
    .append("g")
    .selectAll("g")
    // Group data by 'Category' instead of 'Activity'
    .data(d3.group(data, d => d.Category))
    .enter()
    .append("g")
    .attr("class", "bar-group")
    .attr("transform", d => `translate(${x(d[0])},0)`)
    .selectAll("rect")
    .data(d => d[1].map(item => ({...item, key: "Policies/Activities Underway", value: item["Policies/Activities Underway"], Category: d[0]}))) // Add 'Category' to the data
    .enter()
    .append("rect")
    .attr("x", d => xSubgroup(d.key))
    .attr("y", d => y(d.value))
    .attr("width", xSubgroup.bandwidth())
    .attr("height", d => height - y(d.value))
    .attr("fill", d => color(d.key))
    .on("mouseover", showGroupTooltip) // Move the event handlers here
    .on("mouseout", hideGroupTooltip);
})();


  //seprate the groups into their own grouped bars together
  //No average, but you can see each category together