import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from "../../shared/Sidebar";
import Overview from './Overview';
import StudentManagement from './StudentManagement';
import MealInput from './MealInput';
import Announcement from './Announcement';  
import Feedback from './Feedback';  
import Settings from './Profile';
import './Admin.css';

function Admindashboard() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleLogout = () => {
        localStorage.removeItem("isAdmin");
        navigate('/login');
    };

    return (
        <div className="admin-container">
            {/* Hamburger Button (Only Visible in Mobile) */}
            <button className="hamburger-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                ☰
            </button>

            {/* Sidebar Component */}
            <Sidebar role="admin" onLogout={handleLogout} isOpen={isSidebarOpen} />

            {/* Main Content */}
            <div className="admin-content">
                <Routes>
                    <Route path="/" element={<Overview />} />
                    <Route path="/students" element={<StudentManagement />} />
                    <Route path="/meals" element={<MealInput />} />
                    <Route path="/announcement" element={<Announcement />} />
                    <Route path="/feedback" element={<Feedback />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </div>
        </div>
    );
}

export default Admindashboard;
