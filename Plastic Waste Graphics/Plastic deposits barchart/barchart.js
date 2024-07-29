const individual_data = [
    { state: "California", otherRecycling: 60, depositDetails: "5¢ (<24 oz.) 10¢ (≥24 oz.)" },
    { state: "Connecticut", returnDeposit: 46 },
    { state: "Hawaii", returnDeposit: 37 }, 
    { state: "Iowa", returnDeposit: 56 }, 
    { state: "Maine", otherRecycling: 78, depositDetails: "15¢ (wine/liquor) 5¢ (all others)" },
    { state: "Massachusetts", returnDeposit: 54 }, 
    { state: "Michigan", otherRecycling: 53, depositDetails: "10¢" },
    { state: "New York", returnDeposit: 55 }, 
    { state: "Oregon", otherRecycling: 68, depositDetails: "10¢ 2¢ (standard refillable)" },
    { state: "Vermont", otherRecycling: 53, depositDetails: "15¢ (liquor) 5¢ (all others)" },
    { state: "Alabama", noDeposit: 10 },
    { state: "Alaska", noDeposit: 8 },
    { state: "Arizona", noDeposit: 13 },
    { state: "Arkansas", noDeposit: 11 },
    { state: "Colorado", noDeposit: 11 },
    { state: "Delaware", noDeposit: 23 }, 
    { state: "Florida", noDeposit: 15 },
    { state: "Georgia", noDeposit: 14 },
    { state: "Idaho", noDeposit: 14 },
    { state: "Illinois", noDeposit: 19 },
    { state: "Indiana", noDeposit: 19 },
    { state: "Kansas", noDeposit: 23 }, 
    { state: "Kentucky", noDeposit: 13 },
    { state: "Louisiana", noDeposit: 6 },
    { state: "Maryland", noDeposit: 35 },
    { state: "Minnesota", noDeposit: 43 },
    { state: "Mississippi", noDeposit: 8 },
    { state: "Missouri", noDeposit: 18 },
    { state: "Montana", noDeposit: 13 },
    { state: "Nebraska", noDeposit: 13 },
    { state: "Nevada", noDeposit: 10 },
    { state: "New Hampshire", noDeposit: 27 },
    { state: "New Jersey", noDeposit: 39 },
    { state: "New Mexico", noDeposit: 19 },
    { state: "North Carolina", noDeposit: 16 },
    { state: "North Dakota", noDeposit: 21 },
    { state: "Ohio", noDeposit: 17 },
    { state: "Oklahoma", noDeposit: 9 },
    { state: "Pennsylvania", noDeposit: 21 },
    { state: "Rhode Island", noDeposit: 34 },
    { state: "South Carolina", noDeposit: 8 },
    { state: "South Dakota", noDeposit: 23 },
    { state: "Tennessee", noDeposit: 8 },
    { state: "Texas", noDeposit: 11 },
    { state: "Utah", noDeposit: 15 },
    { state: "Virginia", noDeposit: 19 },
    { state: "Washington", noDeposit: 30 },
    { state: "West Virginia", noDeposit: 3 },
    { state: "Wisconsin", noDeposit: 29 },
    { state: "Wyoming", noDeposit: 13 }
];



// Sort the data within each category
individual_data.sort((a, b) => {
    const aCategory = Object.keys(a).find(key => key !== "state" && a[key]);
    const bCategory = Object.keys(b).find(key => key !== "state" && b[key]);
    return b[bCategory] - a[aCategory];
});

// Set the dimensions of the canvas
var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

// Set the ranges
var x = d3.scaleBand().range([0, width]).padding(0.05);
var y = d3.scaleLinear().range([height, 0]);

// Define the axis
var xAxis = d3.axisBottom(x).tickSize(0).tickFormat(""); // Remove tick marks and labels
var yAxis = d3.axisLeft(y).ticks(4).tickFormat(d => d + '%').tickSize(0); // Add % to labels and remove tick marks

// Add the SVG element
var svg = d3.select("#viz_container").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

// Scale the range of the data
x.domain(individual_data.map(function(d) { return d.state; }));
y.domain([0, 100]); // Set y-axis up to 100%

//add x axis
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

// Add the y-axis
svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
  .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Percentage");

// Define the tooltip
var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// Define the tooltip titles
var tooltipTitles = {
    "noDeposit": "No Return Deposit",
    "returnDeposit": "$0.05 Return Deposit",
    "otherRecycling": "Other Return Deposits"
};

// Define the colors
var colors = {
    "noDeposit": "#E2E27A",
    "returnDeposit": "#8FC7E5",
    "otherRecycling": "#1D476D"
};

// Add the bars
var bars = svg.selectAll(".bar")
    .data(individual_data)
  .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d.state); })
    .attr("width", x.bandwidth())
    .attr("y", function(d) { return y(d.noDeposit || d.returnDeposit || d.otherRecycling); })
    .attr("height", function(d) { return height - y(d.noDeposit || d.returnDeposit || d.otherRecycling); })
    .style("fill", function(d) { return colors[Object.keys(d).find(key => key !== "state" && d[key])]; }) // Use specified colors for bars
    .on("mouseover", function(event, d) {
        d3.select(this).attr('data-original-color', d3.select(this).style("fill"));
        d3.select(this).style("fill", "orange");

        var category = Object.keys(d).find(key => key !== "state" && d[key]);
        var percentage = d[category];

        tooltip.style("opacity", 1);
        tooltip.html(
            `<div style="font-weight: bold; border-radius: 5px 5px 0 0; background-color: #f1eded;padding: 5px;">${d.state} - ${percentage.toFixed(0)}%</div>
            <table>
                <tr>
                    <td>${tooltipTitles[category]}</td>
                </tr>
                ${category === "otherRecycling" ? "<tr><td>" + d.depositDetails + "</td></tr>" : ""}
            </table>`
        )
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", function(d) {
        d3.select(this).style("fill", d3.select(this).attr('data-original-color'));
        tooltip.style("opacity", 0);
    });


// Define the width of the SVG
var svgWidth = 500;

// Define the legend
var legend = svg.selectAll(".legend")
    .data(["No Return Deposit", "$0.05 Return Deposit", "Other Return Deposits"])
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

// Draw legend rectangles
legend.append("rect")
    .attr("x", svgWidth - 18) // Set the x position of the rectangle to the width of the SVG minus the width of the rectangle
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", function(d, i) { return Object.values(colors)[i]; });

// Draw legend text
legend.append("text")
    .attr("x", svgWidth - 24) // Set the x position of the text to the width of the SVG minus the width of the rectangle minus a gap
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "end") // Set the text anchor to "end"
    .text(function(d) { return d; });




// Set the width of each bar
var barWidth = 10; // Adjust this value to change the bar width

// Set the ranges with adjusted width
var x = d3.scaleBand().range([0, width], .1);

// Append the rectangles (bars)
svg.selectAll(".bar")
    .data(data)
  .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d.name); })
    .attr("width", x.bandwidth() > barWidth ? barWidth : x.bandwidth()) // Set bar width
    .attr("y", function(d) { return y(d.value); })
    .attr("height", function(d) { return height - y(d.value); });
