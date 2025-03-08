import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import './Overview.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

function Overview() {
    const foodData = {
        labels: ['Gbadu', 'Jollof Rice', 'Rice & Stew'],
        datasets: [
            { label: '2022', backgroundColor: '#8a56c2', data: [88, 10, 51] },
            { label: '2023', backgroundColor: '#e74c3c', data: [63, 88, 65] },
            { label: '2024', backgroundColor: '#2ecc71', data: [67, 27, 72] }
        ]
    };

    const dailyData = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [
            { label: '2022', borderColor: '#8a56c2', data: [80, 20, 70, 60, 90, 50, 30], fill: false },
            { label: '2023', borderColor: '#e74c3c', data: [50, 90, 40, 80, 60, 70, 100], fill: false },
            { label: '2024', borderColor: '#2ecc71', data: [60, 30, 90, 70, 40, 100, 80], fill: false }
        ]
    };

    return (
        <div className="overview-container">
            <h1 className='welcometext'>Welcome back Edmund!</h1>
            <div className="stats">
                <div className="stat-box"> <h1>400</h1> <p>Total Registered Students</p> </div>
                <div className="stat-box"> <h1>3</h1> <p>Total Meals Served</p> </div>
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
