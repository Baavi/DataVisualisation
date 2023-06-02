function makeChart(players) {
  var playerLabels = players.map(function (d) {
    return d.states;
  });
  var weeksData1 = players.map(function (d) {
    return +d.arrivals;
  });
  var weeksData2 = players.map(function (d) {
    return +d.departure;
  });
  var weeksData3 = players.map(function (d) {
    return +d.total;
  });

  var chart = new Chart("chart2", {
    type: "line",
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          labels: {
            font: {
              size: 200,
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "The above graph is scaled at 1:1000",
            },
          },
          y: {
            type: "linear",
            display: true,
            position: "left",
            stacked: true,
          },
          y1: {
            type: "linear",
            display: true,
            position: "right",
            stacked: true,

            // grid line settings
            grid: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up//
            },
          },
          y: {
            ticks: {
              fontSize: 40,
            },
          },
        },
      },
    },
    data: {
      labels: playerLabels,
      datasets: [
        {
          label: "Arrival",
          data: weeksData1,
          borderColor: "rgb(241, 95, 54)",
          backgroundColor: "rgb(241, 95, 54)",
          fill: false,
          tension: 0.1,
        },
        {
          label: "Departure",
          data: weeksData2,
          borderColor: "rgb(25, 160, 170)",
          backgroundColor: "rgb(25, 160, 170)",
          fill: false,
          tension: 0.1,
        },
        {
          label: "Total",
          data: weeksData3,
          borderColor: "rgb(106, 90, 205)",
          backgroundColor: "rgb(106, 90, 205)",
          fill: false,
          tension: 0.1,
        },
      ],
    },
  });
}

// Request data using D3
d3.csv("data/Internal_Migration.csv").then(makeChart);
