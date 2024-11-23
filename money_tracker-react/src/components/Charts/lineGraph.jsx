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

const LineGraph = () => {
  const [graphData, setGraphData] = useState([]);
  const [graphDates, setGraphDates] = useState([]);
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

      // Get dates from API response
      const fetchedDates = response.data.dates;

      // Add today's date
      const today = new Date();
      const formattedToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

      if (!fetchedDates.includes(formattedToday)) {
        fetchedDates.push(formattedToday); // Add today's date if it's not already present
      }

      // Optional: Sort dates to ensure chronological order
      fetchedDates.sort((a, b) => new Date(a) - new Date(b));

      // Add placeholder for today's data (if needed)
      const updatedGraphData = [...response.data.data];
      if (!response.data.dates.includes(formattedToday)) {
        updatedGraphData.push(0); // Placeholder value for today's date
      }

      setGraphDates(fetchedDates);
      setGraphData(updatedGraphData);

      console.log(response.data, "graph line data");
    } catch (error) {
      console.log("Error Fetching Graph Data", error);
    }
  };

  // Chart.js data
  const data = {
    labels: graphDates,
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
            return p1.parsed.y > p0.parsed.y ? "rgb(0, 255, 0)" : "rgb(255, 0, 0)"; // Green for increase, red for decrease
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
        text: "Monthly Expense Forecasting",
      },
    },
  };

  return (
    <div className="w-full px-5">
      <Line style={{ width: "100%" }} data={data} options={options} />
    </div>
  );
};

export default LineGraph;
