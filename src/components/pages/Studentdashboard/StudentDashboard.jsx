import React from 'react';
import { Routes, Route,useNavigate } from 'react-router-dom';
import Overvieww from './Overvieww';
import CafeteriaHistory from './CafeteriaHistory';
import DailyMenu from './DailyMenu';
import Notifications from './Notifications';
import HelpCenter from './HelpCenter';
import './StudentDashboard.css';
import Sidebar from '../../shared/Sidebar';
import StudentProfile from './StudentProfile';

function StudentDashboard() {
     const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("isStudent");
        navigate('/login');
    };
    return (
        <div className="student-dashboard">
            <Sidebar role="student" onLogout={handleLogout}/>  {/* Added role="student" */}
            <div className="student-content">
                <Routes>
                    <Route path="/" element={<Overvieww />} />
                    <Route path="/history" element={<CafeteriaHistory />} />
                    <Route path="/menu" element={<DailyMenu />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/help" element={<HelpCenter />} />
                    <Route path="/profile" element={<StudentProfile/>} />
                </Routes>
            </div>
        </div>
    );
}

export default StudentDashboard;
