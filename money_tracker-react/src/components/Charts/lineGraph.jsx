import axios from "axios";
import getToken from "../../hooks/GetToken";
import { useEffect, useState } from "react";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

/**
 * Generate an array of days for a given month and year.
 * @param {number} year - The year (e.g., 2024).
 * @param {number} month - The month (1 = January, 12 = December).
 * @returns {Array} Array of day numbers (e.g., [1, 2, 3, ..., 31]).
 */
const generateDays = (year, month) => {
  const daysInMonth = new Date(year, month, 0).getDate(); // Get total days in the month
  return Array.from({ length: daysInMonth }, (_, i) => i + 1); // Generate days [1, 2, ..., daysInMonth]
};

// Example: February 2024 (Leap Year)
const year = 2024;
const month = 2; // February
const days = generateDays(year, month);

const LineGraph = () => {
  const [graphData, setGraphData] = useState([]);
  const token = getToken();

  useEffect(() => {
    getLineGraphData();
  }, [token]);

  const getLineGraphData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/acc/time-series/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setGraphData(response.data.data);
      console.log(response.data.data, "graph data");
    } catch (error) {
      console.log("Error Fetching Graph Data", error);
    }
  };

  // Chart.js data
  const data = {
    labels: days,
    datasets: [
      {
        label: "Increase/Decrease",
        data: graphData,
        borderColor: "rgb(75, 192, 192)", // Default border color
        tension: 0.1,
        segment: {
          borderColor: (ctx) => {
            // Dynamically set segment color
            const { p0, p1 } = ctx; // Points of the segment
            return p1.parsed.y > p0.parsed.y ? "rgb(0, 255, 0)" : " rgb(255, 0, 0)"; // Red if going up, green if going down
          },
        },
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Expense Tracking",
      },
    },
  };

  return (
    <div style={{ width: "600px", margin: "50px auto" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineGraph;
