function makeChart(players) {
  var playerLabels = players.map(function (d) {
    return d.visa_type;
  });
  var weeksData1 = players.map(function (d) {
    return +d.nom_arrivals;
  });

  var ctx = document.getElementById("chart1");
  var myChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: playerLabels,
      datasets: [
        {
          data: weeksData1,
          backgroundColor: [
            "rgba(106, 90, 205, 1 )",
            "rgba(241, 95, 54, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
          ],
          borderColor: [
            "rgba(106, 90, 205, 1 )",
            "rgba(241, 95, 54, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      cutoutPercentage: 50,
      responsive: true,
    },
  });
}

// Request data using D3
d3.csv("data/visatype.csv").then(makeChart);
