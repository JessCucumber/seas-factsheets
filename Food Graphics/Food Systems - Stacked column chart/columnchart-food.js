    // Your data
    const mainGroup = [
        { category: "Household Storage & Preparation", value: 3.956852792 },
        { category: "Food Services", value: 1.807831762 },
        { category: "Wholesale and Retail", value: 2.215736041 },
        { category: "Packaging Material", value: 0.903190718 },
        { category: "Processing Industry", value: 2.680565627 },
        { category: "Transportation", value: 0.549673677 },
        { category: "Agricultural Production", value: 2.046047861 }
      ];
  
      const newGroup = [
        { category: "Food Energy Available that is Consumed", value: 1.07 },
        { category: "Food Energy Available", value: 0.68 }
      ];
  
      // Combine the data
      const combinedData = [
        { category: "Food Energy Consumed (14.2 Quads)", ...mainGroup.reduce((acc, curr) => ({ ...acc, [curr.category]: curr.value }), {}) },
        { category: "Food Energy Available(1.75 Quads)", ...newGroup.reduce((acc, curr) => ({ ...acc, [curr.category]: curr.value }), {}) }
      ];
  
      // Extract keys for categories
      const mainCategories = mainGroup.map(d => d.category);
      const newCategories = newGroup.map(d => d.category);
  
      // Append the svg object to the body of the page
      const svg = d3.select("#viz_container")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", "0 0 800 550") // Adjust the viewbox
        .attr("preserveAspectRatio", "xMinYMin");
  
      // Get the width and height of the SVG
      const width = +svg.node().getBoundingClientRect().width;
      const height = +svg.node().getBoundingClientRect().height;
  
      // Set dynamic margins
      const margin = {
        top: 20,
        right: 30,
        bottom: 70,
        left: 60
      };
  
      // Calculate the width and height of the graph area
      const graphWidth = width - margin.left - margin.right;
      const graphHeight = height - margin.top - margin.bottom;
  
      // Append a group element to the SVG, shifted according to the dynamic margins
      const chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
      // X scale and Axis
      const xScale = d3.scaleBand()
        .domain(combinedData.map(d => d.category))
        .range([0, graphWidth])
        .padding(0.2);
  
      chartGroup.append("g")
        .attr("transform", `translate(0, ${graphHeight})`)
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .attr("transform", "translate(-10,0)")
        .style("text-anchor", "middle");
  
      // Y scale and Axis
      const yScale = d3.scaleLinear()
        .domain([0, d3.max(combinedData, d => d3.sum(mainCategories.concat(newCategories), key => d[key] || 0))])
        .range([graphHeight, 0]);
  
      chartGroup.append("g")
        .call(d3.axisLeft(yScale));
  
      // Color scale
      const color = d3.scaleOrdinal()
        .domain(mainCategories.concat(newCategories))
        .range(["#C6E3E0", "#E2E27A", "#386660", "#8FC7E5", "#3167A3", "#1D476D", "#A6B93D", "#FFCB03", "#CE5845"]);
  
      // Tooltip
      const tooltip = d3.select("#viz_container").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
  
      // Stack the data
      const stack = d3.stack()
        .keys(mainCategories.concat(newCategories))
        .order(d3.stackOrderNone)
        .offset(d3.stackOffsetNone);
  
      const stackedData = stack(combinedData);
  
      // Add the bars
      chartGroup.selectAll(".layer")
        .data(stackedData)
        .enter()
        .append("g")
        .attr("class", "layer")
        .attr("fill", d => color(d.key))
        .selectAll("rect")
        .data(d => d)
        .enter()
        .append("rect")
        .attr("x", d => xScale(d.data.category))
        .attr("y", d => yScale(d[1]))
        .attr("height", d => yScale(d[0]) - yScale(d[1]))
        .attr("width", xScale.bandwidth())
        .on("mouseover", function(event, d) {
            // Store the original color
            d3.select(this).attr('data-original-color', d3.select(this).style("fill"));
            // Highlight the bar
            d3.select(this).style("fill", "orange");
        
            // Calculate the total value for the tooltip percentage calculation
            const total = d3.sum(mainCategories.concat(newCategories), key => d.data[key] || 0);
        
            // Prepare the tooltip data for the specific bar
            let tooltipData;
            if (d.data.category === "Food Energy Consumed (14.2 Quads)") {
                tooltipData = mainCategories.slice().reverse().map(key => {
                    return `<tr>
                        <td><div style="width:10px; height:10px; background-color:${color(key)};"></div></td>
                        <td>${key}</td>
                        <td style="text-align: right">${((d.data[key] || 0) / total * 100).toFixed(2)}%</td>
                        </tr>`;
                }).join("");
            } else if (d.data.category === "Food Energy Available(1.75 Quads)") {
                tooltipData = newCategories.slice().reverse().map(key => {
                    return `<tr>
                        <td><div style="width:10px; height:10px; background-color:${color(key)};"></div></td>
                        <td>${key}</td>
                        <td style="text-align: right">${((d.data[key] || 0) / total * 100).toFixed(2)}%</td>
                        </tr>`;
                }).join("");
            }
        
            // Show the tooltip
            tooltip.style("opacity", 1);
            tooltip.html(
                `<div style="font-weight: bold; border-radius: 5px 5px 0 0; background-color: #f1eded;padding: 5px;">${d.data.category}</div>
                <table>
                  ${tooltipData}
                </table>`
            )
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            // Restore the original color
            d3.select(this).style("fill", d3.select(this).attr('data-original-color'));
            // Hide the tooltip
            tooltip.style("opacity", 0);
        });
    //make the hovered bar grey
    // edit the labels
    // pu tthe chart after the sankey diagram