import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import getToken from "../../hooks/GetToken";

// Register required components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = () => {
  const [graphData, setGraphData] = useState([]); 
  const [graphLabels, setGraphLabels] = useState([]); 
  const token = getToken();

  useEffect(() => {
    fetchDonutChartData();
  }, [token]);

  const fetchDonutChartData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/acc/category-donut/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      // Extracting category names and total amounts for graph
      const categories = response.data.data.map((item) => item.category_name);
      const amounts = response.data.data.map((item) => item.total_amount);

      setGraphLabels(categories); 
      setGraphData(amounts);
      console.log(response.data.data, "Graph Data");
    } catch (error) {
      console.error("Error Fetching Donut Chart Data", error);
    }
  };

  // Chart.js data configuration
  const data = {
    labels: graphLabels, 
    datasets: [
      {
        label: "Budget Distribution",
        data: graphData, 
        backgroundColor: [
          "rgba(75, 192, 192, 0.8)", 
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 159, 64, 0.8)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart.js options configuration
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Budget Distribution",
      },
    },
  };

  return (
    <div style={{ width: "400px", margin: "50px auto" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DonutChart;
