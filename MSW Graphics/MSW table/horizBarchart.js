// parse the Data
const wasteData = [
    {
        region: "CO, MT, ND, SD, UT, WY",
        epaRegion: 8,
        landfill: 79,
        recycling: 9,
        wasteToEnergy: 2,
        compost: 10
    },
    {
        region: "AR, LA, NM, OK, TX",
        epaRegion: 6,
        landfill: 78,
        recycling: 11,
        wasteToEnergy: 0,
        compost: 11
    },
    {
        region: "IA, KS, MO, NE",
        epaRegion: 7,
        landfill: 76,
        recycling: 22,
        wasteToEnergy: 0,
        compost: 2
    },
    {
        region: "IL, IN, MI, MN, OH, WI",
        epaRegion: 5,
        landfill: 76,
        recycling: 15,
        wasteToEnergy: 4,
        compost: 5
    },
    {
        region: "AL, FL, GA, KY, MS, NC, SC, TN",
        epaRegion: 4,
        landfill: 73,
        recycling: 19,
        wasteToEnergy: 6,
        compost: 2
    },
    {
        region: "AK, ID, OR, WA, 271 Native Tribes",
        epaRegion: 10,
        landfill: 55,
        recycling: 32,
        wasteToEnergy: 3,
        compost: 10
    },
    {
        region: "DE, DC, MD, PA, VA, WV",
        epaRegion: 3,
        landfill: 54,
        recycling: 24,
        wasteToEnergy: 17,
        compost: 5
    },
    {
        region: "NJ, NY, Puerto Rico, U.S Virgin Islands",
        epaRegion: 2,
        landfill: 52,
        recycling: 23,
        wasteToEnergy: 21,
        compost: 4
    },
    {
        region: "AZ, CA, HI, NV, American Samoa, Commonwealth of Northern Mariana Islands, Republic of Palau",
        epaRegion: 9,
        landfill: 51,
        recycling: 37,
        wasteToEnergy: 2,
        compost: 10
    },
    {
        region: "CT, ME, MA, NH, RI, VT",
        epaRegion: 1,
        landfill: 24,
        recycling: 27,
        wasteToEnergy: 41,
        compost: 8
    }
];

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

// List of value keys
const typeKeys = Object.keys(wasteData[0]).slice(2);

// Sort data in descending order by total value
wasteData.sort((a, b) => b.total - a.total);

// Stack the data
const stack = d3.stack()
   .keys(typeKeys)
   .order(d3.stackOrderNone)
   .offset(d3.stackOffsetNone);
const stackedData = stack(wasteData);

// X scale and Axis
const formater =  d3.format(".1s");
const xScale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, width]);
svg.append('g')
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(xScale).ticks(7).tickSize(0).tickPadding(6).tickFormat(formater));

// Y scale and Axis
const yScale = d3.scaleBand()
  .domain(wasteData.map(d => `EPA Region ${d.epaRegion}`)) // Use 'epaRegion' for Y axis
  .range([0, height])
  .padding(.2);
svg.append('g')
  .call(d3.axisLeft(yScale).tickSize(0).tickPadding(8))
    .call(g => g.select(".domain").remove()) // This line removes the Y-axis bar
  .selectAll('.tick') // Select all the ticks
  .on('mouseover', function(event, d) { // Add mouseover event
    d3.select(this).select('text').style('fill', 'orange').style('font-weight', 'bold'); // Change the color of the text to orange and make it bold on mouseover
    
    // Get the region data
    const regionData = wasteData.find(data => `EPA Region ${data.epaRegion}` === d);

    // Show the tooltip
    tooltip.style("opacity", 1);
    tooltip.html(
        `<div style="font-weight: bold; border-radius: 5px 5px 5px 5px; background-color: #f1eded;padding: 5px;">${regionData.region}</div>`
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
  .domain(typeKeys)
  .range(['#18375F','#E2E27A','#386660','#8FC7E5',]);

// Set legend data
const legendData = [
    {color: "#3167A3", text: "Landfill", x: -(margin.left)*1},
    {color: "#E2E27A", text: "Recycling", x: -(margin.left)*.25},
    {color: "#386660", text: "Waste to Energy", x:(margin.left)*.65 }, 
    {color: "#8FC7E5",text: "Compost", x: (margin.left)*1.85}
];

// Set legend
legendData.forEach((item, i) => {
    svg.append("rect")
        .attr("x", item.x)
        .attr("y", -(margin.top/2))
        .attr("width", 13)
        .attr("height", 13)
        .style("fill", item.color);

    svg.append("text")
        .attr("class", "legend")
        .attr("x", item.x + 20)
        .attr("y", -(margin.top/2.7))
        .text(item.text);
});

// Create a div for the title
const titleDiv = d3.select("body")
    .append("div")
    .attr("id", "title-div")

// Move the title to the new div
titleDiv.append(() => d3.select("#viz_container").node());

// Create a tooltip div that is hidden by default
const tooltip = d3.select("body")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .attr("id", "tooltip-total")
    .style("background-color", "white")
    .style("border", "none")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    

// Create bars
svg.append("g")
  .selectAll("g")
  .data(stackedData)
  .join("g")
      .attr("fill", d => color(d.key))
    .selectAll("rect")
    .data(d => d)
    .join("rect")
      .attr("x", d => xScale(d[0]))
      .attr("y", d => yScale(`EPA Region ${d.data.epaRegion}`)) // Use 'epaRegion' for Y axis
      .attr("width",  d => xScale(d[1])-xScale(d[0]))
      .attr("height", yScale.bandwidth())

// On mouseover
.on("mouseover", function(event, d) {
    // Store the original color
    d3.select(this).attr('data-original-color', d3.select(this).style("fill"));
    // Highlight the bar
    d3.select(this).style("fill", "orange");

    // Prepare the tooltip data
    var tooltipData = Object.keys(d.data).slice(2).filter(key => { // Exclude 'epaRegion' from tooltip
        // Exclude 'total' and any keys that are objects
        return key !==('total' && typeof d.data[key] !== 'object');
    }).map(key => {
        return `<tr>
            <td><div style="width:10px; height:10px; background-color:${color(key)};"></div></td>
            <td>${key}</td>
            <td style="text-align: right">${d.data[key]}%</td> <!-- Add the style here -->
            </tr>`;
    }).join("");

    // Show the tooltip
    tooltip.style("opacity", 1);
    tooltip.html(
        `<div style="font-weight: bold; border-radius: 5px 5px 0 0; background-color: #f1eded;padding: 5px;">${d.data.region}</div>
        <table>
            ${tooltipData}
        </table>`
    )
    .style("left", (event.pageX + 10) + "px")
    .style("top", (event.pageY - 28) + "px");
})
// On mouseout
.on("mouseout", function(d) {
    // Restore the original color
    d3.select(this).style("fill", d3.select(this).attr('data-original-color'));
    // Hide the tooltip
    tooltip.style("opacity", 0);
});

