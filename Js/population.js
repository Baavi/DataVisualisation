// The svg
var svg = d3.select("svg"),
  width = +svg.attr("width"),
  height = +svg.attr("height");

// Map and projection
var path = d3.geoPath();
var projection = d3
  .geoMercator()
  .scale(width / 2 / Math.PI)
  .translate([width / 2, height / 2]);
var path = d3.geoPath().projection(projection);

// Data and color scale
var data = d3.map();
var colorScheme = d3.schemeReds[6];
colorScheme.unshift("#eee");
var colorScale = d3
  .scaleThreshold()
  .domain([100000, 150000, 200000, 300000, 500000, 700000, 900000])
  .range(colorScheme);

// Legend
var g = svg
  .append("g")
  .attr("class", "legendThreshold")
  .attr("transform", "translate(-0,500)");

g.append("text")
  .attr("class", "caption")
  .attr("x", 0)
  .attr("y", -6)
  .style("font-size", "18px")

  .text("Resident population by country of birth");
var labels = [
  "Less than 100,000",
  "More than 150,000",
  "More than 200,000",
  "More than 300,000",
  "More than 500,000",
  "More than 700,000",
  "More than 900,000",
];
var legend = d3
  .legendColor()
  .labels(function (d) {
    return labels[d.i];
  })
  .shapePadding(0)
  .scale(colorScale);
svg.select(".legendThreshold").call(legend);

// Load external data and boot
d3.queue()
  .defer(d3.json, "http://enjalot.github.io/wwsd/data/world/world-110m.geojson")
  .defer(d3.csv, "data/migrant-population.csv", function (d) {
    data.set(d.code, +d.total);
  })
  .await(ready);

function ready(error, topo) {
  if (error) throw error;

  // Draw the map
  svg
    .append("g")
    .attr("class", "countries")
    .selectAll("path")
    .data(topo.features)
    .enter()
    .append("path")
    .attr("fill", function (d) {
      // Pull data for this country
      d.total = data.get(d.id) || 0;
      // Set the color
      return colorScale(d.total);
    })
    .attr("d", path);
}
