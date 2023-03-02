import React, { memo } from "react";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
function Index() {
  const data = {
    labels: [2, 4, 6, 8, 10, 12, 14],
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: true,
        borderColor: "#FF2E63",
        backgroundColor: "rgba(255, 46, 99, 0.1)",

        tension: 0.1,
      },
    ],
  };
  return (
    <Line
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
