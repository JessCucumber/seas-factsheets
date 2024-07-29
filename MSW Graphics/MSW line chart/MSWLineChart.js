const data = [
    { year: 1960, totalMSW: 88.1, perCapita: 978.2 },
    { year: 1965, totalMSW: 104.4, perCapita: 1080.4 },
    { year: 1970, totalMSW: 121.1, perCapita: 1186.25 },
    { year: 1975, totalMSW: 127.8, perCapita: 1186.25 },
    { year: 1980, totalMSW: 151.6, perCapita: 1335.9 },
    { year: 1985, totalMSW: 166.3, perCapita: 1397.95 },
    { year: 1990, totalMSW: 208.3, perCapita: 1668.05 },
    { year: 1995, totalMSW: 217.3, perCapita: 1649.8 },
    { year: 2000, totalMSW: 243.5, perCapita: 1730.1 },
    { year: 2005, totalMSW: 253.7, perCapita: 1711.85 },
    { year: 2010, totalMSW: 251.1, perCapita: 1624.25 },
    { year: 2015, totalMSW: 262.1, perCapita: 1635.2 },
    { year: 2016, totalMSW: 268.1, perCapita: 1660.75 },
    { year: 2017, totalMSW: 268.7, perCapita: 1653.45 },
    { year: 2018, totalMSW: 292.4, perCapita: 1788.5 }
];

// Define the SVG
const svg = d3.select("body").append("svg")
    .attr("width", 500) // Adjust the width to 500 pixels
    .attr("height", 300);

// Define the scales
const xScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.year), 2018)
    .range([50, 450]); // Adjust the range to match the new width
// Add the '2018' label manually at the end of the x-axis
svg.append("text")
.attr("x", xScale(2018))  // x position of the label
.attr("y", 263)  // y position of the label, slightly below the x-axis
.style("text-anchor", "middle")
.style("font-size", "10px")  // match the font size with the rest of the x-axis
.style("font-family", "sans-serif")  // match the font style with the rest of the x-axis
.text("2018");

const yScale1 = d3.scaleLinear()
    .domain([0,300])
    .range([250, 50]); // Adjust the range to match the new height

const yScale2 = d3.scaleLinear()
    .domain([0, 2000]) 
    .range([250, 50]); // Adjust the range to match the new height

// Define the lines
const line1 = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale1(d.totalMSW));
const line2 = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale2(d.perCapita));
    
// Draw the lines
svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "#ED974A")
    .attr("stroke-width", 1.5)
    .attr("d", line1);

svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "#386660")
    .attr("stroke-width", 1.5)
    .attr("d", line2);
    

// Add the axes
svg.append("g")
    .attr("transform", "translate(0,250)") // Adjust the y-coordinate of the translation
    .call(d3.axisBottom(xScale)
        .ticks((d3.max(data, d => d.year) - d3.min(data, d => d.year)) / 10 + 1, "d") // Adjust the ticks to include all years
        .tickSize(0)
        .tickPadding(7));

var leftAxis = svg.append("g")
    .attr("transform", "translate(50,0)")
    .call(d3.axisLeft(yScale1).ticks(6).tickSize(0));

leftAxis.selectAll(".domain")  // select the domain (axis line)
    .style("stroke", "#ED974A")      // change the color of the stroke
    .style("stroke-width", 1);      // change the stroke-width to make it thinner

leftAxis.selectAll(".tick text")  // select the tick text
    .style("fill", "#ED974A");       // change the color of the fill

var rightAxis = svg.append("g")
    .attr("transform", "translate(450,0)") // Adjust the right y-axis
    .call(d3.axisRight(yScale2).ticks(6).tickSize(0));

rightAxis.selectAll(".domain")
    .style("stroke", "#386660")
    .style("stroke-width", 1);   // change the stroke-width to make it thinner

rightAxis.selectAll(".tick text")
    .style("fill", "#386660");



// Add label for the left y-axis
svg.append("text")
    .attr("y", 0)
    .attr("x", 100)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .style("fill", "#ED974A")       // change the color of the fill
    .text("Total MSW Generation");
    
    //next line
svg.append("text")
    .attr("y", 20)
    .attr("x", 100)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .style("fill", "#ED974A")       // change the color of the fill
    .text("(Millions of Tons)");

// Add label for the right y-axis
svg.append("text")
    .attr("y", 0)
    .attr("x", 420) // Adjust the x-coordinate of the label
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Per Capita Generation")
    .style("fill", "#386660")       // change the color of the fill

    //next line
svg.append("text")
    .attr("y", 20)
    .attr("x", 420) // Adjust the x-coordinate of the label
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("(Lbs per Person)")
    .style("fill", "#386660")

// Define the tooltip
const tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// Add a rect to capture mouse movements
svg.append("rect")
    .attr("width", 500) // Match the new width
    .attr("height", 400) // Match the new height
    .style("fill", "none")
    .style("pointer-events", "all")
    .on("mousemove", function(event) {
        const [x, y] = d3.pointer(event);
        const year = Math.round(xScale.invert(x));
        const d = data.find(d => d.year === year);
        if (d) {
            tooltip.transition()    
                .duration(200)    
                .style("opacity", .9);    
            tooltip.html(`
                <div class="tooltip-title">${d.year}</div>
                <table class="tooltip-content">
                    <tr>
                    <td>
                        <span class="color-legend" style="background-color: ${"#386660"};"></span>
                        Per Capita Generation
                    </td>
                    <td class="value">${Math.round(d.perCapita)}</td>
                </tr>
                    <tr>
                        <td>
                            <span class="color-legend" style="background-color: ${"#ED974A"};"></span>
                            Total MSW Generation
                        </td>
                        <td class="value">${Math.round(d.totalMSW)}</td>
                    </tr>
    
                </table>
            `)  
                .style("left", (d3.pointer(event)[0]) + "px")   
                .style("top", (d3.pointer(event)[1]+35) + "px");  
                mouseG.select(".mouse-line")
                .style("opacity", ".8");
    
            // Update the mouse-line's position
            mouseG.select(".mouse-line")
                .attr("d", function() {
                    let d = "M" + Math.max(50, Math.min(450, x)) + "," + (300);
                    d += " " + Math.max(50, Math.min(450, x)) + "," + 0;
                    return d;
                });
        }
    })
    
    .on("mouseout", function(d) {   
        tooltip.transition()    
            .duration(500)    
            .style("opacity", 0)
            mouseG.select(".mouse-line")
            .style("opacity", "0");
    });

// Append a line that will follow the mouse cursor
const mouseG = svg.append("g")
    .attr("class", "mouse-over-effects");

mouseG.append("path")
    .attr("class", "mouse-line")
    .style("stroke", "#999")
    .style("stroke-width", "0.5px")
    .style("opacity", "0"); 


    



    //add epa region