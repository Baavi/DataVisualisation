var data = [
  { name: "Vocational Education and Training sector", value: 11500 },
  { name: "Higher education sector", value: 77920 },
  { name: "Student", value: 23720 },
  { name: "Temporary work skilled", value: 23100 },
  { name: "Visitor", value: 115580 },
  { name: "Working Holiday", value: 41790 },
  { name: "Other temporary visas", value: 18850 },
];
var text = "";

var width = 600;
var height = 600;
var thickness = 100;
var duration = 750;

var radius = Math.min(width, height) / 2;
var color = d3.scaleOrdinal(d3.schemeCategory10);

var svg = d3
  .select("#chart")
  .append("svg")
  .attr("class", "pie")
  .attr("width", width)
  .attr("height", height);

var g = svg
  .append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var color = d3
  .scaleOrdinal()
  .domain([
    "Vocational Education and Training sector",
    "Higher education sector",
    "Student",
    "Temporary work skilled",
    "Visitor",
    "Working Holiday",
    "Other temporary visas",
  ])
  .range([
    "#98abc5",
    "#8a89a6",
    "#7b6888",
    "#6b486b",
    "#a05d56",
    "#d0743c",
    "#ff8c00",
  ]);

var arc = d3
  .arc()
  .innerRadius(radius - thickness)
  .outerRadius(radius);

var pie = d3
  .pie()
  .value(function (d) {
    return d.value;
  })
  .sort(null);

var path = g
  .selectAll("path")
  .data(pie(data))
  .enter()
  .append("g")
  .on("mouseover", function (d) {
    let g = d3
      .select(this)
      .style("cursor", "pointer")
      .style("fill", "black")
      .append("g")
      .attr("class", "text-group");

    g.append("text")
      .attr("class", "name-text")
      .text(`${d.data.name}`)
      .attr("text-anchor", "middle")
      .attr("dy", "-1.2em");

    g.append("text")
      .attr("class", "value-text")
      .text(`${d.data.value}`)
      .attr("text-anchor", "middle")
      .attr("dy", ".6em");
  })
  .on("mouseout", function (d) {
    d3.select(this)
      .style("cursor", "none")
      .style("fill", color(this._current))
      .select(".text-group")
      .remove();
  })
  .append("path")
  .attr("d", arc)
  .attr("fill", (d, i) => color(i))
  .on("mouseover", function (d) {
    d3.select(this).style("cursor", "pointer").style("fill", "black");
  })
  .on("mouseout", function (d) {
    d3.select(this).style("cursor", "none").style("fill", color(this._current));
  })
  .each(function (d, i) {
    this._current = i;
  });

g.append("text").attr("text-anchor", "middle").attr("dy", ".35em").text(text);
