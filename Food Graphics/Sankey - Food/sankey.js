// const data = {
//     nodes: [
//       { name: "Food Retail" },
//       { name: "Food Service" },
//       { name: "Households" },
//       { name: "Food Banks" },
//       { name: "Animal Feeds" },
//       { name: "Bio-based Materials/Biochemical Processing" },
//       { name: "Anaerobic Digestion" },
//       { name: "Composting" },
//       { name: "Land Application" },
//       { name: "Controlled Combustion" },
//       { name: "Landfill" },
//       { name: "Sewer/Wastewater Treatment" }
//     ],
//     links: [
//       { source: "Food Retail", target: "Food Banks", value: 95.0 },
//       { source: "Food Retail", target: "Animal Feeds", value: 95.0 },
//       { source: "Food Retail", target: "Bio-based Materials/Biochemical Processing", value: 12.0 },
//       { source: "Food Retail", target: "Anaerobic Digestion", value: 56.5 },
//       { source: "Food Retail", target: "Composting", value: 57.9 },
//       { source: "Food Retail", target: "Land Application", value: 85.6 },
//       { source: "Food Retail", target: "Controlled Combustion", value: 9.1 },
//       { source: "Food Retail", target: "Landfill", value: 6.8 },
//       { source: "Food Service", target: "Food Banks", value: 5 },
//       { source: "Food Service", target: "Bio-based Materials/Biochemical Processing", value: 12 },
//       { source: "Food Service", target: "Anaerobic Digestion", value: 56.2 },
//       { source: "Food Service", target: "Composting", value: 10.5 },
//       { source: "Food Service", target: "Controlled Combustion", value: 48.5 },
//       { source: "Food Service", target: "Landfill", value: 48.4 },
//       { source: "Households", target: "Anaerobic Digestion", value: 1.2 },
//       { source: "Households", target: "Composting", value: 29.6 },
//       { source: "Households", target: "Controlled Combustion", value: 41.6 },
//       { source: "Households", target: "Landfill", value: 44.2 },
//       { source: "Households", target: "Sewer/Wastewater Treatment", value: 14.6 },
//       { source: "Food Banks", target: "Animal Feeds", value: 4.5 },
//       { source: "Food Banks", target: "Bio-based Materials/Biochemical Processing", value: 1.1 },
//       { source: "Food Banks", target: "Composting", value: 2.4 },
//       { source: "Food Banks", target: "Land Application", value: 14.3 },
//       { source: "Food Banks", target: "Controlled Combustion", value: 0.8 },
//       { source: "Food Banks", target: "Landfill", value: 0.5 }
//     ]
// };

// set the dimensions and margins of the graph
var margin = { top: 10, right: 50, bottom: 10, left: 50 },
    width = 1920 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

// format variables
var formatNumber = d3.format(",.0f"), // zero decimal places
    format = function (d) { return formatNumber(d); },
    color = d3.scaleOrdinal().range(["#002060ff", "#164490ff", "#4d75bcff", "#98b3e6ff", "#d5e2feff", "#008cb0ff"]);

// append the svg object to the body of the page
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Set the sankey diagram properties
var sankey = d3.sankey()
    .nodeWidth(100)
    .nodePadding(40)
    .size([width, height]);

var path = sankey.links();

// load the data
d3.json("sankey.json").then(function (sankeydata) {

    graph = sankey(sankeydata);

    // add in the links
    var link = svg.append("g").selectAll(".link")
        .data(graph.links)
        .enter().append("path")
        .attr("class", "link")
        .attr("d", d3.sankeyLinkHorizontal())
        .attr("stroke-width", function (d) { return d.width; });

    // add the link titles
    link.append("title")
        .text(function (d) {
            return d.source.name + " → " +
                d.target.name;
        });

    // add in the nodes
    var node = svg.append("g").selectAll(".node")
        .data(graph.nodes)
        .enter().append("g")
        .attr("class", "node")


    // add the rectangles for the nodes
    node.append("rect")
        .attr("x", function (d) { return d.x0; })
        .attr("y", function (d) { return d.y0; })
        .attr("height", function (d) { return d.y1 - d.y0; })
        .attr("width", sankey.nodeWidth())
        .style("fill", function (d) {
            return d.color = color(d.name.replace(/ .*/, ""));
        })




        // Attempt at getting whole length of link to highlight
        .on("mouseover", function (d) {
            link
                .transition()
                .duration(300)
                .style("stroke-opacity", function (l) {
                    return l.source === d || l.target === d ? 0.5 : 0.2;
                });
        })
        .on("mouseleave", function (d) {
            link
                .transition()
                .duration(300)
                .style("stroke-opacity", 0.2);
        })


        // Node hover titles
        .append("title")
        .text(function (d) {
            return d.name + "\n" + format(d.value);
        });

    // add in the title for the nodes
    node.append("text")
        .style("fill", "#3f3f3f")
        .attr("x", function (d) { return d.x0 - 6; })
        .attr("y", function (d) { return (d.y1 + d.y0) / 2; })
        .attr("dy", "0.35em")

        .attr("text-anchor", "end")
        .text(function (d) { return d.name; })
        .filter(function (d) { return d.x0 < width / 2; })
        .attr("x", function (d) { return d.x1 + 6; })
        .attr("text-anchor", "start")
        ;

});


//make our own image version
//postpone for now