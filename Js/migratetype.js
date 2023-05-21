var data = [
  { name: "Family", value: 22560 },
  { name: "Skill", value: 27660 },
  { name: "Special Eligibility and humanitarian", value: 13000 },
  { name: "Other permanent visas", value: 10630 },
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
    "Family",
    "Skill",
    "Special Eligibility and humanitarian",
    "Other permanent visas",
  ])
  .range(["#98abc5", "#8a89a6", "#6b486b", "#a05d56"]);

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
