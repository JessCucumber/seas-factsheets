// Define your data
const data = [
    { category: "Paper", value: 23.1 },
    { category: "Food waste", value: 21.6 },
    { category: "Plastics", value: 12.2 },
    { category: "Yard trimmings", value: 12.1 },
    { category: "Metals", value: 8.8 },
    { category: "Rubber, leather, and textiles", value: 8.9 },
    { category: "Wood", value: 6.2 },
    { category: "Glass", value: 4.2 },
    { category: "Other", value: 2.9 }
];

// Define custom colors
const colors = [ "#E2E27A", "#386660", "#C6E3E0", "#FFCB03" ,"#3167A3", "#1D476D", "#8FC7E5","#A6B93D","#FED578"];

// Calculate total value
const totalValue = data.reduce((acc, curr) => acc + curr.value, 0);

// Define dimensions
const margin = {top: 20, right: 30, bottom: 40, left: 90},
    width = 460 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

// Append SVG
const svg = d3.select("#viz_container")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Add X axis
const x = d3.scaleLinear()
    .domain([0, totalValue])
    .range([ 0, width]);
svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x).ticks(6).tickSize(0).tickFormat(function(d) { return Math.floor(d) + "%"; })); // Set ticks to 6 and remove decimals

// Y axis
const y = d3.scaleBand()
    .range([ 0, height ])
    .domain(["Total"])
    .padding(.3); // Increase padding to make bar thinner
svg.append("g")
    .call(d3.axisLeft(y));

// Create a tooltip div that is hidden by default
const tooltip = d3.select("body")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("border", "2")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px");

// Add bars
let sum = 0;
data.forEach((d, i) => {
    svg.append("rect")
        .attr("x", x(sum))
        .attr("y", y("Total"))
        .attr("width", x(d.value))
        .attr("height", y.bandwidth())
        .attr("fill", colors[i % colors.length]) // Use custom colors
        .on("mouseover", function(event) { // Show tooltip on mouseover
            d3.select(this).style("fill", "orange"); // Change the color of the bar to orange on mouseover
            tooltip.style("opacity", 1);
            let tooltipHtml = '';
            data.forEach((e, j) => {
                if (i === j) {
                    tooltipHtml += `<div class="tooltip-title" style="font-weight: bold; padding: 10px;"><span style="display: inline-block; width: 10px; height: 10px; background-color: ${colors[j % colors.length]}; margin-right: 5px;"></span>${e.category}: ${(e.value / totalValue * 100).toFixed(1)}%</div>`;
                } else {
                    tooltipHtml += `<div class="tooltip-content" style="padding: 5px;"><span style="display: inline-block; width: 10px; height: 10px; background-color: ${colors[j % colors.length]}; margin-right: 5px;"></span>${e.category}: ${(e.value / totalValue * 100).toFixed(1)}%</div>`;
                }
            });
            tooltip.html(tooltipHtml)
            .style("left", (event.pageX + 15) + "px")
            .style("top", (event.pageY + 25) + "px");
        })
        .on("mouseout", function() { // Hide tooltip on mouseout
            d3.select(this).style("fill", d3.select(this).attr('data-original-color'));
            tooltip.style("opacity", 0);
        });
    sum += d.value;
});
//move bar underneath