import React, { memo } from "react";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";
function Index() {
  const data = {
    labels: [2, 4, 6, 8, 10, 12, 14],
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: true,
        borderColor: "#FF2E63",
        backgroundColor: "rgba(255, 46, 99, .8)",
        borderRadius: 10,
        tension: 0.1,
        width: 20,
      },
    ],
  };
  return (
    <Bar
      data={data}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },

        plugins: {
          title: {
            display: true,
          },
          legend: {
            display: false,
          },
          scales: {
            xAxes: [
              {
                barThickness: 6, // number (pixels) or 'flex'
                maxBarThickness: 8, // number (pixels)
              },
            ],
          },
          tooltips: {
            callbacks: {
              label: function (tooltipItem) {
                return tooltipItem.yLabel;
              },
            },
          },
        },
      }}
    />
  );
}

export default memo(Index);
