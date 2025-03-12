import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import axios from 'axios';
import config from '../../../config';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import './Overview.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

function Overview() {
    const [totalStudents, setTotalStudents] = useState(0);
    const [totalMeals, setTotalMeals] = useState(0);
    const [weeklyAnalysis, setWeeklyAnalysis] = useState([]);
    const [foodAnalysis, setFoodAnalysis] = useState([]);
    const [adminName, setAdminName] = useState("");

    useEffect(() => {
        // Fetch summary data from backend
        const fetchSummary = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Unauthorized');
                return;
            }

            try {
                const response = await axios.get(`${config.BASE_URL}/feedback/summary`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = response.data;
                setTotalStudents(data.totalStudents);
                setTotalMeals(data.totalMeals);
                setWeeklyAnalysis(data.weeklyAnalysis.dailySummary);
                setFoodAnalysis(data.foodAnalysis);
            } catch (error) {
                alert('Failed to fetch summary data.');
            }
        };

        const fetchAdminProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Unauthorized');
                return;
            }

            try {
                const response = await axios.get(`${config.BASE_URL}/feedback/profile`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = response.data;
                setAdminName(data.name);
            } catch (error) {
                alert('Failed to fetch admin profile.');
            }
        };

        fetchSummary();
        fetchAdminProfile();
    }, []);

    const foodData = {
        labels: Object.keys(foodAnalysis),
        datasets: [
            { label: '2022', backgroundColor: '#8a56c2', data: Object.values(foodAnalysis).map(item => item.data2022 || 0) },
            { label: '2023', backgroundColor: '#e74c3c', data: Object.values(foodAnalysis).map(item => item.data2023 || 0) },
            { label: '2024', backgroundColor: '#2ecc71', data: Object.values(foodAnalysis).map(item => item.data2024 || 0) }
        ]
    };

    const dailyData = {
        labels: Object.keys(weeklyAnalysis),
        datasets: [
            { label: '2022', borderColor: '#8a56c2', data: Object.values(weeklyAnalysis).map(item => item.data2022 || 0), fill: false },
            { label: '2023', borderColor: '#e74c3c', data: Object.values(weeklyAnalysis).map(item => item.data2023 || 0), fill: false },
            { label: '2024', borderColor: '#2ecc71', data: Object.values(weeklyAnalysis).map(item => item.data2024 || 0), fill: false }
        ]
    };

    return (
        <div className="overview-container">
            <h1 className='welcometext'>Welcome back {adminName}!</h1>
            <div className="stats">
                <div className="stat-box"> <h1>{totalStudents}</h1> <p>Total Registered Students</p> </div>
                <div className="stat-box"> <h1>{totalMeals}</h1> <p>Total Meals Served</p> </div>
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
