import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import config from '../../config';
import '../../App.css';

function Signup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        if (!/^[a-zA-Z0-9._%+-]+@student\.babcock\.edu\.ng$/.test(email)) {
            alert('Please use a valid Babcock student email address.');
            return;
        }
        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        const data = {
            name: email.split('@')[0],
            email,
            password
        };

        try {
            const response = await fetch(`${config.BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                navigate('/login');
            } else {
                const errorData = await response.json();
                alert(`Signup failed: ${errorData.message}`);
            }
        } catch (error) {
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Student Sign Up</h2>

                <form className="auth-form" onSubmit={handleSignup}>
                    <input
                        type="email"
                        placeholder="School Email"
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
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Sign Up</button>
                </form>

                <p className="auth-toggle">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;
