// Define the dimensions of the chart
const margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// Define the scales
const x = d3.scaleBand().range([0, width]).padding(0.1),
    y = d3.scaleLinear().range([height, 0]);

// Define the SVG element
const svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Define the dataset
const dataset = [
    {"item": "light bulb", "weight_lbs": 0.90},
    {"item": "car", "weight_lbs": 0.60},
    {"item": "light duty vehicle", "weight_lbs": 0.86},
    {"item": "semi truck", "weight_lbs": 1.20},
    {"item": "plane", "weight_lbs": 10.60}
];

// Define the domains of the scales
x.domain(dataset.map(function(d) { return d.item; }));
y.domain([0, d3.max(dataset, function(d) { return d.weight_lbs; })]);

// Add the X Axis
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

// Add the Y Axis
svg.append("g")
    .call(d3.axisLeft(y));

// Define the tooltip
var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// Add the bars
svg.selectAll(".bar")
    .data(dataset)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d.item); })
    .attr("width", x.bandwidth())
    .attr("y", function(d) { return y(d.weight_lbs); })
    .attr("height", function(d) { return height - y(d.weight_lbs); })
    .attr("fill", "#3167A3")  // Add color to the bars
    .on("mouseover", function(event, d) {  // Add a hover tooltip
        tooltip.transition()
            .duration(200)
            .style("opacity", .9);
        tooltip.html(`
            <div class="tooltip-title">${d.item}</div>
            <table class="tooltip-content">
                <tr>
                    <td>
                        <span class="color-legend" style="background-color: #3167A3;"></span>
                        Weight (lbs)
                    </td>
                    <td class="value">${d.weight_lbs}</td>
                </tr>
            </table>
        `);
    })
    .on("mousemove", function(event, d) {
        tooltip.style("left", `${event.pageX+5}px`)
               .style("top", `${event.pageY+5}px`);
    })
    .on("mouseout", function(d) {
        tooltip.transition()
            .duration(500)
            .style("opacity", 0);
    });
