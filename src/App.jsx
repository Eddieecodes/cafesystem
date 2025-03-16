import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import ForgotPassword from './components/pages/ForgotPassword';
import AdminDashboard from './components/pages/Admindashboard/Admindashboard';
import StudentDashboard from './components/pages/Studentdashboard/StudentDashboard';
import StaffDashboard from './components/pages/StaffDashboard';

function App() {
    const location = useLocation();

    // Define routes where navbar should not be displayed
    const hideNavbarRoutes = ["/admin", "/student","/staff"];
    const shouldHideNavbar = hideNavbarRoutes.some(route => location.pathname.startsWith(route));

    return (
        <>
            {!shouldHideNavbar && <Navbar />} {/* Hide navbar on dashboard pages */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin/*" element={<AdminDashboard />} /> {/* Keep admin nested routes */}
                <Route path="/student/*" element={<StudentDashboard />} />
                <Route path="/sign-up" element={<Signup />} />
                <Route path='/staff' element={<StaffDashboard/>}/>
                <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
        </>
    );
}

export default App;
