//Data/////////////////////////////////////////////////////
const data = [
  { year: 2005, usGW: 0.19, restOfWorldGW: 3.772 },
  { year: 2006, usGW: 0.295, restOfWorldGW: 5.003 },
  { year: 2007, usGW: 0.455, restOfWorldGW: 7.073 },
  { year: 2008, usGW: 0.753, restOfWorldGW: 13.015 },
  { year: 2009, usGW: 1.188, restOfWorldGW: 20.134 },
  { year: 2010, usGW: 2.017, restOfWorldGW: 35.556 },
  { year: 2011, usGW: 3.973, restOfWorldGW: 63.136 },
  { year: 2012, usGW: 7.13, restOfWorldGW: 86.59 },
  { year: 2013, usGW: 12.076, restOfWorldGW: 114.462 },
  { year: 2014, usGW: 18.321, restOfWorldGW: 142.094 },
  { year: 2015, usGW: 25.821, restOfWorldGW: 177.583 },
  { year: 2016, usGW: 40.975, restOfWorldGW: 316.083 },
  { year: 2017, usGW: 51.818, restOfWorldGW: 399.186 },
  { year: 2018, usGW: 62.484, restOfWorldGW: 487.601 },
  { year: 2019, usGW: 76.274, restOfWorldGW: 599.414 },
  { year: 2020, usGW: 96.131, restOfWorldGW: 726.219 },
  { year: 2021, usGW: 123.004, restOfWorldGW: 822.35 },
  { year: 2022, usGW: 141.566, restOfWorldGW: 900.323 }
];


// Get the container and its dimensions
const container = document.getElementById("viz_container");
const containerWidth = container.offsetWidth; // Use offsetWidth for full element width
const aspectRatio = 0.75; // Adjust this value as needed
const containerHeight = containerWidth * aspectRatio; // Calculate the height based on the width and aspect ratio

// set the dimensions and margins of the graph
const margin = {top: 100, right: 125, bottom: 50, left: 70};
const width = containerWidth - margin.left - margin.right;
const height = containerHeight - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#viz_container")
  .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", `0 0 ${containerWidth + 10} ${containerHeight}`) // update viewbox to match container dimensions
    .attr("preserveAspectRatio", "xMinYMin")
  .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)
    .style("font-family", "'IBM Plex Sans', sans-serif"); 
  
  // stack the data
  const stackGenerator = d3.stack().keys(["usGW", "restOfWorldGW"]);
  const stackedData = stackGenerator(data);
  
// X scale and Axis
const xScale = d3.scaleBand()
    .domain(data.map(d => d.year))
    .range([0, width + 10])
    .padding(.2);

svg
    .append('g')
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale).tickSize(0).tickPadding(10).tickValues(data.filter((d, i) => i % 4 === 0).map(d => d.year))); 
  
// Y scale and Axis
const yScale = d3.scaleLinear()
.domain([0, 1200])  // scale the y axis to 1200
.range([height, 0]);

let yAxis = svg.append('g')
    .call(d3.axisLeft(yScale).ticks(5).tickSize(0).tickPadding(10));



// Y axis label
svg
    .append("text")
      .attr("class", "chart-label")
      .attr("transform", "rotate(-90)") // rotate label
      .attr("y", 0 - margin.left )
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-size", "12px")
    .text("Installed Capacity GW");
  
  // color palette
  const color = d3.scaleOrdinal()
    .domain(["usGW", "restOfWorldGW"])
    .range(['#32A28D','#CBE8EC']);
  
// create a tooltip
const tooltip = d3.select("body")
    .append("div")
      .attr("id", "chart")
      .attr("class", "tooltip")
      .style("background", "none")
      .style("opacity", ".9")
      .style("border-radius", "10px")
      .style("color", "#1E1A1D")
      .style("font-family", "sans-serif")
      .style("position", "absolute")
      .style("transition", "opacity 0.35s")

// append a div for the total row
tooltip.append("div")
      .attr("class", "total")
      .style("font-weight", "bold");  // make the total row bold


// Three function that change the tooltip when user hover / move / leave a cell
const mouseover = function(d) {
    tooltip
      .transition()
      .duration(200)
      .style("opacity", .9);
    d3.select(this)
      .style("opacity", .9);
}

const mousemove = function(event, d) {
  const formatter = d3.format(",.0f");

  // calculate the total
  let total = d.data.usGW + d.data.restOfWorldGW;

  // calculate the installed capacity for US and Rest of the World
  let usGW = d.data.usGW;
  let restOfWorldGW = d.data.restOfWorldGW;

  // update the tooltip content
  tooltip
    .style("left", (event.pageX + 20) + "px")
    .style("top", (event.pageY - 20) + "px")
    .html("<div style='border-radius: 10px; overflow: hidden;'>"
      + "<table style='border-collapse: collapse; width: 100%;'>"
      + "<tr style='background-color: #e4e4e7;'><td style='width: 10px;'></td><th style='padding: 10px;'>" + d.data.year + "</th><td style='width: 10px;'></td></tr>"
      + "<tr style='background-color: white; height: 10px;'><td colspan='3'></td></tr>" // Blank row
      + "<tr style='background-color: white;'><td style='width: 10px;'></td><td><div style='background-color: rgb(203, 232, 236); width: 15px; height: 15px; margin: 5px;'></div></td><td style='text-align: right;'>" + formatter(usGW * 1000) + "</td></tr>"
      + "<tr style='background-color: white;'><td style='width: 10px;'></td><td><div style='background-color: rgb(50, 162, 141); width: 15px; height: 15px; margin: 5px;'></div></td><td style='text-align: right;'>" + formatter(restOfWorldGW * 1000) + "</td></tr>"
      + "<tr style='background-color: white; height: 10px;'><td colspan='3'></td></tr>" // Blank row
      + "<tr style='background-color: #e4e4e7;'><td style='width: 10px;'></td><td colspan='2' style='padding: 10px;'><strong>World GW</strong></td><td style='text-align: right;'>" + formatter(total * 1000) + "</td></tr>"
      + "</table>"
      + "</div>");
}


















const mouseleave = function(d) {
    tooltip
      .transition()
      .duration(500)
      .style("opacity", 0);
    d3.select(this)
      .style("opacity", 1);
}

  
// create bars
svg.append("g")
    .selectAll("g")
    .data(stackedData)
    .enter()
    .append("g")
        .attr("fill", d => color(d.key) )
      .selectAll("rect")
      .data(d => d)
      .join("rect")
        .attr("x",d => xScale(d.data.year))
        .attr("y",d => yScale(d[1]))
        .attr("width", xScale.bandwidth())
        .attr("height", d => yScale(d[0]) - yScale(d[1]))
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)

// add labels to the right of the graph
svg.append("text")
    .attr("x", width + margin.right-115) // adjust this value to position the labels correctly
    .attr("y", (height/1.05)) // center the text in the graph
    .text("US")
    .attr("font-size", "14px")
    .attr("fill", "#32A28D");


//light blue labels
// First line of label
svg.append("text")
    .attr("x", width + margin.right-115) // adjust this value to position the labels correctly
    .attr("y", (height - 80)) // position the first line of the label
    .text("Rest of the World")
    .attr("font-size", "14px")
    .attr("fill", "#CBE8EC");


  
  // set title
  svg
    .append("text")
      .attr("class", "chart-title")
      .attr("x", -(margin.left)/100)
      .attr("y", -(margin.top)/10)
      .attr("text-anchor", "start")
      .style("font-family", "'IBM Plex Sans', serif") // sets the font
      .text("World Cumulative Installed PV Capacity by Year");
  
  




    //Questions:
    //What should I label in the box?
    //Do we want to keep the y axis like this?
    //How is the yearly format, every 4 or 3 years?

    // y axis
    // gw
    //math is wrong
    //"World Cumulative Installed PV Capacity by year
    // Y axis - Installed capacity GW
    //separate year with a darker title box
    //legend has total at the bottom, still add a legend
    //have all prsent no matter where you hover
// make biodeisel graph run across the whole premise
// add commas for labels
//scale it to 1200 on y axis