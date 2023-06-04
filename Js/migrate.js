function makeChart(players) {
  var playerLabels = players.map(function (d) {
    return d.visa_type;
  });
  var weeksData1 = players.map(function (d) {
    return +d.nom_arrival;
  });

  var ctx = document.getElementById("chart");
  var myChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: playerLabels,
      datasets: [
        {
          label: "Arrievels",
          data: weeksData1,
          backgroundColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(25, 160, 170, 1)",
            "rgba(106, 90, 205, 1 )",
            "rgba(241, 95, 54, 1)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(25, 160, 170, 1)",
            "rgba(106, 90, 205, 1 )",
            "rgba(241, 95, 54, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      cutoutPercentage: 50,
      responsive: false,
      plugins: {
        legend: {
          labels: {
            font: {
              size: 20,
            },
          },
        },
      },
    },
  });
}

// Request data using D3
d3.csv("data/sectortype.csv").then(makeChart);
