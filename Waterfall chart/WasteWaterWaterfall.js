//Data///////////////////////////////////////////////////////////////////////////////////////////

const beneficial = [
    { category: "Agriculture", value: 40 },
    { category: "Class A Products", value: 11 },
    { category: "Reclamation\nand Forestry", value: 2 },  // Modified label
    { category: "Monofill", value: 2 }
];

const nonBeneficial = [
    { category: "MSW Landfill", value: 30 },
    { category: "Incineration", value: 15 },
    { category: "Other", value: 1 }
];

// Calculate total values for beneficial and non-beneficial
const totalBeneficial = beneficial.reduce((acc, curr) => acc + curr.value, 0);
const totalNonBeneficial = nonBeneficial.reduce((acc, curr) => acc + curr.value, 0);

// Add total columns to the data
beneficial.push({ category: "Total Beneficial", value: totalBeneficial });
nonBeneficial.push({ category: "Total Non-Beneficial", value: totalNonBeneficial });

// Define your data
var data1 = beneficial;
var data2 = nonBeneficial;

// Calculate cumulative values for both datasets
[data1, data2].forEach(function(data, i) {
    data.forEach(function(d, j) {
      if (d.category.startsWith('Total')) {
        // If the category is a total, set the start to 0
        d.start = 0;
      } else if (j == 0) {
        d.start = 0;
      } else {
        d.start = data[j-1].start + data[j-1].value;
      }
      d.end = d.start + d.value;
    });
});

// Set up SVG and scales
var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 480 - margin.left - margin.right,  // Half the original width
    height = 500 - margin.top - margin.bottom;

var x1 = d3.scaleBand()
    .rangeRound([0, width])
    .padding(0.1)
    .domain(data1.map(function(d) { return d.category; }));  // Set domain for x1 scale

var x2 = d3.scaleBand()
    .rangeRound([0, width])
    .padding(0.1)
    .domain(data2.map(function(d) { return d.category; }));  // Set domain for x2 scale

var y = d3.scaleLinear()
    .rangeRound([height, 0])
    .domain([0, 60]);  // This sets the y-axis bounds from 0 to the maximum total

// Set up SVG and scales
var margin1 = {top: 20, right: 0, bottom: 30, left: 60},  // No right margin for the first graph
margin2 = {top: 20, right: 30, bottom: 30, left: 0},  // Original margins for the second graph
width = 480 - margin1.left - margin1.right,  // Half the original width
height = 500 - margin1.top - margin1.bottom;

// Create two SVGs side by side
var svg1 = d3.select("body").append("svg")
.attr("width", width + margin1.left)
.attr("height", height + margin1.top + margin1.bottom)
.append("g")
.attr("transform", "translate(" + margin1.left + "," + margin1.top + ")");

var svg2 = d3.select("body").append("svg")
.attr("width", width + margin2.right)
.attr("height", height + margin2.top + margin2.bottom)
.append("g")
.attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

var tooltip = d3.select("#tooltip");

// Define color scale for first graph
var color1 = d3.scaleOrdinal()
    .domain(data1.map(function(d) { return d.category; }))  // Set domain for color scale
    .range(["#E2E27A"]);  // Set range for color scale

// Define color scale for second graph
var color2 = d3.scaleOrdinal()
    .domain(data2.map(function(d) { return d.category; }))  // Set domain for color scale
    .range(["#8FC7E5"]);  // Set range for color scale

// Add this function to calculate the closest bar to the mouse
function closestBar(x, mouseX) {
    let minDist = Infinity;
    let closestBar;
    x.domain().forEach(function(d) {
        let dist = Math.abs(x(d) - mouseX);
        if (dist < minDist) {
            minDist = dist;
            closestBar = d;
        }
    });
    return closestBar;
}

// Tooltip show function
var showGroupTooltip = function (event, d, color, data) {
    var tooltip = d3.select("#tooltip");
    var htmlContent = "";

    if (d.category.startsWith('Total')) {
        // If the category is a total, display all rows of data
        data.forEach(function(row) {
            if (!row.category.startsWith('Total')) {
                htmlContent += `
                    <tr>
                        <td>
                            <span class="color-legend" style="background-color: ${color(row.category)};"></span>
                            ${row.category}
                        </td>
                        <td class="value">${row.value}%</td>
                    </tr>
                `;
            }
        });
    } else {
        // If the category is not a total, display the single row
        htmlContent = `
            <tr>
                <td>
                    <span class="color-legend" style="background-color: ${color(d.category)};"></span>
                    ${d.category}
                </td>
                <td class="value">${d.value}%</td>
            </tr>
        `;
    }

    tooltip
        .style("opacity", 0.9)
        .html(`
            <div class="tooltip-title">${d.category}</div>
            <table class="tooltip-content">
                ${htmlContent}
            </table>
            <table class="tooltip-total">
                <tr>
                    <td><strong>Total</strong></td>
                    <td class="value">${d.value}%</td>
                </tr>
            </table>
        `)
        .style("left", `${event.pageX+5}px`)
        .style("top", `${event.pageY+5}px`);
};

// Modify your createBars function to use the closestBar function
function createBars(svg, data, x, color) {
    var bars = svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", function(d) { return "bar bar--" + (d.value < 0 ? "negative" : "positive"); })
        .attr("x", function(d) { return x(d.category); })
        .attr("y", function(d) { return y(Math.max(0, d.end)); })  // This ensures the total columns start at 0
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return Math.abs(y(d.start) - y(d.end)); })
        .attr("fill", color.range()[0]);  // Use the first color for all categories

    // Add an invisible rectangle to listen for mouse events
    svg.append("rect")
        .attr("width", width)
        .attr("height", height)
        .style("fill", "none")
        .style("pointer-events", "all")
        .on("mousemove", function(event) {
            let mouseX = d3.pointer(event)[0];
            let bar = closestBar(x, mouseX/1.25);
            let d = data.find(d => d.category === bar);
            bars.style("fill-opacity", function(datum) {
                return datum.category === bar ? 0.8 : 1;
            });
            showGroupTooltip(event, d, color, data);
        })
        .on("mouseout", function() {
            bars.style("fill-opacity", 1);
            hideGroupTooltip();
        });
}

// Create bars for first graph
createBars(svg1, data1, x1, color1);

// Create bars for second graph
createBars(svg2, data2, x2, color2);


// Define the y-axis tick values
var yAxisTicks = [0, 10, 20, 30, 40, 50, 60];

// Add axes to both SVGs
[svg1, svg2].forEach(function(svg, i) {
  var x = i == 0 ? x1 : x2;  // Choose the correct x scale
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickSize(0))  // Add .tickSize(0) to remove ticks
      .selectAll(".tick text")
      .call(wrap, x.bandwidth());  // Wrap the text
  
  if (svg == svg1){
    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(y)
            .tickValues(yAxisTicks)  // Use the defined y-axis tick values
            .tickFormat(function(d) { return d + '%'; }));  // Add a % symbol next to the y-axis labels
  }
  function wrap(text, width) {
    text.each(function() {
      var text = d3.select(this),
          words = text.text().split(/\s+/).reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 1.1,  // ems
          y = text.attr("y"),
          dy = parseFloat(text.attr("dy")),
          tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
      while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
        }
      }
    });
  }
  
});

// Tooltip hide function
var hideGroupTooltip = function () {
    tooltip.style("opacity", 0);
};

// Create bars for first graph
createBars(svg1, data1, x1, color1);

// Create bars for second graph
createBars(svg2, data2, x2, color2);

// Add mouseover and mouseout events to the bars
svg1.selectAll(".bar").on("mouseover", showGroupTooltip).on("mouseout", hideGroupTooltip);
svg2.selectAll(".bar").on("mouseover", showGroupTooltip).on("mouseout", hideGroupTooltip);