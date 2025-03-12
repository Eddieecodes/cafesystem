import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import config from '../../config';
import '../../App.css';

function Login() {
    const [role, setRole] = useState('student');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const loginEmail = email;
        const endpoint = role === 'student' ? `${config.BASE_URL}/auth/login` : `${config.BASE_URL}/feedback/login`;

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: loginEmail, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                if (role === 'admin') {
                    localStorage.setItem('isAdmin', 'true');
                    navigate('/admin');
                } else {
                    localStorage.setItem('isStudent', 'true');
                    navigate('/student');
                }
            } else {
                alert('Login failed. Please check your credentials and try again.');
            }
        } catch (error) {
            alert('An error occurred. Please try again.');
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
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
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
