const url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

//SVG DIMENSIONS
let width = 800;
let height = 400;

let tooltip = d3.select("#svg-container").append("div").attr("id", "tooltip");

let svg = d3
  .select("#svg-container")
  .append("svg")
  .attr("width", width + 100)
  .attr("height", height + 60);

fetch(url, {
  method: "GET",
  headers: {
    Accept: "application/json",
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("There is a problem with the request");
    }
  })
  .then((data) => {
    let info = data.data;
    let barWidth = width / info.length;

    // x axis
    let years = info.map(function (x) {
      let quarter;
      let temp = x[0].substring(5, 7);

      if (temp == 1) quarter = "Q1";
      if (temp == 4) quarter = "Q2";
      if (temp == 7) quarter = "Q3";
      if (temp == 10) quarter = "Q4";

      return `${x[0].substring(0, 4)} ${quarter}`;
    });

    let dates = info.map((x) => new Date(x[0]));
    let xMax = new Date(d3.max(dates));
    xMax.setMonth(xMax.getMonth() + 3);
    let xMin = d3.min(dates);

    let xScale = d3.scaleTime().domain([xMin, xMax]).range([0, width]);
    let xAxis = d3.axisBottom().scale(xScale);
    svg.append("g").call(xAxis).attr("id", "x-axis");

    //x-Axis Label
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -200)
      .attr("y", 80)
      .text("Gross Domestic Product");

    // y axis
    let GDP = info.map((y) => y[1]);
    let minGDP = d3.min(GDP);
    let maxGDP = d3.max(GDP);

    let linearScale = d3.scaleLinear().domain([0, maxGDP]).range([0, height]);
    let scaledGDP = GDP.map((y) => linearScale(y));

    let yScale = d3.scaleLinear().domain([0, maxGDP]).range([height, 0]);
    let yAxis = d3.axisLeft(yScale);
    svg.append("g").call(yAxis).attr("id", "y-axis");

    //char rectangles
    d3.select("svg")
      .selectAll("rect")
      .data(scaledGDP)
      .enter()
      .append("rect")
      .attr("width", barWidth)
      .attr("height", (d) => d)
      .attr("data-date", (d, i) => info[i][0])
      .attr("data-gdp", (d, i) => info[i][1])
      .attr("class", "bar")
      .attr("x", (d, i) => xScale(dates[i]))
      .attr("y", (d) => height - d)
      .attr("index", (d, i) => i);
  })
  .catch((error) => {
    console.error("There is a problem getting the data from the API:", error);
  });
