import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import axios from "axios";
import config from "../../../config";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./Overview.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function Overview() {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalMeals, setTotalMeals] = useState(0);
  const [weeklyAnalysis, setWeeklyAnalysis] = useState({});
  const [foodAnalysis, setFoodAnalysis] = useState({});
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const fetchSummary = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Unauthorized");
        return;
      }

      try {
        const response = await axios.get(
          `${config.BASE_URL}/feedback/summary`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data;
        console.log(data);
        setTotalStudents(data.totalStudents || 0);
        setTotalMeals(data.totalMeals || 0);
        setWeeklyAnalysis(data.weeklyAnalysis?.dailySummary || {});
        setFoodAnalysis(data.foodAnalysis || {});
      } catch (error) {
        toast.error("Failed to fetch summary data.");
      }
    };

    const fetchAdminProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Unauthorized");
        return;
      }

      try {
        const response = await axios.get(
          `${config.BASE_URL}/feedback/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAdminName(response.data.name || "Admin");
      } catch (error) {
        toast.error("Failed to fetch admin profile.");
      }
    };

    fetchSummary();
    fetchAdminProfile();
  }, []);

  // Fix potential issues with empty data
  const foodLabels = Object.keys(foodAnalysis || {});
  const weeklyLabels = Object.keys(weeklyAnalysis || {});

  const foodData = {
    labels: foodLabels.length ? foodLabels : ["No Data"],
    datasets: [
      {
        label: "2025",
        backgroundColor: "#2ecc71",
        data: foodLabels.length
          ? Object.values(foodAnalysis).map((count) => count || 0)
          : [0],
      },
    ],
  };

  const dailyData = {
    labels: weeklyLabels.length ? weeklyLabels : ["No Data"],
    datasets: [
      {
        label: "2025",
        borderColor: "#2ecc71",
        data: weeklyLabels.length
          ? Object.values(weeklyAnalysis).map((day) => day.totalMeals || 0)
          : [0],
        fill: false,
      },
    ],
  };

  return (
    <div className="overview-container">
      <h1 className="welcometext">Welcome back, {adminName}!</h1>
      <div className="stats">
        <div className="stat-box">
          <h1>{totalStudents}</h1>
          <p>Total Registered Students</p>
        </div>
        <div className="stat-box">
          <h1>{totalMeals}</h1>
          <p>Total Meals Served</p>
        </div>
      </div>

      <div className="charts">
        <div className="chart-box">
          <h3>Daily Analysis</h3>
          <Line data={dailyData} />
        </div>
        <div className="chart-box">
          <h3>Food Analysis</h3>
          <Bar data={foodData} />
        </div>
      </div>
    </div>
  );
}

export default Overview;
