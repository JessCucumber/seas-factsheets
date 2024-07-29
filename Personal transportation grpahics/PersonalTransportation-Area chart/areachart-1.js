const data = [
    { "year": 1975, "vans": 4.5, "SUVs": 1.8, "pickups": 13.1, "carsAndWagons": 80.6 },
    { "year": 1976, "vans": 4.1, "SUVs": 2.0, "pickups": 15.1, "carsAndWagons": 78.8 },
    { "year": 1977, "vans": 3.6, "SUVs": 2.0, "pickups": 14.3, "carsAndWagons": 80.1 },
    { "year": 1978, "vans": 4.3, "SUVs": 2.6, "pickups": 15.7, "carsAndWagons": 77.4 },
    { "year": 1979, "vans": 3.5, "SUVs": 2.9, "pickups": 15.9, "carsAndWagons": 77.7 },
    { "year": 1980, "vans": 2.1, "SUVs": 1.6, "pickups": 12.7, "carsAndWagons": 83.6 },
    { "year": 1981, "vans": 2.3, "SUVs": 1.3, "pickups": 13.6, "carsAndWagons": 82.8 },
    { "year": 1982, "vans": 3.2, "SUVs": 1.6, "pickups": 14.8, "carsAndWagons": 80.4 },
    { "year": 1983, "vans": 3.7, "SUVs": 2.8, "pickups": 15.8, "carsAndWagons": 77.7 },
    { "year": 1984, "vans": 4.8, "SUVs": 4.5, "pickups": 14.6, "carsAndWagons": 76.1 },
    { "year": 1985, "vans": 5.9, "SUVs": 5.1, "pickups": 14.4, "carsAndWagons": 74.6 },
    { "year": 1986, "vans": 6.8, "SUVs": 5.0, "pickups": 16.5, "carsAndWagons": 71.7 },
    { "year": 1987, "vans": 7.5, "SUVs": 5.8, "pickups": 14.4, "carsAndWagons": 72.3 },
    { "year": 1988, "vans": 7.4, "SUVs": 6.3, "pickups": 16.1, "carsAndWagons": 70.2 },
    { "year": 1989, "vans": 8.8, "SUVs": 6.4, "pickups": 15.4, "carsAndWagons": 69.4 },
    { "year": 1990, "vans": 10.0, "SUVs": 5.6, "pickups": 14.5, "carsAndWagons": 69.9 },
    { "year": 1991, "vans": 8.2, "SUVs": 8.7, "pickups": 15.3, "carsAndWagons": 67.8 },
    { "year": 1992, "vans": 10.0, "SUVs": 8.2, "pickups": 15.1, "carsAndWagons": 66.7 },
    { "year": 1993, "vans": 10.9, "SUVs": 9.9, "pickups": 15.2, "carsAndWagons": 64.0 },
    { "year": 1994, "vans": 10.0, "SUVs": 11.4, "pickups": 18.9, "carsAndWagons": 59.7 },
    { "year": 1995, "vans": 11.0, "SUVs": 12.0, "pickups": 15.0, "carsAndWagons": 62.0 },
    { "year": 1996, "vans": 10.7, "SUVs": 14.4, "pickups": 14.9, "carsAndWagons": 60.0 },
    { "year": 1997, "vans": 8.8, "SUVs": 17.0, "pickups": 16.7, "carsAndWagons": 57.5 },
    { "year": 1998, "vans": 10.3, "SUVs": 17.8, "pickups": 16.7, "carsAndWagons": 55.2 },
    { "year": 1999, "vans": 9.6, "SUVs": 18.6, "pickups": 16.7, "carsAndWagons": 55.1 },
    { "year": 2000, "vans": 10.2, "SUVs": 18.9, "pickups": 15.8, "carsAndWagons": 55.1 },
    { "year": 2001, "vans": 7.9, "SUVs": 22.1, "pickups": 16.1, "carsAndWagons": 53.9 },
    { "year": 2002, "vans": 7.7, "SUVs": 26.0, "pickups": 14.8, "carsAndWagons": 51.5 },
    { "year": 2003, "vans": 7.8, "SUVs": 26.2, "pickups": 15.7, "carsAndWagons": 50.3 },
    { "year": 2004, "vans": 6.1, "SUVs": 30.0, "pickups": 15.9, "carsAndWagons": 48.0 },
    { "year": 2005, "vans": 9.3, "SUVs": 25.7, "pickups": 14.5, "carsAndWagons": 50.5 },
    { "year": 2006, "vans": 7.7, "SUVs": 24.9, "pickups": 14.5, "carsAndWagons": 52.9 },
    { "year": 2007, "vans": 5.5, "SUVs": 27.7, "pickups": 13.8, "carsAndWagons": 53.0 },
    { "year": 2008, "vans": 5.7, "SUVs": 28.7, "pickups": 12.9, "carsAndWagons": 52.7 },
    { "year": 2009, "vans": 4.0, "SUVs": 24.9, "pickups": 10.6, "carsAndWagons": 60.5 },
    { "year": 2010, "vans": 5.0, "SUVs": 28.9, "pickups": 11.5, "carsAndWagons": 54.6 },
    { "year": 2011, "vans": 4.3, "SUVs": 35.5, "pickups": 12.3, "carsAndWagons": 47.9 },
    { "year": 2012, "vans": 4.9, "SUVs": 30.0, "pickups": 10.1, "carsAndWagons": 55.0 },
    { "year": 2013, "vans": 3.8, "SUVs": 31.8, "pickups": 10.4, "carsAndWagons": 54.0 },
    { "year": 2014, "vans": 4.3, "SUVs": 34.0, "pickups": 12.4, "carsAndWagons": 49.3 },
    { "year": 2015, "vans": 3.9, "SUVs": 38.3, "pickups": 10.7, "carsAndWagons": 47.1 },
    { "year": 2016, "vans": 3.9, "SUVs": 40.6, "pickups": 11.7, "carsAndWagons": 43.8 },
    { "year": 2017, "vans": 3.6, "SUVs": 43.3, "pickups": 12.1, "carsAndWagons": 41.0 },
    { "year": 2018, "vans": 3.1, "SUVs": 46.4, "pickups": 13.9, "carsAndWagons": 36.6 },
    { "year": 2019, "vans": 3.4, "SUVs": 48.2, "pickups": 15.6, "carsAndWagons": 32.8 },
    { "year": 2020, "vans": 2.9, "SUVs": 51.7, "pickups": 14.4, "carsAndWagons": 31.0 },
    { "year": 2021, "vans": 2.2, "SUVs": 56.0, "pickups": 16.1, "carsAndWagons": 25.7 }
];
    
const margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

const svg = d3.select("#viz_container")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

const keys = Object.keys(data[0]).filter(key => key !== 'year').reverse();
data.sort((a, b) => d3.ascending(a.year, b.year));

const x = d3.scaleTime()
    .domain([d3.min(data, d => new Date(d.year, 0)), new Date(2021, 0)])
    .range([ 0, width ]);

svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x).tickSize(0))
    .selectAll("text")  
    .style("text-anchor", "end")
    .attr("dx", "2em")
    .attr("dy", "1.5em");

const y = d3.scaleLinear()
    .domain([0, 100])
    .range([ height, 0 ]);
svg.append("g")
    .call(d3.axisLeft(y).ticks(5).tickFormat(d => `${d}%`).tickSize(0));

const color = d3.scaleOrdinal()
    .domain(keys)
    .range(["#1C476D","#8FC8E5", "#3167A4",  "#FFCB05"]);

const stackedData = d3.stack()
    .keys(keys)
    (data);

svg.selectAll("mylayers")
    .data(stackedData)
    .enter()
    .append("path")
    .style("fill", d => color(d.key))
    .attr("d", d3.area()
        .x(d => x(new Date(d.data.year, 0)))
        .y0(d => y(d[0]))
        .y1(d => y(d[1]))
    )
    .attr("class", "area-path")
    .on('mouseover', function() {
        svg.selectAll(".area-path").style("opacity", 0.1);
        d3.select(this).style("opacity", 1);
    })
    .on('mouseout', function() {
        svg.selectAll(".area-path").style("opacity", 1);
    });

svg.on('mouseout', function() {
    svg.selectAll(".area-path").style("opacity", 1);
});

const tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

const focus = svg.append('g')
    .attr('class', 'focus')
    .style('display', 'none');

focus.append('line')
    .attr('class', 'x-hover-line hover-line')
    .attr('y1', 0)
    .attr('y2', height)
    .style('stroke', '#000')
    .style('opacity', 0.1);

svg.append('rect')
    .attr('class', 'overlay')
    .attr('width', width)
    .attr('height', height)
    .style('fill', 'none')
    .style('pointer-events', 'all')
    .on('mouseover', function() { focus.style('display', null); })
    .on('mouseout', function() { focus.style('display', 'none'); })
    
    .on('mousemove', function(event) {
        const [xPos, yPos] = d3.pointer(event);
        const date = x.invert(xPos);
        const year = date.getFullYear();
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
                            <span class="color-legend" style="background-color: ${color("carsAndWagons")}"></span>
                            Cars and Wagons
                        </td>
                        <td class="value">${Math.round(d.carsAndWagons)}%</td>
                    </tr>
                    <tr>
                        <td>
                            <span class="color-legend" style="background-color: ${color("SUVs")}"></span>
                            SUVs
                        </td>
                        <td class="value">${Math.round(d.SUVs)}%</td>
                    </tr>
                    <tr>
                        <td>
                            <span class="color-legend" style="background-color: ${color("vans")}"></span>
                            Vans
                        </td>
                        <td class="value">${Math.round(d.vans)}%</td>
                    </tr>
                    <tr>
                        <td>
                            <span class="color-legend" style="background-color: ${color("pickups")}"></span>
                            Pickups
                        </td>
                        <td class="value">${Math.round(d.pickups)}%</td>
                    </tr>
                </table>
            `)
            .style("left", (d3.pointer(event)[0]+100) + "px")   
            .style("top", (d3.pointer(event)[1] +75) + "px");  

            const totalStack = [];
            let accumulatingStack = 0;

            keys.forEach((cat) => {
                accumulatingStack += d[cat];
                totalStack.push(accumulatingStack);
            });

            focus.selectAll("circle")
                .data(totalStack)
                .join("circle")
                .attr("cx", x(new Date(year, 0)))
                .attr("cy", d => y(d))
                .attr("r", 4)
                .style("fill", (d, i) => color(keys[i]))
                .style("stroke-width", 0.5)
                .style("stroke", "white")
                .style("opacity", "10")
                .on('mouseover', function() {
                    d3.select(this).style("fill", "red");
                })
                .on('mouseout', function() {
                    d3.select(this).style("fill", (d, i) => color(keys[i]));
                });

            focus.select(".x-hover-line")
                .style("opacity", ".2")
                .attr("y2", height)
                .attr("transform", `translate(${x(new Date(year, 0))},0)`);
        }
    });
