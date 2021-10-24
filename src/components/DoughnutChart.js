import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import "./DoughnutChart.css";

export default function Chart({ chartData, legendPosition }) {
  const [data] = useState(chartData);
  const [lPosition] = useState(legendPosition);

  const displayTitle = true;
  const displayLegend = true;

  return (
    <div >
      <Doughnut
          height={400}
          width={300}
        data={data}
        options={{
          title: {
            display: displayTitle,
            text: "Total de casos no Brasil",
            fontSize: 20,
          },
          legend: {
            display: displayLegend,
            position: lPosition,
          },
          responsive: true,
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
}
