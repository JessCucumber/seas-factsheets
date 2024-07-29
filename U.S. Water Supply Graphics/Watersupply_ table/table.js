
const data = [
    { systemSize: "<= 500", numberOfCWSs: "26,727", popServedMil: "4.5", percentOfCWSs: "53.8%", percentOfUSPopServed: "1.4%" },
    { systemSize: "501 - 3,300", numberOfCWSs: "13,317", popServedMil: "19.2", percentOfCWSs: "26.8%", percentOfUSPopServed: "6.0%" },
    { systemSize: "3,301 - 10,000", numberOfCWSs: "5,019", popServedMil: "29.5", percentOfCWSs: "10.1%", percentOfUSPopServed: "9.2%" },
    { systemSize: "10,001 - 100,000", numberOfCWSs: "4,064", popServedMil: "117.1", percentOfCWSs:"8.2%", percentOfUSPopServed:"36.6%"},
    { systemSize : ">100,000" , numberOfCWSs : '472' , popServedMil : '153.2' ,percentOfCWSs : '1.0%' ,percentOfUSPopServed :'47.9%' },
    { systemSize : "Total" , numberOfCWSs : '49,599' , popServedMil : '323.5' ,percentOfCWSs : '99.9%' ,percentOfUSPopServed :'101.2%' }
  ];
  
  const columns = ["systemSize", "numberOfCWSs", "popServedMil", "percentOfCWSs", "percentOfUSPopServed"];
  
  d3.select("#viz_container").append("table")
      .attr("style", "margin-left: 250px")
      .selectAll("tr")
      .data(data)
      .enter().append("tr")
      .selectAll("td")
      .data(function(row, i) {
          return columns.map(function(column) {
              return {column: column, value: row[column]};
          });
      })
      .enter().append("td")
      .html(function(d) { return d.value; });
  
  d3.selectAll("tbody tr")
      .sort(function(a, b) {
          return d3.ascending(a.systemSize, b.systemSize);
      });
  