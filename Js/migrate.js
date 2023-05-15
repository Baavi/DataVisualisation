var data = [
  { name: "Greece", value: 103710 },
  { name: "Hong Kong", value: 104760 },
  { name: "USA", value: 110160 },
  { name: "Germany", value: 111030 },
  { name: "Korea, South", value: 111530 },
  { name: "Nepal", value: 131830 },
  { name: "Scotland", value: 132590 },
  { name: "Sri Lanka", value: 146950 },
  { name: "Malaysia", value: 177460 },
  { name: "Italy", value: 177840 },
  { name: "South Africa", value: 200240 },
  { name: "Vietnam", value: 270340 },
  { name: "Philippines", value: 310050 },
  { name: "New Zealand", value: 564840 },
  { name: "China", value: 650640 },
  { name: "India", value: 721050 },
  { name: "England", value: 980360 },
];
var text = "";

var width = 400;
var height = 400;
var thickness = 80;
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
