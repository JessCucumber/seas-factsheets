const data=[
    {"year": 1975, "trucks": 11.6, "cars": 13.5, "weighted_average": 13.1},
    {"year": 1976, "trucks": 12.2, "cars": 14.9, "weighted_average": 14.2},
    {"year": 1977, "trucks": 13.3, "cars": 15.6, "weighted_average": 15.1},
    {"year": 1978, "trucks": 12.9, "cars": 16.9, "weighted_average": 15.8},
    {"year": 1979, "trucks": 12.5, "cars": 17.2, "weighted_average": 15.9},
    {"year": 1980, "trucks": 15.8, "cars": 20.0, "weighted_average": 19.2},
    {"year": 1981, "trucks": 17.1, "cars": 21.4, "weighted_average": 20.5},
    {"year": 1982, "trucks": 17.4, "cars": 22.2, "weighted_average": 21.1},
    {"year": 1983, "trucks": 17.7, "cars": 22.1, "weighted_average": 21.0},
    {"year": 1984, "trucks": 17.4, "cars": 22.4, "weighted_average": 21.0},
    {"year": 1985, "trucks": 17.5, "cars": 23.0, "weighted_average": 21.3},
    {"year": 1986, "trucks": 18.2, "cars": 23.7, "weighted_average": 21.8},
    {"year": 1987, "trucks": 18.3, "cars": 23.8, "weighted_average": 22.0},
    {"year": 1988, "trucks": 17.8, "cars": 24.1, "weighted_average": 21.9},
    {"year": 1989, "trucks": 17.6, "cars": 23.6, "weighted_average": 21.4},
    {"year": 1990, "trucks": 17.4, "cars": 23.3, "weighted_average": 21.2},
    {"year": 1991, "trucks": 17.8, "cars": 23.3, "weighted_average": 21.3},
    {"year": 1992, "trucks": 17.3, "cars": 22.9, "weighted_average": 20.8},
    {"year": 1993, "trucks": 17.5, "cars": 23.0, "weighted_average": 20.9},
    {"year": 1994, "trucks": 17.2, "cars": 23.0, "weighted_average": 20.4},
    {"year": 1995, "trucks": 17.0, "cars": 23.3, "weighted_average": 20.5},
    {"year": 1996, "trucks": 17.2, "cars": 23.1, "weighted_average": 20.4},
    {"year": 1997, "trucks": 16.8, "cars": 23.2, "weighted_average": 20.1},
    {"year": 1998, "trucks": 17.1, "cars": 23.0, "weighted_average": 20.1},
    {"year": 1999, "trucks": 16.6, "cars": 22.7, "weighted_average": 19.7},
    {"year": 2000, "trucks": 16.8, "cars": 22.5, "weighted_average": 19.8},
    {"year": 2001, "trucks": 16.5, "cars": 22.6, "weighted_average": 19.6},
    {"year": 2002, "trucks": 16.5, "cars": 22.8, "weighted_average": 19.5},
    {"year": 2003, "trucks": 16.7, "cars": 23.0, "weighted_average": 19.6},
    {"year": 2004, "trucks": 16.5, "cars": 22.9, "weighted_average": 19.3},
    {"year": 2005, "trucks": 16.9, "cars": 23.1, "weighted_average": 19.9},
    {"year": 2006, "trucks": 17.2, "cars": 23.0, "weighted_average": 20.1},
    {"year": 2007, "trucks": 17.4, "cars": 23.7, "weighted_average": 20.6},
    {"year": 2008, "trucks": 17.8, "cars": 23.9, "weighted_average": 21.0},
    {"year": 2009, "trucks": 18.5, "cars": 25.0, "weighted_average": 22.4},
    {"year": 2010, "trucks": 18.8, "cars": 25.7, "weighted_average": 22.6},
    {"year": 2011, "trucks": 19.1, "cars": 25.4, "weighted_average": 22.3},
    {"year": 2012, "trucks": 19.3, "cars": 26.9, "weighted_average": 23.6},
    {"year": 2013, "trucks": 19.8, "cars": 27.7, "weighted_average": 24.2},
    {"year": 2014, "trucks": 20.3, "cars": 27.6, "weighted_average": 24.1},
    {"year": 2015, "trucks": 21.1, "cars": 28.2, "weighted_average": 24.6},
    {"year": 2016, "trucks": 21.2, "cars": 28.5, "weighted_average": 24.7},
    {"year": 2017, "trucks": 21.4, "cars": 29.3, "weighted_average": 24.9},
    {"year": 2018, "trucks": 22.0, "cars": 30.0, "weighted_average": 25.1},
    {"year": 2019, "trucks": 22.2, "cars": 30.0, "weighted_average": 24.9},
    {"year": 2020, "trucks": 22.6, "cars": 30.2, "weighted_average": 25.4},
    {"year": 2021, "trucks": 23.0, "cars": 31.8, "weighted_average": 25.4},
    {"year": 2022, "trucks": 23.2, "cars": 33.3, "weighted_average": 26.0}
  ];


data.columns = ["year", "trucks", "cars", "weighted_average"];

const margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = 800 - margin.left - margin.right,  
      height = 500 - margin.top - margin.bottom;  

const svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

const x = d3.scaleLinear()
    .domain(d3.extent(data, d => d.year))
    .range([0, width]);

const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d3.max([d.trucks, d.cars, d.weighted_average]))])
    .range([height, 0]);

const z = d3.scaleOrdinal()
    .range(["#1C476D", "#3167A4", "#8FC8E5"]);

const line = d3.line()
    .x(d => x(d.year))
    .y(d => y(d.value));




const categories = data.columns.slice(1).map(function(id) {
    return {
      id: id,
      values: data.map(function(d) {
        return {year: d.year, value: d[id]};
      })
    };
});

x.domain(d3.extent(data, function(d) { return d.year; }));

y.domain([
  d3.min(categories, function(c) { return d3.min(c.values, function(d) { return d.value; }); }),
  d3.max(categories, function(c) { return d3.max(c.values, function(d) { return d.value; }); })
]);

z.domain(categories.map(function(c) { return c.id; }));

g.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + y.range()[0] + ")")
    .call(d3.axisBottom(x).tickFormat(d3.format("d"))); // Add tickFormat here


g.append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(y))
  .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("fill", "#000")
    .text("Values");

const category = g.selectAll(".category")
  .data(categories)
  .enter().append("g")
    .attr("class", "category");

category.append("path")
.attr("class", "line")
.attr("d", function(d) { return line(d.values); })
.style("stroke", function(d) { return z(d.id); })
.style("fill", "none")
.style("stroke-width", "2px"); // Add this line



    // Define the tooltip
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // Add a rect to capture mouse movements
    svg.append("rect")
        .attr("width", width) // Match the new width
        .attr("height", height) // Match the new height
        .style("fill", "none")
        .style("pointer-events", "all")
        .on("mousemove", function(event) {
            const [xPos, yPos] = d3.pointer(event);
            const year = Math.round(x.invert(xPos));
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
                                <span class="color-legend" style="background-color: ${"#3167A4"};"></span>
                                Trucks
                            </td>
                            <td class="value">${Math.round(d.trucks)}</td>
                        </tr>
                        <tr>
                            <td>
                                <span class="color-legend" style="background-color: ${"#8FC8E5"};"></span>
                                Cars
                            </td>
                            <td class="value">${Math.round(d.cars)}</td>
                        </tr>
                        <tr>
                            <td>
                                <span class="color-legend" style="background-color: ${"#1C476D"};"></span>
                                Weighted Average
                            </td>
                            <td class="value">${Math.round(d.weighted_average)}</td>
                        </tr>
                    </table>
                `)  
                    .style("left", (d3.pointer(event)[0]+35) + "px")   
                    .style("top", (d3.pointer(event)[1]+100) + "px");  
                    mouseG.select(".mouse-line")
                    .style("opacity", ".8");
        
                // Update the mouse-line's position
                mouseG.select(".mouse-line")
                    .attr("d", function() {
                        let d = "M" + Math.max(50, Math.min(450, xPos)) + "," + (300);
                        d += " " + Math.max(50, Math.min(450, xPos)) + "," + 0;
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