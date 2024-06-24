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
    .attr("width", 800)
    .attr("height", 300);

// Define the scales
const xScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.year))
    .range([50, 800]); // Adjust the range to match the new width

const yScale1 = d3.scaleLinear()
    .domain(d3.extent(data, d => d.totalMSW))
    .range([250, 50]); // Adjust the range to match the new height

const yScale2 = d3.scaleLinear()
    .domain([200, d3.max(data, d => d.perCapita)])  // start at 200 instead of the minimum value
    .range([250, 50]); // Adjust the range to match the new height


// Define the lines
const line1 = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale1(d.totalMSW))
    .curve(d3.curveLinear); 

const line2 = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale2(d.perCapita))
    .curve(d3.curveLinear);  

// Draw the lines
svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "#3167A3")
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
    .attr("transform", "translate(0,450)")
    .call(d3.axisBottom(xScale).ticks(data.length, "d").tickSize(0))
    
svg.append("g")
    .attr("transform", "translate(50,0)")
    .call(d3.axisLeft(yScale1).ticks(10)) // change this line
    .selectAll("path, line, text")  // select all path, line, and text elements in the group
    .style("stroke", "#3167A3")      // change the color of the stroke
    .style("fill", "#3167A3")       // change the color of the fill
    .style("stroke-width", .5);


// Add label for the left y-axis
svg.append("text")
    .attr("y", 0)
    .attr("x", 100)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .style("fill", "#3167A3")       // change the color of the fill
    .text("Total MSW Generation");
    
    //next line
svg.append("text")
    .attr("y", 20)
    .attr("x", 100)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .style("fill", "#3167A3")       // change the color of the fill
    .text("(Millions of Tons)");

svg.append("g")
    .attr("transform", "translate(450,0)")
    .call(d3.axisRight(yScale2))
    .selectAll("path, line, text")  // select all path, line, and text elements in the group
    .style("stroke", "#386660")      // change the color of the stroke
    .style("fill", "#386660")       // change the color of the fill
    .style("stroke-width", .5);

// Add label for the right y-axis
svg.append("text")
    .attr("y", 0)
    .attr("x", 800)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Per Capita Generation")
    .style("fill", "#386660")       // change the color of the fill

    //next line
svg.append("text")
    .attr("y", 20)
    .attr("x", 800)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("(Lbs per Person)")
    .style("fill", "#386660")       // change the color of the fill



// Define the tooltip
const tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// Add a rect to capture mouse movements
svg.append("rect")
    .attr("width", 800) // Match the new width
    .attr("height", 300) // Match the new height
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
                            <span class="color-legend" style="background-color: ${"#3167A3"};"></span>
                            Total MSW Generation
                        </td>
                        <td class="value">${Math.round(d.totalMSW)}</td>
                    </tr>

                </table>
            `)  
                .style("left", (d3.pointer(event)[0]) + "px")   
                .style("top", (d3.pointer(event)[1]+35) + "px");  
        }
    })
    .on("mouseout", function(d) {   
        tooltip.transition()    
            .duration(500)    
            .style("opacity", 0); 
    });

    


// lengthen the chart to show the levelness