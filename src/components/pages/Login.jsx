import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../App.css';

function Login() {
    const [role, setRole] = useState('student');
    const [matricNo, setMatricNo] = useState('');
    const [employeeID, setEmployeeID] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (role === 'admin') {
            localStorage.setItem("isAdmin", "true");  // Set admin session
            navigate('/admin');  // Redirect to Admin Dashboard
        } else {
            localStorage.setItem("isStudent", "true"); // Set student session
            navigate('/student');  // Redirect to Student Dashboard
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Login</h2>
                <div className="role-switch">
                    <button 
                        className={role === 'student' ? 'active' : ''} 
                        onClick={() => setRole('student')}
                    >
                        Student
                    </button>
                    <button 
                        className={role === 'admin' ? 'admin-active' : ''} 
                        onClick={() => setRole('admin')}
                    >
                        Admin
                    </button>
                </div>

                <form className="auth-form" onSubmit={handleLogin}>
                    {role === 'student' ? (
                        <>
                            <input 
                                type="text" 
                                placeholder="Matric No" 
                                value={matricNo}
                                onChange={(e) => {
                                    if (/^\d*$/.test(e.target.value)) {
                                        setMatricNo(e.target.value);
                                    }
                                }}
                                required 
                            />
                            <input 
                                type="password" 
                                placeholder="Password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                            />
                        </>
                    ) : (
                        <>
                            <input 
                                type="text" 
                                placeholder="Employee ID" 
                                value={employeeID}
                                onChange={(e) => {
                                    if (/^\d*$/.test(e.target.value)) {
                                        setEmployeeID(e.target.value);
                                    }
                                }}
                                required 
                            />
                            <input 
                                type="password" 
                                placeholder="Password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                            />
                        </>
                    )}
                    <button type="submit">Login</button>
                </form>

                <p className="auth-toggle">
                    Don't have an account? <Link to="/sign-up">Sign Up</Link>
                </p>
                <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
            </div>
        </div>
    );
}

export default Login;
